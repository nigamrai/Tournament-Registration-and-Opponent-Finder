import { ChevronDown, Edit, Eye, Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Helpers/axiousInstance';
import HomeLayout from '../layouts/homeLayout';
function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("startDate");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("data"));
    const [tournaments, setTournaments] = useState([]);
    const handleSort = (field) => {
        setSortField(field);
    };
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    const navigateToCreateTournament = () => {
        window.location.href = "/tournament/create";
    }
    const navigateToTournamentDetails = (tournament) => {
        navigate("/tournamentDetails", { state: { tournament } });
    }
  
    console.log(user._id)
    async function getMyTournament() {
        try {
            const response = await axiosInstance.get(`/api/tournament/${user._id}`);
            console.log("my tournament", response.data)
            if (response?.data?.success) {
                setTournaments(response.data.tournaments);
            }

        } catch (error) {
            console.error("Error fetching tournaments:", error);
        }

    }

    useEffect(() => {
        getMyTournament();


    }, []);
    console.log(tournaments)


    // Add the missing filteredTournaments function
    const filteredTournaments = tournaments.filter(tournament =>
        tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.format.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <HomeLayout>
            <div className="w-full bg-white p-8 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Tournament Management</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search tournaments..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm" onClick={navigateToCreateTournament}>
                            + Create Tournament
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-200">
                                {["Tournament", "Dates", "Format", "Location", "Ground", "Teams", "Fee (Rs.)", "Status", "Actions"].map((header, idx) => (
                                    <th
                                        key={idx}
                                        className="px-6 py-4 text-left font-bold uppercase tracking-wide cursor-pointer select-none text-sm text-gray-800 hover:text-blue-600 hover:bg-gray-200"
                                        onClick={() => handleSort(
                                            header === "Tournament" ? "title" :
                                                header === "Dates" ? "startDate" :
                                                    header === "Format" ? "format" :
                                                        header === "Location" ? "location" :
                                                            header === "Ground" ? "groundStyle" :
                                                                header === "Teams" ? "maxTeams" :
                                                                    header === "Fee (Rs.)" ? "registrationFee" :
                                                                        ""
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <span>{header}</span>
                                            {sortField === (
                                                header === "Tournament" ? "title" :
                                                    header === "Dates" ? "startDate" :
                                                        header === "Format" ? "format" :
                                                            header === "Location" ? "location" :
                                                                header === "Ground" ? "groundStyle" :
                                                                    header === "Teams" ? "maxTeams" :
                                                                        header === "Fee (Rs.)" ? "registrationFee" :
                                                                            ""
                                            ) &&
                                                <ChevronDown className="ml-1 h-5 w-5 text-blue-600" />
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredTournaments.length > 0 ? (
                                filteredTournaments.map((tournament) => (
                                    <tr key={tournament.id} className="hover:bg-gray-50 transition-all">
                                        <td className="px-6 py-4 font-semibold">{tournament.title}</td>
                                        <td className="px-6 py-4">{formatDate(tournament.startDate)}</td>
                                        <td className="px-6 py-4">{tournament.tournamentFormat}</td>
                                        <td className="px-6 py-4">{tournament.location}</td>
                                        <td className="px-6 py-4">{tournament.groundStyle}</td>
                                        <td className="px-6 py-4">{tournament.maxTeams}</td>
                                        <td className="px-6 py-4">{tournament.registrationAmount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${tournament.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                                                tournament.status === "Ongoing" ? "bg-green-100 text-green-800" :
                                                    "bg-gray-200 text-gray-700"
                                                }`}>
                                                {tournament.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-4">
                                            <button onClick={() => navigateToTournamentDetails(tournament)}><Eye className="text-blue-600 hover:text-blue-800 cursor-pointer" size={22} /></button>
                                            <Edit className="text-green-600 hover:text-green-800 cursor-pointer" size={22} />
                                            <Trash2 className="text-red-600 hover:text-red-800 cursor-pointer" size={22} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-10 text-center text-gray-500">
                                        No tournaments found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;