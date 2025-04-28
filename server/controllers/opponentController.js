import Opponent from "../models/opponent.model.js";
const createOpponentRequest = async (req, res) =>   {   
    const {createdBy,teamName, timeFrom, timeTo, location, date, opponentType} = req.body;
    if (!createdBy || !teamName || !timeFrom || !timeTo || !location || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const opponent = new Opponent({ createdBy, teamName, timeFrom, timeTo, location, date, opponentType });
    if (!opponent) {
        return res.status(500).json({ message: "Opponent request creation failed" });
    }
    await opponent.save();
    return res.status(201).json({ success: true, message: "Opponent request created successfully", opponent });
}
const getAllOpponentRequests = async (req, res) => {
    try {
        const opponentRequests = await Opponent.find().populate("createdBy", "name email phoneNumber").populate("acceptedBy", "name email phoneNumber").sort({ createdAt: -1 });
        if (!opponentRequests || opponentRequests.length === 0) {
            return res.status(404).json({ message: "No opponent requests found" });
        }
        return res.status(200).json({ success: true, requests: opponentRequests });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching opponent requests", error });
    }
}
const acceptOpponentRequest = async (req, res) => {
    const { id,acceptId } = req.params;
    console.log(id);
    try {
        const opponentRequest = await Opponent.find({createdBy:id});
        if (!opponentRequest) {
            return res.status(404).json({ message: "Opponent request not found" });
        }
    }catch (error) {
        return res.status(500).json({ message: "Error accepting opponent request", error });
    }
    const updatedRequest = await Opponent.findOneAndUpdate({createdBy:id}, { status: "Accepted",acceptedBy:acceptId }, { new: true });
    if (!updatedRequest) {
        return res.status(500).json({ message: "Error updating opponent request" });
    }
    return res.status(200).json({ success: true, message: "Opponent request accepted", request: updatedRequest });
}
export { acceptOpponentRequest, createOpponentRequest, getAllOpponentRequests };

