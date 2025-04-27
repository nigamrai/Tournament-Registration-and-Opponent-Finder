import cloudinary from 'cloudinary';
import Tournament from "../models/tournament.model";
const registerTournament = async (req, res) => {
    const { title,  location, description,sport,startDate,endDate,maxTeams,numberOfPlayers,groundStyle,registrationAmount,priceDetails,
        rules,organizedBy,tournamentFormat,days,type } = req.body;
    if (!description|| !title || !sport || !startDate || !endDate || !location || !maxTeams || !numberOfPlayers || !groundStyle || !registrationAmount || !priceDetails || !rules || !organizedBy || !tournamentFormat || !days || !type) {

        return res.status(400).json({ message: "All fields are required" });
    }
    const tournament = new Tournament({ title, sport, startDate, endDate, location, maxTeams, numberOfPlayers, groundStyle, registrationAmount, priceDetails,
        rules, organizedBy, tournamentFormat, days, type });
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
        const tournaments = await Tournament.find({status:"upcoming"}).sort({ startDate: 1 });
        if (!tournaments || tournaments.length === 0) {
            return res.status(404).json({ message: "No tournaments found" });
        }
        return res.status(200).json({ success: true, tournaments });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tournaments", error });
    }
}
export { registerTournament };

