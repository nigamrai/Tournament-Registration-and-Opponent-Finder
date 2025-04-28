import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Helpers/axiousInstance";
import HomeLayout from "../layouts/homeLayout";


const Tournament = () => {
    const [tournamentData,setTournamentData]=useState([]);
    const navigate = useNavigate();

    const navigateToTournamentDetails = (tournament) => {
        navigate("/tournamentDetails", { state: { tournament} });
    }  
    const getAllTournaments=async()=>{
        const response=await axiosInstance.get("/api/tournament");
        console.log(response)
        if(response?.data?.success==true){
            setTournamentData(response.data.tournaments);
        }
    }
    const navigateToTeamList = (tournament) => {
        navigate("/teamList", { state: { tournament } });
    }
    useEffect(()=>{
       getAllTournaments();
    },[]) 
    return (
        <HomeLayout>
            <div className="flex flex-col justify-center gap-8 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Upcoming Tournaments</h1>
            {tournamentData.map((tournament)=>{
                return(
                    <div key={tournament._id} className="bg-white rounded-lg shadow-md overflow-hidden w-80">
                    <img src={tournament?.image?.public_url} alt={tournament.title} className="w-full h-48"/>
                      <div className="p-4">
                        <h2 className="text-lg font-bold mb-2">{tournament.title}</h2>
                        <div className="text-sm text-gray mb-2">
                           Date: {tournament.startDate}                       
                        </div>
                        <div className="text-sm text-gray mb-2">
                            Location: {tournament.location}                       
                        </div>
                        <div className="text-sm text-gray mb-2">
                            Format: {tournament.tournamentFormat}                       
                        </div>
                        <div className="text-sm text-gray mb-2">
                            Max Teams: {tournament.maxTeams}                       
                        </div>
                        <div className="text-sm text-gray mb-2">
                            No.of Registered Teams: {tournament.numberOfRegisteredTeams}                
                        </div>
                        
                        <div className="flex justify-between items-center border-t pt-2">
                            <span className="font-bold text-bold-600">Rs. {tournament.registrationAmount}</span>
                            <button className="bg-indigo-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700"
                            onClick={()=>navigateToTournamentDetails(tournament)}>View Details</button>
                            <button className="bg-indigo-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700"
                            onClick={()=>navigateToTeamList(tournament)}>View Teams</button>
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
