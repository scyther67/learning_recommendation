const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://Knowledge:fyp2020kbr@knowledgebasedrecommend.fp2qz.mongodb.net/User",
  JWT: process.env.JWT || "secret",
};
