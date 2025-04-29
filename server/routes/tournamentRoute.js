import express from 'express';
import { getAllTournaments, getTournamentById, registerTournament } from '../controllers/tournamentController.js';
import isLoggedIn from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const tournamentRouter=express.Router();
tournamentRouter.post("/create",isLoggedIn,upload.single('image'),registerTournament);
tournamentRouter.get("/",isLoggedIn,getAllTournaments);
tournamentRouter.get("/:id",isLoggedIn,getTournamentById);
export default tournamentRouter;