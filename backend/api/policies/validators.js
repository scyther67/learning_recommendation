const { body } = require('express-validator');

module.exports = {
    authRegister: () => {
        return [
            body('email', 'Invalid email').exists().isEmail(),
            body('name', 'Invalid name').exists().isAlpha(),
            body('password', 'Invalid password').exists().isLength({ min: 5 })
        ]
    },
    authLogin: () => {
        return [
            body('email', 'Invalid email').exists().isEmail(),
            body('password','Invalid password').exists().isLength({min:5})
        ]
    }
}