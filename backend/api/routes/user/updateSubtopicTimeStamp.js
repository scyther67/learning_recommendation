<<<<<<< HEAD
const { updateSubtopicTimeStamp } = require("../../dbFunctions/user");
const { ServerError, Success } = require("../../responses");
module.exports = async (req, res) => {
  try {
    // console.log("Im Here");
    const { subtopic_no, userId } = req.body;
    // console.log("In updateSubtopicTimeStamp");
    const response = await updateSubtopicTimeStamp(subtopic_no, userId);
    if (response == null)
      return res.json({
        ...ServerError,
        msg: "Could not update subtopic timestamp",
      });

    return res.json({ ...Success });
  } catch (err) {
    console.log(err);
  }
};
=======
const {updateSubtopicTimeStamp} = require("../../dbFunctions/user");
const { ServerError, Success } = require("../../responses");
module.exports = async(req, res)=>{
    try{
        const { subtopic_no, userId } = req.body;
        const response = await updateSubtopicTimeStamp(subtopic_no, userId);
        if(response == null)return res.json({...ServerError, msg:"Could not update subtopic timestamp"});

        return res.json({...Success});
    }
    catch(err){
        console.log(err);
    }
}
>>>>>>> suggestions
