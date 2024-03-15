import express   from 'express';
import mongoose from "mongoose";
import facilitatorModel from '../models/facilitator.model.js';
const app = express();
app.use(express.json());
async function addedfacilitator(req, res) {
    try {
        const facilitator=await facilitatorModel.create(req.body)
        res.status(201).json({message:"facilitator added!"});
        } catch (error) {
    console.error('Error adding facilitator:', error);
    res.status(500).json({ error: 'Error adding facilitator' });
        }
    };
    async function getFacilitators(req,res) {
        try {
            const facilitatorList=await facilitatorModel.find();
            res.status(200).json({message:"All facilitators retrieved", 
            facilitators: facilitatorList});
        } catch (error) {
    console.error('Error listing facilitators:', error);
        }
    }
    async function updatedFacilitator(req,res) {
        try {
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
    }
    async function deletedFacilitator(req,res) {
        try {
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
    }
    async function getFacilitatorById(req, res) {
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
    }
    async function getByEmail(req, res) {
        try {
            const email = req.query.email; 
            
            if (!email) {
              return res.status(400).json({ error: 'Email parameter is missing.' });
            }
            
            //const lowercaseEmail = email.toLowerCase();
            const facilitator = await facilitatorModel.findOne({ email});
            
            if (facilitator) {
              res.setHeader('Content-Type', 'application/json');
              res.status(200).json(facilitator);
            } else {
              res.status(404).json({ message: "facilitator not found!" });
            }
          } catch (error) {
            console.error('Error retrieving facilitator:', error);
            res.status(500).json({ error: 'Failed to retrieve facilitator. Please try again later.' });
          }
    }
    
        export default {
            addedfacilitator,
            getFacilitators,
            updatedFacilitator,
            deletedFacilitator,
            getFacilitatorById,
            getByEmail
          };
          