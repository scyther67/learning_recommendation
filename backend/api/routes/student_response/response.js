const Student_Response = require("../../models/studentresponse");

module.exports = async (req, res) => {
  // console.log(req.body);
  // console.log("User is ", req.body.userId);
  try {
    const response = await Student_Response.create({
      student_id: req.body.userId,
      response: req.body.timestamps,
    });
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
  res.send({ status: "Success" });
};
