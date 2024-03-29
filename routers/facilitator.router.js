import express   from 'express';
import controller from '../controllers/facilitator.controller.js';
const app = express();
app.post('/facilitator/create', controller.addedfacilitator);
app.get('/facilitator/facilitatorList',controller.getFacilitators);
app.get('/facilitator/facilitatorListById/:id',controller.getFacilitatorById);
app.put('/facilitator/facilitatorUpdate/:id',controller.updatedFacilitator);
app.delete('/facilitator/facilitatorDelete/:id',controller.deletedFacilitator);
app.get('/facilitator/facilitatorlist/:email',controller.getByEmail);
 export default app;
