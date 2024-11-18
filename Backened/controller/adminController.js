const adminmodel=require("../models/loginModel");
const bcrypt=require("bcryptjs");
const employeemodel=require("../models/employeModel");

const registerController=async(req,res)=>{
    try{
        const {username,password,name}=req.body;
        let hashPassword=await bcrypt.hash(password,10);

        const admin=await adminmodel.create(
        {
            username,
            password:hashPassword,
            name
        }
        );
       
        return res.status(200).json({
            message:"New Admin saved successful",
            success:true,
            admin
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"err in login",
            success:false
        })
    }

}

const loginController=async(req,res)=>{
    try{
    const {username,password}=req.body;
    const exist=await adminmodel.findOne({username:username});
    if(exist){
        let comp=await bcrypt.compare(password,exist.password);
        let name=exist.name;
        if(comp && username==exist.username)
        {
            return res.status(200).json({
                username,
                name,
                message:"login successful",
                success:true,
            })
        }
        else{
            return res.status(400).json({
                message:"credentials doesnot match",
                success:false
            })
        }
    }
    else{
        return res.status(500).json({
            message:"login failed",
            success:false
        })
    }
}catch(err){
    console.log(err);
    return res.status(500).json({
        message:"error in login",
        success:false
    })
}
}

const employeeController=async(req,res)=>{
    try{
        const {name,email,mobileno,designation,gender,course}=req.body;
        if(!name||!email||!mobileno||!designation||!gender||!course)
        {
            return res.status(400).json({
                message:"please provide all details",
                success:true,
            })
        }
        const empmodel=await employeemodel.create({
            name,
            email,
            mobileno,
            designation,
            gender,
            course,
            // img
        })
        return res.status(200).json({
            message:"employee list added successful",
            success:true
        })
}catch(err){
    return res.status(500).json({
        message:"err in employee creation",
        success:false
    })
}

}
const getEmployeeData=async(req,res)=>{
    try{
        const fetchData=await employeemodel.find({});
        if(fetchData){
            return res.status(200).json({
                message:"Data fetched successfully",
                success:true,
                fetchData
            })
        }
        else{
            return res.status(400).json({
                messae:"Data not found",
                success:false
            })
        }
    }catch(err){
        return res.status(500).json({
            message:"err in get data",
            success:false
        })
    }
}
const updateData=async(req,res)=>{
    try{
        const {id}=req.params;
        let e_data=await employeemodel.findById(id);
        if(!e_data){
            return res.status(400).json({
                messsage:"data not found",
                success:false
            })
        }
        e_data=await employeemodel.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:true,
        })
        return res.status(200).json({
            message:'Employee Data updated',
            success:true
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"error in updating",
            success:false
        })
    }
}
const deleteData=async(req,res)=>{
    try{
        const {id}=req.params;
        const e_data=await employeemodel.findById(id);
        if(e_data){
            await e_data.deleteOne();
            return res.status(200).json({
                message:"employee deleted succesfully",
                success:true
            })
        }
        else{
            return res.status(400).json({
                message:'employee data not found',
                success:false
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"err in deleting",
            success:false
        })
    }
}
module.exports={registerController,
    loginController,
    employeeController,
    getEmployeeData,
    updateData,
    deleteData
};