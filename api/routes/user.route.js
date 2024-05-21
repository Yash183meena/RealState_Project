import express  from "express";
import {getUserListings, test,updateUser,getUser } from '../controller/user.controller.js'
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../controller/user.controller.js";

const app=express();
const router=express.Router();

router.get('/test',test)

//verify token is the middleware function to check the user authenticated or not only update user if that is ligin 
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listings/:id',verifyToken,getUserListings);
router.get('/:id',verifyToken,getUser);
export default router;