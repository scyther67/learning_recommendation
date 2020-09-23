const jwt = require('jsonwebtoken');
const {JWT} = require('../../config/loadConfig');

module.exports = {
  generate: (data) => {
    return new Promise((resolve, reject) => {
      jwt.sign({ ...data }, JWT, (err, result) => {
        if (err || result == null) {
          return reject({
            success: false
          });
        }
        return resolve({
          success: true,
          token: result,
        });
      });
    });
  },

  verify: (token) => {
    return new Promise((resolve, reject) => {
      return jwt.verify(token, JWT, (err, result) => {
        if (err || result == null) {
          return reject({
            success: false
          });
        }
        return resolve({
          success: true,
          ...result,
        });
      });
    });
  },
};
