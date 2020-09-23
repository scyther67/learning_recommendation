const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10,(err,salt) => {
                if (err) return reject(err);
                bcrypt.hash(password, salt , (err, hash) =>{
                    if (err) return reject(err);
                    return resolve(hash);
                });
            });
        })
    },
    verify: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, res) {
                if (err) return reject(err);
                if (res) return resolve(true);
                return resolve(false);
            });
        })
    }
}