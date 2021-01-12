const { createStudentResponse } = require("../../dbFunctions/student_response");
const { Success, ServerError } = require("../../responses");

module.exports = async (req, res) => {
  // console.log(req.body);
  // console.log("User is ", req.body.userId);
  try {
    const response = await createStudentResponse(req.body.userId, req.body.timestamps);
    if (response == null) return res.json({...ServerError });
    
    return res.json({ ...Success });
  } catch (error) {
    console.log(error);
    return res.json({ ...ServerError });
  }
};
