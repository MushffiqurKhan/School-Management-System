const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('MongoDB Connected');
    }catch (error){
        console.error('MongoDB connection failed:',error.message);
        process.exit(1)
    }
};


module.exports = {connectDB,
    Student:require("../Model/StudentsModel"),
    Teacher:require("../Model/TeacherModal"),
    Principal:require("../Model/PrincipalModel"),
    User:require("../Model/userModel"),
    OTPLog:require("../Model/OTP_log")
};
