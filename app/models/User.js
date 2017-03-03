var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true  
    },
    password:{
        type:String,
        required:true
    },
    portofolioname:{
        type:String,
        default:""
    },
    image:{
      type:String,
      default:"default.png"        
    },
    work:[
       {
         title      : String ,  
         chose      : Number ,
         url        : String ,
         screenshot : String ,
         code       : String  
       }
    ]  

});

var User = mongoose.model("user", UserSchema);

module.exports = User;