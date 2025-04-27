import mongoose from "mongoose";
const participantSchema = new mongoose.Schema({
    Tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true,
    },
    user: {
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
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            role:{
                type: String,
                enum: ["Captain", "Player","Manager","Coach"],
                default: "Player",
            }
        },
    ]
    
});
const Participant = mongoose.model("Participant", participantSchema);
export default Participant;