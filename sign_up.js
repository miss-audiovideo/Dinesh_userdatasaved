const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const _ = require("lodash");
const { delay } = require("lodash");

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/userdataaDB",{useNewUrlParser: true},{useUnifiedTopology: true})

const userSchema = new mongoose.Schema({
    name:String,
    country: String,
    description: String,
    email: String,
    gender:String
});

const User = mongoose.model("User",userSchema);





app.get("/",function(req,res){
    res.sendFile(__dirname + "/sign_up.html");
})

app.post("/",function(req,res){
    const nameUser = req.body.fullname
    const countryUser = req.body.c_name
    const descriptionUser =  req.body.description
    const emailUser = req.body.email
    const genderUser = req.body.gender
    const user = new User({
        name:nameUser,
        country: countryUser,
        description: descriptionUser,
        email: emailUser,
        gender:genderUser
    });
    user.save()
    console.log(user)
    res.sendFile(__dirname + "/registerd.html"); 

})

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rey.kreiger36@ethereal.email',
        pass: 'MME2hAbsDsUvDVJ2e3'
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Audiovideo@gmail.com', // sender address
    to: "Usermail" , // list of receivers
    subject: "confirmatiom email", // Subject line
    text: "You have subscribed successfully", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);






let port = process.env.PORT;
if(port == null || port == ""){
    port ==3000
}

app.listen(port||3000, function () {
    console.log("server has started successfully");
})