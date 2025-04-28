import React, { useState, useEffect } from 'react';
import { Search, Trash2, Edit2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamList } from '../Redux/Slices/AuthSlice';


function TeamList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teamList, loading, error } = useSelector((state) => state.auth);

    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        dispatch(getTeamList());
    }, [dispatch]);

    const filteredTeams = teamList.filter((team) =>
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.teamCaptain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.teamManager.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        // Handle deletion logic here
        console.log('Delete team with id:', id);
    };

    const handleView = (team) => {
        navigate("/viewTeam", { state: { team } });
    };

    const handleEdit = (team) => {
        alert(`Edit team: ${team.teamName}`);
    };

    if (loading) {
        return <div>Loading teams...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Team Management</h1>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 border"
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Team Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Team Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Team Captain</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Team Manager</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Manager Contact</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Register Date</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTeams.map((team) => (
                            <tr key={team.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.teamName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.teamCaptain}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.teamManager}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.managerContact}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.registerDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-3">
                                    <button
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
                                        onClick={() => handleView(team)}
                                        title="View team"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button
                                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors"
                                        onClick={() => handleEdit(team)}
                                        title="Edit team"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
                                        onClick={() => handleDelete(team.id)}
                                        title="Delete team"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeamList;
