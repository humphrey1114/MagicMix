if (!process.env.DB_PATH) {
  process.env.DB_PATH = "/tmp/magicmix.db";
}

const { handleAPI } = require("../api");

module.exports = async (req, res) => {
  const requestUrl = new URL(req.url, "http://localhost");
  const pathParam = requestUrl.searchParams.get("path");

  if (pathParam) {
    requestUrl.searchParams.delete("path");
    const cleanPath = String(pathParam).replace(/^\/+/, "");
    const search = requestUrl.searchParams.toString();
    req.url = `/api/${cleanPath}${search ? `?${search}` : ""}`;
  } else if (requestUrl.pathname === "/api") {
    const search = requestUrl.searchParams.toString();
    req.url = `/api/${search ? `?${search}` : ""}`;
  }

  return handleAPI(req, res);
};
