import sql from "./db.js"; 
import express from "express";
import cors from "cors";
import {body,validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import session from "express-session";
import { transporter } from "./nodemail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "https://notestaker-2m8z.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/checksession", (req, res) => {
  if (!req.cookies) {
    return res.status(200).json({ loggedIn: false });
  }
 const token = req.cookies.token;
  try {
    if(!token)
      return res.status(200).json({loggedIn:false});
    const user = jwt.verify(token, process.env.SECRET);
    return res.status(200).json({
      loggedIn: true,
      id: user.id, // Extract 'id' directly from the verified token payload
      naam: user.naam, // Optionally return the name as well
    });
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(200).json({ loggedIn: false });
  }
});


app.get("/logout", (req, res) => {
   try
  {if (req.cookies)
    res.clearCookie("token", {
      httpOnly: true,
      secure: "true",
      sameSite: "none",
    }); 
   return  res.status(200).json({ message: "Logged out" });
  } catch(error)
  {
    return res.status(400).json({ message: error.message });
  }
  });


app.get("/login", async (req, res) => {
  try {

    const result =
      await sql`SELECT password,id,name FROM usertable WHERE email = ${req.query.email}`;
console.log(req.query);
    if (
      result.length > 0 &&
      bcrypt.compareSync(req.query.password, result[0].password)
    ) {
      console.log("User session saved:", result);
      const token=jwt.sign({id:result[0].id,naam:result[0].name},process.env.SECRET);
      res.cookie('token',token,{
        httpOnly:true,
        secure:"true",
        sameSite:"none"
      });
      return res
        .status(200)
        .json({ message: "Login successful", id: result[0].id ,naam:result[0].name});
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getnotes", async (req, res) => {
        const token = req.cookies.token;
  if (token) {
    try {
        console.log(" thfh ", req.cookies);

      const user= jwt.verify(token,process.env.SECRET);
if(user.id)
      {let fd = await sql`select * from usernotes where userid=${user.id}`;
return res.json({success:true, notes: fd ,naam:user.naam});}
      return res.status(200).json({ success: false, message: "Not verified" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching notes" });
    }
  } else {
    res.status(200).json({success:true,  message: "Unauthorized: Please log in." });
  }
});

app.delete('/deletenotes',async(req,res)=>{
try{
let response=await sql`Delete from usernotes where notesid=${req.query.id} returning *`;
if(response.length>0)
  return res.status(200).json({message:"Deleted Successfully"});
else
  return res.status(400).json({message:"Error deleting note"});
}
catch(error){
  return res.status(400).json({message:"Internal Server Error"});
}
})




app.post('/addnotes',async(req,res)=>{
try{
 
    const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
    // Get the user ID from the session, NOT from req.query
    const user = jwt.verify(token, process.env.SECRET);
let response=await sql`Insert into usernotes(userid,title,content) values(${user.id},${req.body.title},${req.body.desc}) returning *`;
return res.status(200).json({messgae:"Done",notesid:response[0].notesid});
}catch(error){
return res.status(400).json({message:"Internal Server Error"   
});
}

})



app.post('/signup', [body('form.email').isEmail()]  ,async (req,res)=>{
try{
const errors = validationResult(req);
if (
  !errors.isEmpty() ||
  !req.body.form.name ||
  !req.body.form.email ||
  !req.body.form.password
) {
  return res.status(400).json({ message: "Invalid credentials" });
}console.log(req.body.form, "signup1",process.env.SMTPS," ",process.env.email," ",process.env.Pass);
let existingUser=await sql`Select * from usertable where email=${req.body.form.email}`;
if(existingUser.length>0)
  return res.status(401).json({message:"User already exists"});
console.log(req.body.form, "signup2");
  let result=await sql `Insert into usertable(name,email,password) values (${req.body.form.name},${req.body.form.email},${req.body.form.password}) returning *`
if(result.length>0)
  {
    const mailopt={
      from:process.env.email,
      to:req.body.form.email,
      subject:"Account Created Successfully",
      text:`Hello ${req.body.form.name},\nYour account has been created successfully.\n\nThank you!`
    }
      console.log(req.body.form, "signup",process.env.Login);
    await transporter.sendMail(mailopt);
  
    return res.status(200).json({message:"Account created Successfully"});}
else
  res.status(401).json({message:"Not"});
}catch(error){
console.log("error:",error.message);
res.status(400).json({message:"Internal Server Error"});
}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
