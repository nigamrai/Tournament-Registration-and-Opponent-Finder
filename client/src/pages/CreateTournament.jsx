import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTournament } from '../Redux/Slices/AuthSlice';
import HomeLayout from '../layouts/homeLayout';

function CreateTournament() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [tournamentData, setTournamentData] = useState({
        title: '',
        description: '',
        image: null,
        organizer: '',
        location: '',
        startDate: '',
        endDate: '',
        format: 'league',
        groundStyle: '5A',
        tournamentStyle: 'open',
        maxTeams: '',
        registrationFee: '',
        prizeDetails: '',
        rules: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTournamentData({
            ...tournamentData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setTournamentData({
            ...tournamentData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(tournamentData).forEach(key => {
            if (tournamentData[key] !== null && tournamentData[key] !== undefined) {
                formData.append(key, tournamentData[key]);
            }
        });

        try {
            const response = await dispatch(createTournament(formData));
            if (response?.payload?.success) {
                toast.success("Tournament created successfully!");
                navigate("/AdminDashboard");
            }
        } catch (error) {
            toast.error(error?.message || "Failed to create tournament");
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <HomeLayout>
            <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Create Tournament</h1>
                <p className="text-gray-600">Fill in the details to create a new tournament</p>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Basic Information Section */}
                <div className="bg-gray-200 p-6 mb-6 rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

                    <div className="mb-4">
                        <label className="block mb-2">Tournament title:-</label>
                        <input
                            type="text"
                            name="title"
                            value={tournamentData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Description:-</label>
                        <textarea
                            name="description"
                            value={tournamentData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="5"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Tournament Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Organized by:-</label>
                        <input
                            type="text"
                            name="organizer"
                            value={tournamentData.organizer}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                </div>

                {/* Location & Schedule Section */}
                <div className="bg-gray-200 p-6 mb-6 rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Location & Schedule</h2>

                    <div className="mb-4">
                        <label className="block mb-2">Location:-</label>
                        <input
                            type="text"
                            name="location"
                            value={tournamentData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Start date:-</label>
                            <input
                                type="date"
                                name="startDate"
                                value={tournamentData.startDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">End date:-</label>
                            <input
                                type="date"
                                name="endDate"
                                value={tournamentData.endDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Tournament Details Section */}
                <div className="bg-gray-200 p-6 mb-6 rounded-md border border-blue-500">
                    <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>

                    <div className="mb-4">
                        <label className="block mb-2">Tournament Format:-</label>
                        <select
                            name="format"
                            value={tournamentData.format}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="league">League</option>
                            <option value="knockout">Knockout</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Ground style:-</label>
                        <select
                            name="groundStyle"
                            value={tournamentData.groundStyle}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="5A">5A</option>
                            <option value="6A">6A</option>
                            <option value="7A">7A</option>
                            <option value="9A">9A</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Tournament Style:-</label>
                        <select
                            name="tournamentStyle"
                            value={tournamentData.tournamentStyle}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="open">Open</option>
                            <option value="specific">Specific</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Maximum Number of Teams:-</label>
                        <input
                            type="number"
                            name="maxTeams"
                            value={tournamentData.maxTeams}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            min="2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Registration Fee (Rs.):-</label>
                        <input
                            type="number"
                            name="registrationFee"
                            value={tournamentData.registrationFee}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            min="0"
                        />
                    </div>
                </div>

                {/* Prizes & Rules Section */}
                <div className="bg-gray-200 p-6 mb-6 rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Prizes & Rules</h2>

                    <div className="mb-4">
                        <label className="block mb-2">Prize Details:-</label>
                        <textarea
                            name="prizeDetails"
                            value={tournamentData.prizeDetails}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Tournament Rules:-</label>
                        <textarea
                            name="rules"
                            value={tournamentData.rules}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="5"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 px-12 rounded-md text-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
        </HomeLayout>
    );
}

export default CreateTournament;
