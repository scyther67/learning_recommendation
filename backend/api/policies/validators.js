const { body } = require('express-validator');

module.exports = {
    authRegister: () => {
        return [
            body('email', 'Invalid Email').exists().isEmail(),
            body('name', 'Invalid Name').exists().isAlpha(),
            body('password', 'Invalid Password').exists().isLength({ min: 5 }),
            body('age', 'Invalid Age').exists().isNumeric({no_symbols:true}),
            body('field_of_study', 'Please Enter this Field').exists(),
            body('recent_education', 'Please Enter this Field').exists(),
            body('proficiency', 'Invalid Proficiency').exists().isNumeric()
        ]
    },
    authLogin: () => {
        return [
            body('email', 'Invalid Email').exists().isEmail(),
            body('password','Invalid Password').exists().isLength({min:5})
        ]
    },
    convertToAdmin: () => {
        return [
            body('email', 'Invalid email').exists().isEmail()
        ]
    },
    visitedResource: () => {
        return [
            body('url', '').exists(),
            body('totalTime', '').exists(),
            body('startTimeStamp', '').exists(),
            body('endTimeStamp', '').exists(),
            body('intervals', '').exists()
        ]
    },

}