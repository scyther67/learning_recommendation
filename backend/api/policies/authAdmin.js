const {verify} = require('../utils/jwt');
const logger = require('../../config/winston');
const {AuthError, Forbidden} = require('../responses');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const accessToken = req.headers['authorization'];
  if (accessToken == null) return res.status(401).json(AuthError);
  try {
    const token = await verify(accessToken);
    if (token.success != true) return res.status(401).json(AuthError);
    const user = await User.findOne({ _id: token.id })
    
    if (user == null || !user.isAdmin) return res.status(401).json(AuthError);
    req.body.userId = token.id;
    
    next();
  } catch (err) {
    logger.info({message: `Invalid access attempt`});
    return res.status(401).json(AuthError);
  }
};
