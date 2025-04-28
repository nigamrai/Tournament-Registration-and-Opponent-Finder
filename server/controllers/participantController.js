import cloudinary from "cloudinary"; // assuming you configured it
import Participant from "../models/participants.model.js";

const registerParticipant = async (req, res) => {
  try {
    const { teamName, userId, tournamentId } = req.body;
    const teamMembers = JSON.parse(req.body.teamMembers); // because it's sent as a JSON string

    if (!userId || !teamName || !tournamentId || !teamMembers) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedTeamMembers = await Promise.all(
      teamMembers.map(async (member, index) => {
        const updatedMember = { ...member };
        if (req.files && req.files[`memberImage_${index}`]) {
          const result = await cloudinary.v2.uploader.upload(
            req.files[`memberImage_${index}`][0].path,
            {
              folder: "TRAOF",
              width: 150,
              height: 150,
              crop: "fill",
            }
          );
          updatedMember.image = {
            public_id: result.public_id,
            secure_url: result.secure_url,
          };

          // Delete temp file
        //   fs.unlinkSync(req.files[`memberImage_${index}`][0].path);
        }
        return updatedMember;
      })
    );

    const participant = new Participant({
      tournamentId,
      userId,
      teamName,
      teamMembers: updatedTeamMembers,
    });

    await participant.save();
    return res.status(201).json({
      success: true,
      message: "Participant registered successfully",
      participant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export { registerParticipant };

