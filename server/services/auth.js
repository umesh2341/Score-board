import { dbService } from "../thridpartyServices"

export const authMiddleWare=async(req,res,next)=>{
    const token=req.headers.authorisation;
     if(!token){
        return res.status(401).json({error:"user is not registered"});
     }
     const {data,error}=dbService.auth.getUser(token);
     console.log(data);
     req.user=data.user;
}
