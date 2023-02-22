const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet =require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const port = process.env.PORT || 5500

dotenv.config();

// mongoDB connect
mongoose.set('strictQuery',true)
mongoose.connect(process.env.Mongo_URL, ()=>{
    console.log("connected to mongo")
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// user router
app.use('/api/users', userRoute);

// login and register router
app.use('/api/auth',authRoute);

// post router
app.use('/api/post', postRoute);

app.listen(port,()=>{
    console.log('backend running')
})