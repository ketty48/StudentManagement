import express   from 'express';
import mongoose from "mongoose";
import facilitatorModel from './models/facilitator.model.js';
const app = express();

app.use(express.json());
app.post('/facilitator/create',async (req, res) => {
    try {
        const addedfacilitator=await facilitatorModel.create(req.body);
        res.status(201).json({message:"facilitator added!"});
       } catch (error) {
    console.error('Error adding facilitator:', error);
    res.status(500).json({ error: 'Error adding facilitator' });
}

});
app.get('/facilitator/list', async (req, res) => {
    try{
        const facilitatorList=await facilitatorModel.find();
        res.status(200).json({message:"All facilitators retrieved", 
        facilitators: facilitatorList});
    }catch(error) {
        console.error('Error listing facilitators:', error);
        res.status(500).json({ error: 'Error listing facilitators' });
    }
});
app.put('/facilitator/update/:id', async (req,res)=>{
    try{
        const facilitatorId=req.params.id;
        const updateData=req.body;
        const updatedFacilitator=await facilitatorModel.findByIdAndUpdate(facilitatorId, updateData);
        if(updatedFacilitator){
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: "Facilitator updated!" });
        }
    }catch(error){
        console.error('Error updating facilitator:', error);
        res.status(500).json({ error: 'Error updating facilitator' });
    }
});
app.delete('/facilitator/delete/:id',async (req,res)=>{
    try{
        const facilitatorId=req.params.id;
        const deletedFacilitator=await facilitatorModel.findByIdAndDelete(facilitatorId);
        if(deletedFacilitator){
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: "Facilitator deleted!" });
        }
    }catch(error){
        console.error('Error deleting facilitator:', error);
        res.status(500).json({ error: 'Error deleting facilitator' });
    }
});
app.get('/facilitator/list/:id', async(req, res)=>{
    try{
        const facilitatorId=req.params.id;
        const facilitator=await facilitatorModel.findById(facilitatorId);
        if(facilitator){
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ facilitator:facilitator });
        }
    }catch(error){
        console.error('Error retrieving facilitator:', error);
        res.status(500).json({ error: 'Error retrieving facilitator' });
    }
})
export default app;