const {body}=require("express-validator");
const signupValidator=()=>[
    body("firstName").isString().isLength({min:3,max:20}),
    body("lastName").isString().isLength({min:3,max:50}),
    body("age").isNumeric().withMessage("please enter a number").custom(value=>{
        if (value>90 || value<12) throw new Error("your age is not appropriate")
        else return true;
    }),
    body("mobile").isMobilePhone("fa-IR").withMessage("mobile number is not true"),
    body("email").isEmail().withMessage("please enter a email address"),
    body("password").isString().isLength({min:7,max:50}),
    body("confirmPassword").isString().custom((value,{req})=>{
        if(value!==req.body.password) throw new Error ("confirm password must be matched")
        else return true
    })
];
module.exports={
    signupValidator
}