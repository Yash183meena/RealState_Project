import express from 'express'
import { createListing } from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteListing } from '../controller/listing.controller.js';
import { updateListing } from '../controller/listing.controller.js';
import { getListing } from '../controller/listing.controller.js';
const router=express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',verifyToken,getListing);

export default router;
