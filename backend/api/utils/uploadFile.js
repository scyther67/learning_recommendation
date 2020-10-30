const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log(process.cwd() + './temp/');
//         cb(null, process.cwd() + '/temp');
//     },
//     filename: function (req, file, cb) {
//         req.body[file.fieldname] = file.originalname;
//         cb(null, file.originalname);
//     }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/*' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
module.exports = multer({ storage: storage/*, fileFilter: fileFilter */});
// module.exports = multer({
//     storage,
//     fileFilter: function (req, file, callback) {
//         var type = file.mimetype;
//         if(type != "image/*") {
//             req.body.errorFormat = 'Error';
//             return callback(null, false);
//         }
//         callback(null, true);
//     }
// });