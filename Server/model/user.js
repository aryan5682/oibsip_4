const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const Joi =require('joi');
const passwordComplexity=require('joi-password-complexity')
const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{type:String,required:true},
    todoitems:[
      {type: String}
    ],

});
userSchema.methods.generateAuthToken=function(){
const token =jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})

return token;

};
const User =mongoose.model("user",userSchema);

const validate = (data) => {
    const passwordComplexityOptions = {
      min: 8,              // Minimum password length
      max: 30,             // Maximum password length
      lowerCase: 1,        // Require at least 1 lowercase letter
      upperCase: 1,        // Require at least 1 uppercase letter
      numeric: 1,          // Require at least 1 numeric digit
      symbol: 1,           // Require at least 1 special character
      requirementCount: 4, // Total number of requirements to meet (set to 4 for all of the above)
    };
  
    const passwordComplexitySchema = passwordComplexity(passwordComplexityOptions).required();
  
    const schema = Joi.object({
      firstName: Joi.string().required().label("First Name"),
      lastName: Joi.string().required().label("Last Name"),
      email: Joi.string().required().label("Email"),
      password: passwordComplexitySchema.label("Password"),
      todoitems: Joi.array().items(Joi.string()).label("Todo Items"),
    });
  
    return schema.validate(data);
  };
  
const validatelogin=(data)=>{
    const passwordComplexityOptions = {
        min: 8,              // Minimum password length
        max: 30,             // Maximum password length
        lowerCase: 1,        // Require at least 1 lowercase letter
        upperCase: 1,        // Require at least 1 uppercase letter
        numeric: 1,          // Require at least 1 numeric digit
        symbol: 1,           // Require at least 1 special character
        requirementCount: 4, // Total number of requirements to meet (set to 4 for all of the above)
      };
      const passwordComplexitySchema = passwordComplexity(passwordComplexityOptions).required();
    const schema=Joi.object({
        email:Joi.string().required().label("Email"),
        password: passwordComplexitySchema.label("Password"),
});
return schema.validate(data);
}

module.exports={User,validate,validatelogin}