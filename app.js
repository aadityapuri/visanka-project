const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dontenv = require("dotenv");

dontenv.config({path: './.env'});

const app = express();

const conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

conn.connect((error)=>{
  if(error){
    console.log(error);
  }
  else{
    console.log("Mysql is connected");
  }
})

//Routes
app.use('/',require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, ()=>{
  console.log("server started on port 5000");
});