const express = require("express");
const app = express();
const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");
const productRoute = require("./api/routes/product");
const userRoute = require("./api/routes/user");
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const CORS = require('cors');

mongoose.connect('mongodb+srv://hkkaushik:8954745517@cluster0.bbvpu.mongodb.net/api?retryWrites=true&w=majority');
mongoose.connection.on('error',err=>{
    console.log('Connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('connected with database');
})
app.use(CORS());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/student", studentRoute);
app.use("/faculty", facultyRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad request",
  });
});

app.use((req, res, next) => {
  res.status(200).json({
    message: "app is running",
  });
});
module.exports = app;
