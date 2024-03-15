
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import StudentModel from './models/student.model.js';  
import Facilitator from './routers/facilitator.router.js';

const app= express();
const port=process.env.PORT || 3000;
const db_connection_string=process.env. MONGODB_URI;
app.use(express.json());
app.use(Facilitator)
  
  
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