const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    avatar: {
        type: String,
        default: "https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "this email is not valid email type"] 
    },
    mobile:{
        type:String,
        required: [true, "Number is Required"],
        unique:true,
    },
    password:{
        type:String,
        required: [true, "Password is Required"],
    },
    isAdmin: { 
        type: Boolean, 
        default: false
    },
    userIP: { 
        type: String 
    },
    purchasedProducts: {
        type: Array, 
        required: false
    },


    //reset password things
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, {timestamps: true});

//Export the model
module.exports = mongoose.model('User', userSchema);