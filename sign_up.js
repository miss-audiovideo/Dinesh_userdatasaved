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






let port = process.env.PORT;
if(port == null || port == ""){
    port ==3000
}

app.listen(port||3000, function () {
    console.log("server has started successfully");
})