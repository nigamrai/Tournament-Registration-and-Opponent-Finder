import React from "react";
import logo from "../assets/img/logo.png";
import HomeLayout from "../layouts/homeLayout";
import {useNavigate} from "react-router-dom";
import TournamentDetails from "./TournamentDetails";



const tournaments = [
    {
        id:1,
        title:"Tournament 1",
        date:"2023-01-01",
        location:"Location 1",
        format:"Format 1",
        teams:"Teams 1",
        description:"Description 1",
        price:"Price 1",
        numberOfPlayers: "Number of Players: 7"
    }
];

const Tournament = () => {

    const navigate = useNavigate();

    const navigateToTournamentDetails = () => {
        navigate("/TournamentDetails");
    }   
    return (
        <HomeLayout>
            <div className="flex flex-col justify-center gap-8 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Upcoming Tournaments</h1>
            {tournaments.map((event)=>{
                return(
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden w-80">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover"/>
                      <div className="p-4">
                        <h2 className="text-lg font-bold mb-2">{event.title}</h2>
                        <div className="text-sm text-gray mb-2">
                            {event.date}                       
                        </div>
                        <div className="text-sm text-gray mb-2">
                            {event.location}                       
                        </div>
                        <div className="text-sm text-gray mb-2">
                            {event.format}                       
                        </div>
                        <div className="text-sm text-gray mb-2">
                            {event.numberOfPlayers}                       
                        </div>
                        <p className="text-gray-700 text-sm mb-4">
                            {event.description}
                        </p>
                        <div className="flex justify-between items-center border-t pt-2">
                            <span className="font-bold text-bold-600">{event.price}</span>
                            <button className="bg-indigo-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700"
                            onClick={navigateToTournamentDetails}>View Details</button>
                        </div>
                      </div>
                    </div>
                )
            })}         
        </div>
        </HomeLayout>
    );
}
export default Tournament;
