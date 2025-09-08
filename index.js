import sql from "./db.js"; 
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.get("/login" ,cors(),async (req, res) => {
  try {
        console.log(req.query.password, "  jbygyy ");
    const result = await sql`SELECT password,id FROM usertable WHERE email = ${req.query.email}`;
    console.log(result[0].password,"  hujhg");
 if(req.query.password == result[0].password){
    res.status(200).json({ message: "Login successful" ,id:result[0].id});
 }
    else{
    res.status(401).json({ message: "Invalid credentials" });
    }  
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } 
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
