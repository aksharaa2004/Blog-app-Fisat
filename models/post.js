const Mongoose=require("mongoose")


const PostSchema=Mongoose.Schema(
    {
        userId:{
            type:Mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        Message:String,

        PostedDate:{
            type:Date,
            default:Date.now}

    }
)
var PostModel=Mongoose.model("posts",PostSchema)
module.exports=PostModel