import express from 'express';
import { getAllTournaments, registerTournament } from '../controllers/tournamentController.js';
import upload from '../middlewares/multer.middleware.js';
const tournamentRouter=express.Router();
tournamentRouter.post("/create",upload.single('image'),registerTournament);
tournamentRouter.get("/",getAllTournaments);
export default tournamentRouter;