const mongoose=require("mongoose");

const ResetTokenSchema=new mongoose.Schema({
    accesstoken:
    {
        type: String,
        required:true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,//we identify the user whoh post the post by their id
        ref:'User',//refrences to User schema 
    },
    isValid:
    {
        type:Boolean,
        required:true,
    }
},{
    timestamps:true,
});



const Token=mongoose.model("Token",ResetTokenSchema);

module.exports=Token;



