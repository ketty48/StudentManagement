import express from 'express'
import studentController from '../controllers/studentManagement.js'
const router = express.Router();
router.post('/student/create',studentController.createNewStudent)
router.get('/student/list',studentController.getAllStudent)
router.get('/student/:id',studentController.getById)
router.put('/student/update/:id',studentController.updateStudent)
router.get("/student/:email", studentController.getByEmail);
router.delete('/student/delete/:id',studentController.deletebyId)
export default router;