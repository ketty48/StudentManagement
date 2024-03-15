import studentModel  from "../models/students.model.js";
const studentController = {
    createNewStudent: async(req,res)=>{
        try {
            const newStudent = await studentModel.create(req.body)
            res.status(201).json({
               message:"student created successfully!!!",
               student:newStudent
            })}
            catch(error){
             console.log(error.message)
             res.status(500).json({
                message:"Internal server Error!"
             })
            }},
            getAllStudent: async(req,res)=>{
                try{
                    const getStudents=await studentModel.find()
                    res.status(201).json({
                        message:"selected all students!",
                        student:getStudents
                    })
                }catch(error){
                 console.log(error.message)
                 res.status(500).json({
                    message:"Internal server error!"
                 })
                }
            },
            getById:async (req,res)=>{
                try{
                    const getStudentById = await  studentModel.findById(req.params.id)
                res.status(201).json({
                    message:"Selected according to Id",
                    student:getStudentById
                })
                }
                catch(error){
                    console.log(error.message)
                    res.status(500).json({
                        message:"internal server error!"
                    })
                }
            },
           getByEmail:async(req,res)=>{
try{
    const email = req.params.email;

    const getByEmail= await studentModel.findOne(email)
    res.status(201).json({
        message:"selected according to email successfully",
        student:getByEmail
    })
}catch(error){
console.log(error.message)
res.status(500).json({
    message:"internal server error!"
})
           }},
            updateStudent: async(req,res)=>{
                try {
                    const updatedStudent = await studentModel.findByIdAndUpdate(req.params.id,
                         req.body,
                         {set:true});
                    
                    if(!updatedStudent){
                        return res.status(404).json({message:"student not found!"})
                    }
                res.status(200).json(updatedStudent)}catch (error) {
                        res.status(500).json({
                            message:"Internal Server Error"
                        }) 
                    }
                    
                } ,
        
            
                deletebyId: async (req, res) => {
                try{
                    const deletebyId = await studentModel.findByIdAndDelete(req.params.id)
                    res.status(201).json({
                       message:"deleted students according to id",
                       student:deletebyId 
                    })
                }
                catch(error){
                    console.log(error.message)
                    res.status(500).json({
                        message:"internal server error!"
                    })
                }
            }
}
export default studentController;