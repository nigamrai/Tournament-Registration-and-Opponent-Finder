import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationCard from "../component/RegistrationCars";

const tournament = [
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

const TournamentDetails = () => {
    const navigate = useNavigate();

    const navigateToRegistration = () => {
        navigate("/Registration");
    }  
    return (
        <div>
            <img src={tournament.imageUrl} alt={tournament.title} className="w-full h-48 object-cover" />
            <h1>Tournament Details</h1>            
            <div className="flex space-x-8 p-4">
                <div className="flex-1 p-4 border">
                    <div>
                        <h1>About the Tournament</h1><br />
                        <p>{tournament.description}</p>
                    </div>
                    <div>
                        <h1>Organized by</h1><br />
                        <p>{tournament.adminName}</p>
                    </div>
                    <div>
                        <h1>Price Details</h1><br />
                        <p>{tournament.price}</p>
                    </div>
                    <div>
                        <h1>Rules</h1><br />
                        <p>{tournament.rules}</p>
                    </div>
                </div>  
                <div className="flex-1 p-4 border">
                <div>
                        <h1>Date:-</h1><br />
                        <p>{tournament.date}</p>
                    </div>
                    <div>
                        <h1>Format:-</h1><br />
                        <p>{tournament.format}</p>
                    </div>
                    <div>
                        <h1>Location:-</h1><br />
                        <p>{tournament.location}</p>
                    </div>
                    <div>
                        <h1>GroundStyle:-</h1><br />
                        <p>{tournament.rulesgroundStyle}</p>
                    </div>
                    <div>
                        <h1>Registration fee:-</h1><br />
                        <p>{tournament.registrationAmount}</p>
                    </div>
                    <div>
                        <h1>Numbers of Players:-</h1><br />
                        <p>{tournament.numberOfPlayers}</p>
                    </div>
                    <button className="bg-indigo-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700" onClick={navigateToRegistration}>Register</button>

                </div>              
            </div>
            
        </div>
        
    )
}

export default TournamentDetails