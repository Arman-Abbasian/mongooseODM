const { Joi } = require("express-validation");

const signupValidation={
    body:Joi.object({
        firstName:Joi.string().min(3).max(20).required(),
        lastName:Joi.string().min(3).max(40).required(),
        age:Joi.number().integer().min(18).max(50).required(),
        mobile:Joi.string().regex(/09[0-9]{9}/).message("the mobile number is wrong number").required(),
        email:Joi.string().email().required(),
        password:Joi.string().alphanum().min(8).max(50).required(),
        confirmPassword:Joi.ref('password')
    })
};
module.exports={
    signupValidation
}