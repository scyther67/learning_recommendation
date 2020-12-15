const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/api/utils/question_images_temp');
    },
    filename: function (req, file, cb) {
        req.body[file.fieldname] = file.originalname;
        cb(null, /*Date.now()+*/file.originalname);
    }
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

module.exports = multer({ storage: storage/*, fileFilter: fileFilter */});
