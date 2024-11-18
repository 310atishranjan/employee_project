const express=require("express");
const {loginController, registerController, employeeController, updateData, deleteData, getEmployeeData } = require("../controller/adminController");
const router=express.Router();

router.post('/register',registerController);
router.post('/login',loginController);

router.post('/employee-add',employeeController);
router.get('/get-details',getEmployeeData);
router.put('/update-details/:id',updateData);
router.delete('/delete-route/:id',deleteData);

module.exports=router;