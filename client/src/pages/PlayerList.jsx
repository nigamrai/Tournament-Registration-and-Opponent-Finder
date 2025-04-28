import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "../component/PlayerCard";
import { getPlayerList } from "../Redux/Slices/AuthSlice";

function PlayerList() {
    const dispatch = useDispatch();
    const teamData = useSelector((state) => state.auth.data);

    useEffect(() => {

        dispatch(getPlayerList());
    }, [dispatch]);


    if (!teamData.players) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-800 mb-2">{teamData.name}</h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="flex justify-center mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
                    <div className="bg-blue-50 rounded-lg p-6 shadow-md ml-12">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-4 ml-8">Coaching Staff</h2>
                        <PlayerCard player={teamData.coach} />
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 shadow-md ml-12">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-4 ml-8">Management</h2>
                        <PlayerCard player={teamData.manager} />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Players Roster</h2>
                <div className="flex flex-wrap gap-6 justify-center">
                    {teamData.players.map((player) => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlayerList;
