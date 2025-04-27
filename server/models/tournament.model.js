import mongoose from "mongoose";
const tournamentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    sport:{
        type: String,
        required: true,
        enum: ['Football', 'Football', 'Basketball', 'Badminton', 'Hockey'],
        default: 'Football',
    },
    image:{
        public_url:{
            type: String,
            default: "https://res.cloudinary.com/dqj0xgk8v/image/upload/v1698231234/blank-profile-picture-973460_640_ojxq5c.png",
        },
        secure_url:{
            type: String,
            default: "blank-profile-picture-973460_640",
        }
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    maxTeams:{
        type: Number,
        required: true,
    },
    numberOfPlayers:{
        type: Number,
        required: true,
    },
    groundStyle:{
        type: String,
        enum:['5A', '6A','7A', '9A'],
        default: '5A',
        required: true,
    },
    registrationAmount:{
        type: Number,
        required: true,
    },
    prizeDetails:{
        type: String,
        required: true,
    },
    rules:{
        type: String,
        required: true,
    },
    organizedBy:{
        type: String,
        required: true,
    },
    tournamentFormat:{
        type: String,
        enum:['League', 'Knockout'],
        default: 'Knockout',
        required: true,
    },
    days:{
        type: String,
        enum:["1", "2", "3", "4", "5","6", "7"],
        required: true,
    },
    type:{
        type: String,
        enum:["Open", "College", "School"],
        required: true,
    },
    status:{
        type: String,
        enum:["Upcoming", "Ongoing", "Completed"],
        default: "Upcoming",
    },

})
const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;