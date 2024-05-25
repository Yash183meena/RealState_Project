import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken=(req,res,next)=>{
      
      const token=req.cookies['access_token'];

      if(!token) return next(errorHandler(401,"Unauthorized!"));
//the user in (err,user) comes from the jet.verify it is onof the property of it in user the information of user is stored (payload i.e _id)
      jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) return next(errorHandler(403,'Forbidden'));

            req.user=user;
            next();
      });
}