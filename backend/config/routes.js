const express = require("express");
const router = express.Router();
const { Auth, AuthAdmin } = require("../api/policies");

const Test = require("../api/routes/test");
const Learning = require("../api/routes/learning");
const User = require("../api/routes/user");
const StudentResponse = require("../api/routes/student_response");

router.get("/", (req, res) => {
  res.send("Working Fine");
});

router.post("/student-response", Auth, StudentResponse.Response);

router.post("/auth/register", User.Register);
router.post("/auth/login", User.Login);
// router.post("/auth/registerAdmin", AuthAdmin, User.RegisterAdmin);
router.post("/learning/visitedResource", Auth, Learning.visitedResource);

// router.post("/learning/visitedResource", Learning.visitedResource);

router.post("/test/testDetails", Test.testDetails);
router.post("/test/testLearningDetails", Test.testLearningDetails);

router.post("/question/addQuestion", AuthAdmin, Question.addQuestion);

module.exports = router;
