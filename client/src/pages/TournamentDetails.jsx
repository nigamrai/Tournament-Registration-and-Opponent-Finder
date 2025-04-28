import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout";



const TournamentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tournament = location.state?.tournament; 
    console.log(tournament)

    const navigateToRegistration = () => {
        navigate("/registration", { state: { tournament: tournament } });
    }  
    return (
      <HomeLayout>
          <div>   
          <p className="text-center m-10 text-[30px] font-bold">Tournament Details</p> 
            <img src={tournament?.image?.public_url} alt={tournament.title} className="w-full h-[300px] " />
                     
            <div className="flex space-x-8 p-4">
                <div className="flex-1 p-4 border">
                    <div className="flex  items-center mb-4">
                        <p>About the Tournament: </p>
                        <p>{tournament.description}</p>
                    </div>
                    
                    <div>
                        <p>Price Details</p>
                        <p>{tournament.price}</p>
                    </div>
                    <div>
                        <p>Rules</p>
                        <p>{tournament.rules}</p>
                    </div>
                </div>  
                <div className="flex-1 p-4 border">
                <div>
                        <p>Date:-</p>
                        <p>{tournament.startDate}</p>
                    </div>
                    <div>
                        <p>Format:-</p>
                        <p>{tournament.tournamentFormat}</p>
                    </div>
                    <div>
                        <p>Location:-</p>
                        <p>{tournament.location}</p>
                    </div>
                    <div>
                        <p>GroundStyle:-</p>
                        <p>{tournament.groundStyle}</p>
                    </div>
                    <div>
                        <p>Registration fee:-</p>
                        <p>{tournament.registrationAmount}</p>
                    </div>
                    <div>
                        <p>Max Teams:-</p>
                        <p>{tournament.maxTeams}</p>
                    </div>
                    <button className="bg-indigo-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700" onClick={navigateToRegistration}>Register</button>

                </div>              
            </div>
            
        </div>
      </HomeLayout>
        
    )
}

export default TournamentDetails