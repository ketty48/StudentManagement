import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import StudentModel from './models/student.model.js';  
const app= express();
const port=process.env.PORT || 3000;
const db_connection_string=process.env. MONGODB_URI;
app.use(express.json());
app.post("/student/create", async(req, res) => {
    try {
     const addedStudent=await StudentModel.create(req.body);
     res.status(201).json({message:"Student added!"});
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Error adding student' });
    }
});
app.get("/student/list", async(req, res) =>{
    try {
        const studentList=await StudentModel.find();
        res.status(200).json({message:"All students retrieved", 
        students: studentList});
    } catch (error) {
        console.error('Error listing students:', error);
        res.status(500).json({ error: 'Error listing students' });
    }
});
app.put("/student/update/:id", async (req, res) => {
    try {
      const studentId = req.params.id;
      const updateData = req.body;
  
      const updatedStudent = await StudentModel.findByIdAndUpdate(studentId, updateData);
      if (updatedStudent) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: "Student updated!" });
      } else {
        res.status(404).json({ message: "Student not found!" });
      }
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(400).json({ error: 'Failed to update student. Please check your request data.' });
    }
  });
  
  app.delete("/student/delete/:id", async (req, res) => {
    try {
      const studentId = req.params.id;
      const deletedStudent = await StudentModel.findByIdAndDelete(studentId);
  
      if (deletedStudent) {
        res.status(200).json({ message: "Student deleted!" });
      } else {
        res.status(404).json({ message: "Student not found!" });
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(400).json({ error: 'Failed to delete student. Please check your request data.' });
    }
  });
  app.get("/student/list/:id", async (req, res) => {
    try {
      const studentId = req.params.id;
      const student = await StudentModel.findById(studentId);
      if(student) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "Student not found!" });
      }
      
    } catch (error) {
        console.error('Error retrieving student:', error);
        res.status(400).json({ error: 'Failed to retrieve student. Please check your request data.' });
  
  }

});

app.get('/student/by-email', async (req, res) => {
    try {
      const email = req.query.email; 
      
      if (!email) {
        return res.status(400).json({ error: 'Email parameter is missing.' });
      }
      
      const lowercaseEmail = email.toLowerCase();
      const student = await StudentModel.findOne({ email: lowercaseEmail });
      
      if (student) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "Student not found!" });
      }
    } catch (error) {
      console.error('Error retrieving student:', error);
      res.status(500).json({ error: 'Failed to retrieve student. Please try again later.' });
    }
  });
  
  
  
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