const {check, validationResult} = require("express-validator");


const registerValidator = [
    check('username', 'username must be of length from 4 to 12 characters').notEmpty().isLength({min:4, max:12}),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'password must be of length form 6 to 12 characters').notEmpty().isLength({min:6}),
    check('confirm-password', 'password must be of length form 6 to 12 characters').notEmpty().isLength({min:6})
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),

]

function registerController(req, res){
    const errors  = validationResult(req)
    if (errors.isEmpty()){
        res.redirect('login')
    }else{
        res.send(errors.array())
    }
}

module.exports = {registerController,
                  registerValidator
                 }