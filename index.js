import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import StudentModel from './models/student.model.js';  
const app= express();
const port=process.env.PORT || 3000;
const db_connection_string=process.env. MONGODB_URI;
app.use(express.json());
app.post("/student/add", async(req, res) => {
    try {
     const addedStudent=await StudentModel.create(req.body);
     res.status(201).json({message:"Student added!", student:addedStudent});
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Error adding student' });
    }
})
mongoose.connect(db_connection_string)

.then(() =>{
    
    console.log('connected to MongoDB')
})
    .catch((err) =>{
console.log(err)
    })



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});