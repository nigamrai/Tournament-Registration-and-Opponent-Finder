import mongoose from "mongoose";
const participantSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    teamMembers: [
        {
            name: {
                type: String,
                
            },
            email: {
                type: String,
                
            },
            phone: {
                type: String,
                
            },
            role:{
                type: String,
                enum: ["Captain", "Player","Manager","Coach"],
                default: "Player",
            },
            image: {
                public_id: {
                    type: String,
                },
                secure_url: {
                    type: String,
                },
            },
        },
    ]
    
});
const Participant = mongoose.model("Participant", participantSchema);
export default Participant;