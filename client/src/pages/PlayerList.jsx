import React from "react";
import { useLocation } from "react-router-dom";
import PlayerCard from "../component/PlayerCard";
import HomeLayout from "../layouts/homeLayout";

function PlayerList() {
    const location = useLocation();
    const team = location.state?.team;

    if (!team) {
        return <div>Team data not found!</div>;
    }

    // Separate out players, coach, and manager
    const players = team.teamMembers.filter(member => member.role === "Player");
    const coach = team.teamMembers.find(member => member.role === "Coach");
    const manager = team.teamMembers.find(member => member.role === "Manager");
    const captain=team.teamMembers.find(member => member.role === "Captain");
    return (
      <HomeLayout>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-800 mb-2">{team.teamName}</h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            {/* Coaching Staff and Management */}
            <div className="flex justify-center mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3  w-full  px-4">
                    {coach && (
                        <div className="bg-blue-50 rounded-lg p-6 shadow-md ml-12">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4 ml-8">Coach</h2>
                            <PlayerCard player={coach} />
                        </div>
                    )}
                    {manager && (
                        <div className="bg-blue-50 rounded-lg p-6 shadow-md ml-12">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4 ml-8">Manager</h2>
                            <PlayerCard player={manager} />
                        </div>
                    )}
                    {captain && (
                        <div className="bg-blue-50 rounded-lg p-6 shadow-md ml-12">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4 ml-8">Captain</h2>
                            <PlayerCard player={captain} />
                        </div>
                    )}
                </div>
            </div>

            {/* Players Roster */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Players Roster</h2>
                <div className="grid grid-cols-5 gap-6 justify-center">
                    {players.map((player) => (
                        <PlayerCard key={player._id} player={player} />
                    ))}
                </div>
            </div>
        </div>
      </HomeLayout>
    );
}

export default PlayerList;
