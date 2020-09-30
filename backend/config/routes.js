const express = require("express");
const router = express.Router();
const { Auth } = require("../api/policies");

const Test = require("../api/routes/test");
const Learning = require("../api/routes/learning");
const User = require("../api/routes/user");

router.get("/", (req, res) => {
  res.send("Working Fine");
});

<<<<<<< HEAD
router.post('/learning/visitedResource', Learning.visitedResource);
=======
router.post("/auth/register", User.Register);
router.post("/auth/login", User.Login);
router.post("/learning/visitedResource", Auth, Learning.visitedResource);
>>>>>>> features/frontend

// router.post("/learning/visitedResource", Learning.visitedResource);

router.post("/test/testDetails", Test.testDetails);

module.exports = router;
