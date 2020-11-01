const express = require("express");
const router = express.Router();
const { Auth, AuthAdmin } = require("../api/policies");
const multer1 = require("../api/utils/uploadFile");

const Test = require("../api/routes/test");
const Learning = require("../api/routes/learning");
const User = require("../api/routes/user");
const StudentResponse = require("../api/routes/student_response");
const Question = require("../api/routes/question");

router.get("/", (req, res) => {
  res.send("Working Fine");
});

router.post("/student-response", Auth, StudentResponse.Response);

router.post("/auth/register", User.Register);
router.post("/auth/login", User.Login);
// router.post("/auth/registerAdmin", AuthAdmin, User.RegisterAdmin);
router.post("/auth/convertToAdmin", AuthAdmin, User.ConvertToAdmin);
router.post("/learning/visitedResource", Auth, Learning.visitedResource);

// router.post("/learning/visitedResource", Learning.visitedResource);

router.post("/test/testDetails", Test.testDetails);
router.post("/test/testLearningDetails", Test.testLearningDetails);

router.post("/question/addQuestion", AuthAdmin, multer1.single("excelfile"), Question.addQuestion);

router.post("/question/reqQuestion", Auth, Question.reqQuestion);
router.post("/question/allTopicQuestions", Question.allTopicQuestions);
// router.post("/image", multer1.single("excelfile"), (req, res, next) => {
//   try {
//     console.log(req.file);
//     return res.json({ message: "Uploaded" });
//   }
//   catch(err){
//     res.json({ message: "Error" });
//   }
// });
module.exports = router;
