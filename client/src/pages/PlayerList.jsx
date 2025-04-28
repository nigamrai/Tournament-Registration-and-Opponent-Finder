import PlayerCard from "../components/PlayerCard";
import React from "react";


const samplePlayers = [
    {
        id: 1,
        name: "Michael Jordan",
        age: 28,
        phone: "(555) 234-5678",
        address: "233 Bulls Avenue, Chicago, IL 60612",
        position: "Shooting Guard",
        imageUrl: "https://via.placeholder.com/200"
    },
    {
        id: 2,
        name: "LeBron James",
        age: 32,
        phone: "(555) 987-6543",
        address: "123 Lakers Blvd, Los Angeles, CA 90001",
        position: "Small Forward",
        imageUrl: "https://via.placeholder.com/200"
    },
    {
        id: 3,
        name: "Steph Curry",
        age: 30,
        phone: "(555) 321-7890",
        address: "30 Warriors Way, San Francisco, CA 94158",
        position: "Point Guard",
        imageUrl: "https://via.placeholder.com/200"
    }
];

function PlayerList() {
    return (
        <div className="flex flex-wrap gap-6 justify-center p-4">
            {samplePlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
            ))}
        </div>
    );
};

export default PlayerList;