const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const MONGODB=process.env.Mongo
 module.exports=Connection=()=>{

mongoose.connect(MONGODB,{
useNewUrlParser:true,
useUnifiedTopology:true,

});
mongoose.connection.on('connected',()=>{
    console.log("Database connected Succesfully")
});
mongoose.connection.on('disconnected',()=>{
    console.log("Database disconnected");
});
mongoose.connection.on('error',(error)=>{
    console.log("Error while connecting with the databse",error.message);
})
};
