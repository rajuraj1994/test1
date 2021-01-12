const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
first_name:{
type:String,
required:true
},
last_name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
contact:{
    type:Number,
    required:true,
},
address:{
    type:String,
    required:true,
}
});
module.exports=mongoose.model('User',userSchema);