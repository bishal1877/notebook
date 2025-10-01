import sql from "./db.js"; 
import express from "express";
import cors from "cors";
import {body,validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import session from "express-session";
import { transporter } from "./nodemail.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

app.use(session({
  secret: 'yoyo',
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/checksession", (req, res) => {
  if (req.session.user) {
   return res.status(200).json({ loggedIn: true, id: req.session.user.id });
  } else {
   return  res.status(200).json({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Name may vary if you changed session name
    res.json({ message: "Logged out" });
  });
});


app.get("/login", async (req, res) => {
  try {

    const result =
      await sql`SELECT password,id FROM usertable WHERE email = ${req.query.email}`;
console.log(req.query);
    if (
      result.length > 0 &&
      bcrypt.compareSync(req.query.password, result[0].password)
    ) {
      req.session.user = {
        id: result[0].id,
        email: req.query.email,
      };

      console.log("User session saved:", req.session.user);
      return res
        .status(200)
        .json({ message: "Login successful", id: result[0].id });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getnotes", async (req, res) => {
  // Check if the user is logged in by looking at the session
  console.log("Session data:", req.session.user);
  if (req.session.user) {
    try {
      // Get the user ID from the session, NOT from req.query
      const userId = req.session.user.id;
      console.log("Fetching notes for user ID:", userId);

      let fd = await sql`select * from usernotes where userid=${userId}`;
      return res.json({ notes: fd });
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ message: "Error fetching notes" });
    }
  } else {
    // If there's no user in the session, they are not authorized
    res.status(401).json({ message: "Unauthorized: Please log in." });
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
  console.log(req.body,"frry  fgrr");
let response=await sql`Insert into usernotes(userid,title,content) values(${req.body.userid},${req.body.title},${req.body.desc}) returning *`;
return res.json({messgae:"Done",notesid:response[0].notesid});
}catch(error){
return res.status(400).json({message:"Internal Server Error"   
});
}

})



app.post('/signup', [body('form.email').isEmail()]  ,async (req,res)=>{
try{
  console.log('yoyoy yoy',req.body);
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ message: "Invalid credentials" });
}
let existingUser=await sql`Select * from usertable where email=${req.body.form.email}`;
if(existingUser.length>0)
  return res.status(401).json({message:"User already exists"});
let result=await sql `Insert into usertable(name,email,password) values (${req.body.form.name},${req.body.form.email},${req.body.form.password}) returning *`
if(result.length>0)
  {
    const mailopt={
      from:process.env.email,
      to:req.body.form.email,
      subject:"Account Created Successfully",
      text:`Hello ${req.body.form.name},\nYour account has been created successfully.\n\nThank you!`
    }
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
