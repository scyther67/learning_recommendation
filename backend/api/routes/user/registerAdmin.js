const logger = require("../../../config/winston");
const { addAdmin, findUserByEmail } = require("../../dbFunctions/user");
const { Conflict, ServerError, Success } = require("../../responses");
const { hash } = require("../../utils/password");
const { generate } = require("../../utils/jwt");

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing_user = await findUserByEmail(email);
    if (existing_user)
      return res.json({ ...Conflict, message: "User with given email exists" });
    
    const passwordhash = await hash(password);
    const user = await addAdmin(name, email, passwordhash);
    
    if (user == null)
      return res.json({ ...ServerError, message: "Error creating user" });

    let token = await generate({ id: user.id });
    return res.json({ ...Success, token: token.token });
  } catch (error) {
    console.log(error);
    logger.error({ error, message: "Some error occured" });
    res.json(ServerError);
  }
};
