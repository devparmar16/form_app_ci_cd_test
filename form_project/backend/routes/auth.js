const express = require("express");
const user = require("../database/dbmongo");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup",async(req,res)=>
{
   try
   {
       const{username,email,password} = req.body;
       const userEx = await user.findOne({email});
    
       if(userEx)
       {
         return res.status(400).json({ message: "User already exists" });
       }
    
       const hashpass = await bcrypt.hash(password,10);
    
       await user.create({ username, email, password: hashpass });

       return res.status(200).json({message:"User created successfully!"});

   }
   catch(e)
   {
    return res.status(404).json({ message: "Database Error" });
   }




}
)




router.post("/login",async(req,res)=>
    {
       try
       {
           const{email,password} = req.body;
           const userEx = await user.findOne({email});
        
           if(!userEx)
           {
             return res.status(404).json({ message: "User not found.Please Sign up!" });
           }
        
           const compPass = await bcrypt.compare(password,userEx.password);
           if(!compPass)
           {
            return res.status(404).json({ message: "Invalid Credentials!" });

           }
            // const token = jwt.sign({userId:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"});
        //    await user.create({"username":username,"email":email,"password":password});
    
           return res.status(200).json({message:"Login Successfull"});
    
       }
       catch(e)
       {
        return res.status(404).json({ message: "Database Error" });
       }
    
    
    
    
    }
    )

    module.exports = router;