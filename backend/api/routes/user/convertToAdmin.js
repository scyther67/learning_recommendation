const logger = require("../../../config/winston");
const { findUserByEmail,convertToAdmin } = require("../../dbFunctions/user");
const { Conflict, ServerError, Success, NotFound } = require("../../responses");

module.exports = async (req, res) => {
  try {
        const { email } = req.body;
        const existing_user = await findUserByEmail(email); 

        if (existing_user == null) return res.json({ ...NotFound, msg: "User not found" });
        if (existing_user.isAdmin) return res.json({ ...Conflict, msg: "Already an admin" });
    
        const user = await convertToAdmin(email);

        if (user == null || !user.isAdmin)
          return res.json({ ...ServerError, message: "Error upgrading to Admin" });

        return res.json({ ...Success });
  } catch (error) {
    console.log(error);
    logger.error({ error, message: "Some error occured" });
    res.json(ServerError);
  }
};
