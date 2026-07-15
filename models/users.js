const Mongoose=require("mongoose")
const UserSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

var UserModel=Mongoose.model("users",UserSchema)
module.exports=UserModel