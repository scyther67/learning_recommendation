const logger = require("../../../config/winston");
const { addUser, findUserByEmail } = require("../../dbFunctions/user");
const { Conflict, ServerError, Success } = require("../../responses");
const { hash } = require("../../utils/password");
const { generate } = require("../../utils/jwt");

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing_user = await findUserByEmail(email);
    // console.log(existing_user);
    if (existing_user)
      return res.json({ ...Conflict, message: "User with given email exists" });

    const passwordhash = await hash(password);
    console.log(passwordhash);
    const user = await addUser(name, email, passwordhash);
    console.log(user);
    if (user == null)
      return res.json({ ...ServerError, message: "Error creating user" });

    let token = await generate({ id: user.id });
    console.log(token);
    return res.json({ ...Success, token: token.token });
  } catch (error) {
    logger.error({ error, message: "Some error occured" });
    res.json(ServerError);
  }
};
