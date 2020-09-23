const {findUserByEmail} = require('../../dbFunctions/user');
const logger = require('../../../config/winston');
const { Success,AuthError, ServerError } = require('../../responses');
const { verify } = require('../../utils/password');
const {generate} = require('../../utils/jwt');

module.exports = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) return res.json({ ...AuthError, message: "Incorrect email" });
        const confirmation = await verify(password, user.password);

        if (!confirmation) return res.json({ ...AuthError, message: "Incorrect credentials" });

        let token = await generate({ id: user.id });
        return res.json({ ...Success, name: user.name, token:token.token});
    } catch(error) {
        logger.error({err:error, message: "An error occured"});
        return res.json(ServerError);
    }
}