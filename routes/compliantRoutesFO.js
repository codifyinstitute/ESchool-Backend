const express = require('express');
const router = express.Router();
const {
    addComplaint,
    getAllComplaints,
    getComplaintByComplaintNo,
    updateComplaint,
    deleteComplaint
} = require('../controller/compliantControllerFO'); 


// te tigh mala v4t hote ki test parva chalel ka coz tyanch om ani asif sobat hoat tar te ghai karat hote ki lec ghya lect ghya  
//mhanun tyana practice karayla jamal nay mhanun tyani batch chnage keli 
//mag te bolat ahett ki ek divas milala tar revise karu as
// Route to add a new complaint
router.post('/add', addComplaint);

// Route to get all complaints
router.get('/all', getAllComplaints);

// Route to get a complaint by ComplaintNo
router.get('/get/:complaintNo', getComplaintByComplaintNo);

// Route to update a complaint by ComplaintNo
router.put('/update/:complaintNo', updateComplaint);

// Route to delete a complaint by ComplaintNo
router.delete('/delete/:complaintNo', deleteComplaint);

module.exports = router;
