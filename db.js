const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(__dirname, "magicmix.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ── Schema ──
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar TEXT DEFAULT '',
    plan TEXT DEFAULT 'free',
    created_at TEXT DEFAULT (datetime('now')),
    last_login TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    url TEXT DEFAULT '',
    platform TEXT DEFAULT '',
    category TEXT DEFAULT '',
    description TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    price REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS scripts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER,
    title TEXT NOT NULL,
    style TEXT DEFAULT '',
    tone TEXT DEFAULT '',
    content TEXT DEFAULT '',
    scenes TEXT DEFAULT '[]',
    word_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'draft',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    script_id INTEGER,
    product_id INTEGER,
    title TEXT NOT NULL,
    duration TEXT DEFAULT '0:00',
    ratio TEXT DEFAULT '9:16',
    style TEXT DEFAULT '',
    status TEXT DEFAULT 'draft',
    thumb_url TEXT DEFAULT '',
    video_url TEXT DEFAULT '',
    originality_score INTEGER DEFAULT 0,
    quality_grade TEXT DEFAULT 'B',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (script_id) REFERENCES scripts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT DEFAULT 'video',
    name TEXT NOT NULL,
    file_url TEXT DEFAULT '',
    thumb_url TEXT DEFAULT '',
    duration TEXT DEFAULT '',
    file_size TEXT DEFAULT '',
    tags TEXT DEFAULT '[]',
    status TEXT DEFAULT 'ready',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    platform TEXT NOT NULL,
    account_name TEXT NOT NULL,
    avatar TEXT DEFAULT '',
    followers INTEGER DEFAULT 0,
    status TEXT DEFAULT 'connected',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS distributions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    video_id INTEGER NOT NULL,
    account_id INTEGER,
    platform TEXT NOT NULL,
    title TEXT DEFAULT '',
    hashtags TEXT DEFAULT '',
    status TEXT DEFAULT 'pending',
    scheduled_at TEXT,
    published_at TEXT,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (video_id) REFERENCES videos(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// ── Helper: hash password ──
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const testHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === testHash;
}

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// ── Seed demo data ──
function seedIfEmpty() {
  const count = db.prepare("SELECT COUNT(*) as c FROM users").get().c;
  if (count > 0) return;

  // Demo user
  const pwHash = hashPassword("demo123");
  const userStmt = db.prepare("INSERT INTO users (username, email, password_hash, avatar, plan) VALUES (?, ?, ?, ?, ?)");
  const u = userStmt.run("demo", "demo@magicmix.com", pwHash, "", "pro");
  const userId = u.lastInsertRowid;

  // Demo products
  const prodStmt = db.prepare("INSERT INTO products (user_id, name, url, platform, category, description, price) VALUES (?, ?, ?, ?, ?, ?, ?)");
  const products = [
    [userId, "养生茶礼盒", "https://item.taobao.com/123", "淘宝", "食品", "精选有机茶叶礼盒，送礼佳品", 128],
    [userId, "美妆护肤套装", "https://item.jd.com/456", "京东", "美妆", "补水保湿护肤三件套", 299],
    [userId, "智能蓝牙耳机", "https://item.pdd.com/789", "拼多多", "数码", "降噪蓝牙耳机，续航30小时", 199],
  ];
  const prodIds = products.map(p => prodStmt.run(...p).lastInsertRowid);

  // Demo scripts
  const scriptStmt = db.prepare("INSERT INTO scripts (user_id, product_id, title, style, tone, content, scenes, word_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  const scripts = [
    [userId, prodIds[0], "养生茶种草文案", "种草安利", "轻松活泼", "姐妹们！这个养生茶真的要安利一百遍！", JSON.stringify([{time:"0-3s",type:"Hook",text:"姐妹们！这个养生茶真的要安利一百遍！"},{time:"3-8s",type:"痛点",text:"熬夜脸黄、气色差、镜头直接放对比变化"},{time:"8-18s",type:"产品展示",text:"真材实料看得见，冲泡方便，颜色透亮"},{time:"18-25s",type:"卖点",text:"评论区全是回购反馈，复购率超高"},{time:"25-28s",type:"CTA",text:"链接在下方，冲！"}]), 156, "published"],
    [userId, prodIds[1], "美妆测评对比", "测评对比", "专业真实", "今天测评这款护肤套装，看看到底值不值", JSON.stringify([{time:"0-3s",type:"Hook",text:"今天测评这款护肤套装"},{time:"3-10s",type:"对比",text:"左脸用旧款右脸用新款"},{time:"10-20s",type:"效果",text:"补水效果一目了然"},{time:"20-25s",type:"总结",text:"性价比超高推荐入手"}]), 120, "published"],
    [userId, prodIds[2], "蓝牙耳机种草", "剧情植入", "年轻潮流", "地铁上戴着它，世界都安静了", JSON.stringify([{time:"0-3s",type:"Hook",text:"地铁嘈杂到崩溃？"},{time:"3-8s",type:"场景",text:"戴上耳机瞬间安静"},{time:"8-15s",type:"体验",text:"音质超赞续航持久"},{time:"15-20s",type:"CTA",text:"赶紧入手吧"}]), 98, "draft"],
  ];
  const scriptIds = scripts.map(s => scriptStmt.run(...s).lastInsertRowid);

  // Demo videos
  const videoStmt = db.prepare("INSERT INTO videos (user_id, script_id, product_id, title, duration, ratio, style, status, originality_score, quality_grade, views, likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  const videos = [
    [userId, scriptIds[0], prodIds[0], "养生茶种草01", "0:28", "9:16", "种草", "published", 97, "S", 12800, 890],
    [userId, scriptIds[0], prodIds[0], "养生茶种草02", "0:25", "9:16", "种草", "published", 95, "A", 8600, 520],
    [userId, scriptIds[1], prodIds[1], "美妆测评02", "0:30", "9:16", "测评", "published", 91, "A", 15200, 1100],
    [userId, scriptIds[1], prodIds[1], "美妆测评03", "0:22", "9:16", "测评", "exported", 88, "B", 0, 0],
    [userId, scriptIds[2], prodIds[2], "蓝牙耳机种草01", "0:20", "9:16", "剧情", "draft", 93, "A", 0, 0],
    [userId, null, null, "科普口播01", "0:35", "9:16", "科普", "published", 96, "S", 22100, 1800],
    [userId, null, null, "餐饮引流02", "0:18", "9:16", "促销", "published", 89, "B", 5400, 310],
    [userId, null, null, "养生茶种草03", "0:30", "9:16", "种草", "exported", 94, "A", 0, 0],
  ];
  videos.forEach(v => videoStmt.run(...v));

  // Demo assets
  const assetStmt = db.prepare("INSERT INTO assets (user_id, type, name, file_url, duration, file_size, tags, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  const assets = [
    [userId, "video", "养生茶产品展示.mp4", "/uploads/tea-demo.mp4", "0:45", "12.3MB", '["产品","养生茶"]', "ready"],
    [userId, "video", "美妆上脸实拍.mp4", "/uploads/makeup-demo.mp4", "1:20", "28.5MB", '["美妆","实拍"]', "ready"],
    [userId, "video", "蓝牙耳机开箱.mp4", "/uploads/earphone-unbox.mp4", "2:10", "45.1MB", '["数码","开箱"]', "ready"],
    [userId, "image", "产品主图-养生茶.jpg", "/uploads/tea-main.jpg", "", "1.2MB", '["主图","养生茶"]', "ready"],
    [userId, "image", "产品主图-美妆.jpg", "/uploads/makeup-main.jpg", "", "0.8MB", '["主图","美妆"]', "ready"],
    [userId, "audio", "背景音乐-轻快.mp3", "/uploads/bgm-light.mp3", "3:00", "4.5MB", '["BGM","轻快"]', "ready"],
    [userId, "audio", "背景音乐-治愈.mp3", "/uploads/bgm-healing.mp3", "2:30", "3.8MB", '["BGM","治愈"]', "ready"],
  ];
  assets.forEach(a => assetStmt.run(...a));

  // Demo accounts
  const acctStmt = db.prepare("INSERT INTO accounts (user_id, platform, account_name, followers, status) VALUES (?, ?, ?, ?, ?)");
  const accts = [
    [userId, "抖音", "MagicMix养生号", 28000, "connected"],
    [userId, "抖音", "MagicMix美妆号", 15000, "connected"],
    [userId, "抖音", "MagicMix数码号", 8500, "connected"],
    [userId, "快手", "养生好物分享", 12000, "connected"],
    [userId, "快手", "美妆种草日记", 9000, "connected"],
    [userId, "小红书", "养生茶测评", 6500, "connected"],
  ];
  accts.forEach(a => acctStmt.run(...a));

  // Demo distributions
  const distStmt = db.prepare("INSERT INTO distributions (user_id, video_id, account_id, platform, title, hashtags, status, views, likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  const dists = [
    [userId, 1, 1, "抖音", "养生茶种草01", "#养生 #好物推荐 #健康生活", "published", 12800, 890],
    [userId, 2, 1, "抖音", "养生茶种草02", "#养生 #好物推荐", "published", 8600, 520],
    [userId, 3, 2, "抖音", "美妆测评02", "#美妆 #护肤 #测评", "published", 15200, 1100],
    [userId, 6, 4, "快手", "科普口播01", "#科普 #养生", "published", 22100, 1800],
    [userId, 7, 6, "小红书", "餐饮引流02", "#美食 #引流", "published", 5400, 310],
  ];
  dists.forEach(d => distStmt.run(...d));

  console.log("Database seeded with demo data");
}

seedIfEmpty();

module.exports = {
  db,
  hashPassword,
  verifyPassword,
  generateToken,
};
