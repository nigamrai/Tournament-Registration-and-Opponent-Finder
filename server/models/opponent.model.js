import mongoose from 'mongoose';
const opponentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    acceptedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    teamName:{
        type: String,
        required: true,
    },
    timeFrom:{
        type: String,
        required: true,
    },
    timeTo:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    opponentType:{
        type: String,
        enum: ["Tournament", "All"],
        default: "All",
    },
    status:{
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },

},{timestamps: true});
const Opponent = mongoose.model("Opponent", opponentSchema);
export default Opponent;