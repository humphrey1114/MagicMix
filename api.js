const { db, hashPassword, verifyPassword, generateToken } = require("./db");
const url = require("url");

// ── Auth middleware ──
function getUser(req) {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");
  if (!token) return null;
  const session = db.prepare("SELECT user_id FROM sessions WHERE token = ? AND expires_at > datetime('now')").get(token);
  if (!session) return null;
  return db.prepare("SELECT id, username, email, avatar, plan, created_at FROM users WHERE id = ?").get(session.user_id);
}

function requireAuth(req, res) {
  const user = getUser(req);
  if (!user) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "未登录或登录已过期" }));
    return null;
  }
  return user;
}

// ── Parse JSON body ──
function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
  });
}

// ── JSON response helper ──
function json(res, data, status = 200) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify(data));
}

// ── Route handler ──
async function handleAPI(req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;
  const method = req.method;

  // CORS preflight
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
    });
    res.end();
    return true;
  }

  // Only handle /api/* routes
  if (!pathname.startsWith("/api/")) return false;

  // ════════════════════════════════
  // AUTH
  // ════════════════════════════════

  if (pathname === "/api/auth/register" && method === "POST") {
    const body = await parseBody(req);
    const { username, email, password } = body;
    if (!username || !email || !password) return json(res, { error: "请填写所有字段" }, 400);
    if (password.length < 6) return json(res, { error: "密码至少6位" }, 400);

    const exists = db.prepare("SELECT id FROM users WHERE email = ? OR username = ?").get(email, username);
    if (exists) return json(res, { error: "用户名或邮箱已存在" }, 409);

    const hash = hashPassword(password);
    const result = db.prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)").run(username, email, hash);
    const token = generateToken();
    db.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, datetime('now', '+7 days'))").run(token, result.lastInsertRowid);

    return json(res, { token, user: { id: result.lastInsertRowid, username, email, plan: "free" } }, 201);
  }

  if (pathname === "/api/auth/login" && method === "POST") {
    const body = await parseBody(req);
    const { email, password } = body;
    if (!email || !password) return json(res, { error: "请填写邮箱和密码" }, 400);

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user || !verifyPassword(password, user.password_hash)) {
      return json(res, { error: "邮箱或密码错误" }, 401);
    }

    db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").run(user.id);
    const token = generateToken();
    db.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, datetime('now', '+7 days'))").run(token, user.id);

    return json(res, { token, user: { id: user.id, username: user.username, email: user.email, plan: user.plan, avatar: user.avatar } });
  }

  if (pathname === "/api/auth/me" && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;
    return json(res, { user });
  }

  if (pathname === "/api/auth/logout" && method === "POST") {
    const auth = req.headers.authorization || "";
    const token = auth.replace("Bearer ", "");
    if (token) db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
    return json(res, { ok: true });
  }

  // ════════════════════════════════
  // PRODUCTS
  // ════════════════════════════════

  if (pathname === "/api/products" && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const rows = db.prepare("SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC").all(user.id);
    return json(res, { products: rows });
  }

  if (pathname === "/api/products" && method === "POST") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const { name, url: pUrl, platform, category, description, price } = body;
    if (!name) return json(res, { error: "请输入商品名称" }, 400);
    const result = db.prepare("INSERT INTO products (user_id, name, url, platform, category, description, price) VALUES (?, ?, ?, ?, ?, ?, ?)").run(user.id, name, pUrl || "", platform || "", category || "", description || "", price || 0);
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(result.lastInsertRowid);
    return json(res, { product }, 201);
  }

  const productMatch = pathname.match(/^\/api\/products\/(\d+)$/);
  if (productMatch && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const product = db.prepare("SELECT * FROM products WHERE id = ? AND user_id = ?").get(productMatch[1], user.id);
    if (!product) return json(res, { error: "商品不存在" }, 404);
    return json(res, { product });
  }

  if (productMatch && method === "PUT") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const id = productMatch[1];
    db.prepare("UPDATE products SET name=?, url=?, platform=?, category=?, description=?, price=? WHERE id=? AND user_id=?").run(body.name, body.url || "", body.platform || "", body.category || "", body.description || "", body.price || 0, id, user.id);
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    return json(res, { product });
  }

  if (productMatch && method === "DELETE") {
    const user = requireAuth(req, res);
    if (!user) return true;
    db.prepare("DELETE FROM products WHERE id = ? AND user_id = ?").run(productMatch[1], user.id);
    return json(res, { ok: true });
  }

  // ════════════════════════════════
  // SCRIPTS
  // ════════════════════════════════

  if (pathname === "/api/scripts" && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const rows = db.prepare("SELECT s.*, p.name as product_name FROM scripts s LEFT JOIN products p ON s.product_id = p.id WHERE s.user_id = ? ORDER BY s.created_at DESC").all(user.id);
    return json(res, { scripts: rows });
  }

  if (pathname === "/api/scripts" && method === "POST") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const result = db.prepare("INSERT INTO scripts (user_id, product_id, title, style, tone, content, scenes, word_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").run(user.id, body.product_id || null, body.title || "未命名脚本", body.style || "", body.tone || "", body.content || "", JSON.stringify(body.scenes || []), body.word_count || 0, body.status || "draft");
    const script = db.prepare("SELECT * FROM scripts WHERE id = ?").get(result.lastInsertRowid);
    return json(res, { script }, 201);
  }

  const scriptMatch = pathname.match(/^\/api\/scripts\/(\d+)$/);
  if (scriptMatch && method === "PUT") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const id = scriptMatch[1];
    db.prepare("UPDATE scripts SET title=?, style=?, tone=?, content=?, scenes=?, word_count=?, status=? WHERE id=? AND user_id=?").run(body.title, body.style || "", body.tone || "", body.content || "", JSON.stringify(body.scenes || []), body.word_count || 0, body.status || "draft", id, user.id);
    const script = db.prepare("SELECT * FROM scripts WHERE id = ?").get(id);
    return json(res, { script });
  }

  if (scriptMatch && method === "DELETE") {
    const user = requireAuth(req, res);
    if (!user) return true;
    db.prepare("DELETE FROM scripts WHERE id = ? AND user_id = ?").run(scriptMatch[1], user.id);
    return json(res, { ok: true });
  }

  // ════════════════════════════════
  // VIDEOS
  // ════════════════════════════════

  if (pathname === "/api/videos" && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const status = query.status || "";
    let sql = "SELECT v.*, p.name as product_name FROM videos v LEFT JOIN products p ON v.product_id = p.id WHERE v.user_id = ?";
    const params = [user.id];
    if (status) { sql += " AND v.status = ?"; params.push(status); }
    sql += " ORDER BY v.created_at DESC";
    const rows = db.prepare(sql).all(...params);
    return json(res, { videos: rows });
  }

  if (pathname === "/api/videos" && method === "POST") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const result = db.prepare("INSERT INTO videos (user_id, script_id, product_id, title, duration, ratio, style, status, originality_score, quality_grade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(user.id, body.script_id || null, body.product_id || null, body.title || "未命名视频", body.duration || "0:00", body.ratio || "9:16", body.style || "", body.status || "draft", body.originality_score || Math.floor(Math.random() * 10 + 88), body.quality_grade || "A");
    const video = db.prepare("SELECT * FROM videos WHERE id = ?").get(result.lastInsertRowid);
    return json(res, { video }, 201);
  }

  const videoMatch = pathname.match(/^\/api\/videos\/(\d+)$/);
  if (videoMatch && method === "PUT") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const id = videoMatch[1];
    db.prepare("UPDATE videos SET title=?, status=?, quality_grade=? WHERE id=? AND user_id=?").run(body.title, body.status || "draft", body.quality_grade || "B", id, user.id);
    const video = db.prepare("SELECT * FROM videos WHERE id = ?").get(id);
    return json(res, { video });
  }

  if (videoMatch && method === "DELETE") {
    const user = requireAuth(req, res);
    if (!user) return true;
    db.prepare("DELETE FROM videos WHERE id = ? AND user_id = ?").run(videoMatch[1], user.id);
    return json(res, { ok: true });
  }

  // ════════════════════════════════
  // ASSETS
  // ════════════════════════════════

  if (pathname === "/api/assets" && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const type = query.type || "";
    let sql = "SELECT * FROM assets WHERE user_id = ?";
    const params = [user.id];
    if (type) { sql += " AND type = ?"; params.push(type); }
    sql += " ORDER BY created_at DESC";
    return json(res, { assets: db.prepare(sql).all(...params) });
  }

  if (pathname === "/api/assets" && method === "POST") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const result = db.prepare("INSERT INTO assets (user_id, type, name, file_url, duration, file_size, tags, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(user.id, body.type || "video", body.name || "未命名素材", body.file_url || "", body.duration || "", body.file_size || "", JSON.stringify(body.tags || []), "ready");
    const asset = db.prepare("SELECT * FROM assets WHERE id = ?").get(result.lastInsertRowid);
    return json(res, { asset }, 201);
  }

  const assetMatch = pathname.match(/^\/api\/assets\/(\d+)$/);
  if (assetMatch && method === "DELETE") {
    const user = requireAuth(req, res);
    if (!user) return true;
    db.prepare("DELETE FROM assets WHERE id = ? AND user_id = ?").run(assetMatch[1], user.id);
    return json(res, { ok: true });
  }

  // ════════════════════════════════
  // ACCOUNTS (platform accounts)
  // ════════════════════════════════

  if (pathname === "/api/accounts" && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;
    return json(res, { accounts: db.prepare("SELECT * FROM accounts WHERE user_id = ? ORDER BY platform, created_at DESC").all(user.id) });
  }

  if (pathname === "/api/accounts" && method === "POST") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const result = db.prepare("INSERT INTO accounts (user_id, platform, account_name, followers, status) VALUES (?, ?, ?, ?, ?)").run(user.id, body.platform || "", body.account_name || "", body.followers || 0, "connected");
    const account = db.prepare("SELECT * FROM accounts WHERE id = ?").get(result.lastInsertRowid);
    return json(res, { account }, 201);
  }

  const acctMatch = pathname.match(/^\/api\/accounts\/(\d+)$/);
  if (acctMatch && method === "DELETE") {
    const user = requireAuth(req, res);
    if (!user) return true;
    db.prepare("DELETE FROM accounts WHERE id = ? AND user_id = ?").run(acctMatch[1], user.id);
    return json(res, { ok: true });
  }

  // ════════════════════════════════
  // DISTRIBUTIONS
  // ════════════════════════════════

  if (pathname === "/api/distributions" && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const rows = db.prepare(`
      SELECT d.*, v.title as video_title, a.account_name
      FROM distributions d
      LEFT JOIN videos v ON d.video_id = v.id
      LEFT JOIN accounts a ON d.account_id = a.id
      WHERE d.user_id = ?
      ORDER BY d.created_at DESC
    `).all(user.id);
    return json(res, { distributions: rows });
  }

  if (pathname === "/api/distributions" && method === "POST") {
    const user = requireAuth(req, res);
    if (!user) return true;
    const body = await parseBody(req);
    const result = db.prepare("INSERT INTO distributions (user_id, video_id, account_id, platform, title, hashtags, status) VALUES (?, ?, ?, ?, ?, ?, ?)").run(user.id, body.video_id, body.account_id || null, body.platform || "", body.title || "", body.hashtags || "", body.status || "pending");
    const dist = db.prepare("SELECT * FROM distributions WHERE id = ?").get(result.lastInsertRowid);
    return json(res, { distribution: dist }, 201);
  }

  // ════════════════════════════════
  // DASHBOARD STATS
  // ════════════════════════════════

  if (pathname === "/api/stats" && method === "GET") {
    const user = requireAuth(req, res);
    if (!user) return true;

    const totalVideos = db.prepare("SELECT COUNT(*) as c FROM videos WHERE user_id = ?").get(user.id).c;
    const totalAssets = db.prepare("SELECT COUNT(*) as c FROM assets WHERE user_id = ?").get(user.id).c;
    const totalScripts = db.prepare("SELECT COUNT(*) as c FROM scripts WHERE user_id = ?").get(user.id).c;
    const publishedVideos = db.prepare("SELECT COUNT(*) as c FROM videos WHERE user_id = ? AND status = 'published'").get(user.id).c;
    const totalViews = db.prepare("SELECT COALESCE(SUM(views), 0) as s FROM videos WHERE user_id = ?").get(user.id).s;
    const totalLikes = db.prepare("SELECT COALESCE(SUM(likes), 0) as s FROM videos WHERE user_id = ?").get(user.id).s;
    const totalDistributions = db.prepare("SELECT COUNT(*) as c FROM distributions WHERE user_id = ?").get(user.id).c;
    const accounts = db.prepare("SELECT platform, COUNT(*) as count FROM accounts WHERE user_id = ? GROUP BY platform").all(user.id);

    return json(res, {
      stats: {
        totalVideos,
        totalAssets,
        totalScripts,
        publishedVideos,
        totalViews,
        totalLikes,
        totalDistributions,
        accountsByPlatform: accounts,
      }
    });
  }

  // ════════════════════════════════
  // 404 for unknown API routes
  // ════════════════════════════════
  return json(res, { error: "接口不存在" }, 404);
}

module.exports = { handleAPI };
