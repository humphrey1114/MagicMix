if (!process.env.DB_PATH) {
  process.env.DB_PATH = "/tmp/magicmix.db";
}

const { handleAPI } = require("../api");

module.exports = async (req, res) => {
  return handleAPI(req, res);
};
