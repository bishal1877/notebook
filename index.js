import sql from "./db.js"; 
import express from "express";
import cors from "cors";
import {body,validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 app.use(cors());
app.get("/login" ,async (req, res) => {
  try {
        console.log(req.body, "  jbygyy ",req.query);
    const result = await sql`SELECT password,id FROM usertable WHERE email = ${req.query.email}`;
    
 //if(bcrypt.compareSync(req.query.password,result[0].password))
  if (
    result.length > 0 &&
    bcrypt.compareSync(req.query.password, result[0].password)
  ) {
    console.log(result[0].password, "  hujhg");
    return res.status(200).json({ message: "Valid User" ,id:result[0].id });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }  
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
});

app.get('/getnotes',async (req,res)=>{
  try {
    console.log(req.query,'   id');
   let fd= await sql`select * from usernotes where userid=${req.query.id}`;
   console.log(fd);
    return res.json({ notes:fd });
  } catch (error) {
    alert("unsuccessful");
  }
})


app.post('/addnotes',async(req,res)=>{
try{
  console.log(req.body);
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
  res.status(200).json({message:"Account created Successfully"});
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
