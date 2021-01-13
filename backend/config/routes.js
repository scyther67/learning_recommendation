const express = require("express");
const router = express.Router();
const { Auth, AuthAdmin } = require("../api/policies");
const multer1 = require("../api/utils/uploadFile");

const Test = require("../api/routes/test");
const Learning = require("../api/routes/learning");
const User = require("../api/routes/user");
const StudentResponse = require("../api/routes/student_response");
const Question = require("../api/routes/question");
const Validators = require("../api/policies/validators");
const Suggestions = require("../api/routes/suggestions");

router.get("/", (req, res) => {
  res.send("Working Fine");
});

router.post("/auth/register", Validators.authRegister(), User.Register);
router.post("/auth/login", Validators.authLogin(), User.Login);
// router.post("/auth/registerAdmin", AuthAdmin, User.RegisterAdmin);
router.post(
  "/auth/convertToAdmin",
  AuthAdmin,
  Validators.convertToAdmin(),
  User.ConvertToAdmin
);

router.post(
  "/user/updateSubtopicTimeStamp",
  Auth,
  User.UpdateSubtopicTimeStamp
);

router.post("/learning/visitedResource", Auth, Learning.visitedResource);

// router.post("/learning/visitedResource", Learning.visitedResource);

router.post("/test/testDetails", Test.testDetails);
router.post("/test/testLearningDetails", Test.testLearningDetails);

router.post(
  "/question/addQuestion",
  AuthAdmin,
  multer1.single("excelfile"),
  Question.addQuestion
);

router.post("/question/reqQuestion", Auth, Question.reqQuestion);
router.post("/question/allTopicQuestions", Question.allTopicQuestions);
router.post("/question/averageAnswerTime", Auth, Question.averageAnswerTime);

router.post("/student-response", Auth, StudentResponse.Response); //not used rn

router.post(
  "/suggestions/suggestionBySubTopic",
  Auth,
  Suggestions.suggestWebsites
);

router.post(
  "/suggestions/addSuggestionsExcel",
  Auth,
  multer1.single("websitefile"),
  Suggestions.addSuggestionsExcel
);

module.exports = router;
