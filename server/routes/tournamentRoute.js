import express from 'express';
import { getAllTournaments, getTournamentById, registerTournament } from '../controllers/tournamentController.js';
import upload from '../middlewares/multer.middleware.js';

const tournamentRouter=express.Router();
tournamentRouter.post("/create",upload.single('image'),registerTournament);
tournamentRouter.get("/",getAllTournaments);
tournamentRouter.get("/:id",getTournamentById);
export default tournamentRouter;