const logger = require("../../../config/winston");
const { addUser, findUserByEmail } = require("../../dbFunctions/user");
const { Conflict, ServerError, Success, ValidationError } = require("../../responses");
const { hash } = require("../../utils/password");
const { generate } = require("../../utils/jwt");
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ ...ValidationError, errors: errors.array() });
    
    const { name, email, password } = req.body;
    const existing_user = await findUserByEmail(email);
    if (existing_user)
      return res.json({ ...Conflict, message: "User with given email exists" });
    
    const passwordhash = await hash(password);
    const user = await addUser(name, email, passwordhash);
    
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
