import sql from "./db.js"; 
import express from "express";
import axios from "axios";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 app.use(cors());
app.get("/login" ,async (req, res) => {
  try {
        console.log(req.query, "  jbygyy ");
    const result = await sql`SELECT password,id FROM usertable WHERE email = ${req.query.email}`;
    
 //if(bcrypt.compareSync(req.query.password,result[0].password))
  if(result.length>0)
  {console.log(result[0].password, "  hujhg");
    return res.status(200).json({ message: "Login successful" ,password:result[0].password,id:result[0].id});
 }
    else{
    res.status(401).json({ message: "Invalid credentials" });
    }  
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
alert ("unsuccessful");
}

})



app.post('/signup',async (req,res)=>{
try{
  console.log('yoyoy yoy',req.body);
let result=await sql `Insert into usertable(name,email,password) values (${req.body.form.name},${req.body.form.email},${req.body.form.password}) returning *`
if(result.length>0)
  res.status(200).json({message:"done"});
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
