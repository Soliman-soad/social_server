const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet =require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
mongoose.set('strictQuery',true)
mongoose.connect(process.env.Mongo_URL, ()=>{
    console.log("conected to mongo")
});

app.listen(5500,()=>{
    console.log('back end runing')
})