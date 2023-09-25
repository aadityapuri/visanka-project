const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.register = (req,res)=>{
  console.log(req.body);
  const data = req.body;
  const { username, email, password, confirmPassword, number, referral} = req.body;

  conn.query("SELECT email FROM user_signup WHERE email = ?", [email],async (error, results)=>{
    if(error) throw error;
    if(results.length>0){
      return res.render('register',{
        message: 'That email is already been in use!'
      });
    }
    else if(password !== confirmPassword){
      return res.render('register',{
        message: 'Passwords do not match'
      });
    }
    let hashedPass = await bcryptjs.hash(password,8);
    console.log(hashedPass);

    conn.query('INSERT INTO user_signup SET ?',{username:username, email:email, password:password, mobile:number, referral_id:referral},(error,results)=>{
      if(error){
        throw error;
      }
      else{
        return res.render('register',{
          message: 'User Registered!'
        });
      }
    });

  })
}