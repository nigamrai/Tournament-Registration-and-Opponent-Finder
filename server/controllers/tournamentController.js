import cloudinary from 'cloudinary';
import Tournament from "../models/tournament.model.js";
const registerTournament = async (req, res) => {
    console.log(req.body)
    const { title,  location, description,startDate,endDate,maxTeams,groundStyle,registrationFee,prizeDetails,
        rules,format,createdBy } = req.body;
    if (!description|| !title  || !startDate || !endDate || !location || !maxTeams  || !groundStyle || !registrationFee || !prizeDetails || !rules || !format ) {

        return res.status(400).json({ message: "All fields are required" });
    }
    const tournament = new Tournament({ title, startDate, endDate, location, maxTeams, groundStyle, registrationAmount:registrationFee, priceDetails:prizeDetails,
        rules,  tournamentFormat:format ,description,createdBy });
        if (!tournament) {
            return res.status(500).json({ message: "Tournament registration failed" });
        }
    await tournament.save();
    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "TRAOF",
                width: 150,
                height: 150,
                crop: "fill",
            });
            tournament.image.public_url = result.secure_url;
            tournament.image.id = result.public_id;
        } catch (error) {
            return res.status(500).json({ message: "Image upload failed", error });
        }
    }
    await tournament.save();
   
    return res.status(201).json({ success: true, message: "Tournament registered successfully", tournament });
}
const getAllTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        if (!tournaments || tournaments.length === 0) {
            return res.status(404).json({ message: "No tournaments found" });
        }
        return res.status(200).json({ success: true, tournaments });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tournaments", error });
    }
}
const getTournamentById = async (req, res) => {
    const { id } = req.params;
    try {
        const tournaments = await Tournament.find({createdBy: id});
      
        if (!tournaments) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        return res.status(200).json({ success: true, tournaments });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tournament", error });
    }
}









export { getAllTournaments, getTournamentById, registerTournament };

