import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axiosInstance from "../Helpers/axiousInstance";

const FindOpponent = () => {
    const user = JSON.parse(localStorage.getItem("data"));
    const [FormData, setFormData] = React.useState({
        teamName: "",
        createdBy: user._id,
        date: "",
        timeFrom: "",
        timeTo: "",
        location: "",
        opponentType: "All",
    });
    const [requests, setRequests] = useState([]);
    const [filterType, setFilterType] = useState("all"); // new state for filtering

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/opponent/create', FormData);
            console.log("Request created successfully:", response.data);
            fetchRequests(); // refresh list after creating
        } catch (error) {
            console.error("Error creating request:", error);
        }
    };

    const handleDeleteRequest = (id) => {
        const updatedRequests = requests.filter(request => request.id !== id);
        setRequests(updatedRequests);
    };

    const handleAcceptRequest = async (id, acceptId) => {
        try {
            const response = await axiosInstance.get(`/api/opponent/accept/${id}/${acceptId}`);
            console.log("Request accepted successfully:", response.data);
            fetchRequests(); // refresh after accepting
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await axiosInstance.get(`/api/opponent/`);
            console.log("Opponent requests:", response.data.opponents);
            if (response?.data?.success) {
                
                setRequests(response.data.requests);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-100 text-green-800 border border-green-200';
            case 'pending':
            default:
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        }
    };

    const filteredRequests = requests.filter(request => {
        const isOwnRequest = request.createdBy?._id === user._id;
        if (filterType === "my") return isOwnRequest;
        if (filterType === "other") return !isOwnRequest;
        return true;
    });

    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center gap-4 ml-12 p-8">
                <h6 className="text-3xl font-bold">Find Opponent</h6>
                <p>Create a request to find opponents or accept challenges from other teams</p>
                <div className="flex gap-6 items-start">
                    <div className="flex-2 shadow-lg shadow-indigo-600 p-4 rounded-lg w-full">
                        <h1 className="text-2xl font-bold mb-4">Your Requests</h1>

                        {/* Filter Buttons */}
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setFilterType('my')}
                                className={`px-4 py-2 rounded-md ${filterType === 'my' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                            >
                                My Requests
                            </button>
                            <button
                                onClick={() => setFilterType('other')}
                                className={`px-4 py-2 rounded-md ${filterType === 'other' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                            >
                                Other Requests
                            </button>
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-4 py-2 rounded-md ${filterType === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                            >
                                All Requests
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 mt-4">
                            {filteredRequests.length === 0 ? (
                                <p className="text-gray-500">No requests to show.</p>
                            ) : (
                                filteredRequests.map(request => {
                                    const isOwnRequest = request.createdBy?._id === user._id;
                                    return (
                                        <div key={request.id} className={`bg-white p-6 rounded-lg shadow-sm border ${
                                            request.status === 'Accepted' ? 'border-green-200' : 'border-gray-200'
                                        }`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-xl font-bold text-gray-800">{request.teamName}</h2>
                                                    {isOwnRequest && (
                                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                                            Your Request
                                                        </span>
                                                    )}
                                                </div>
                                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(request.status)}`}>
                                                    {request.status === 'Accepted' ? 'Accepted' : 'Pending'}
                                                </span>
                                            </div>

                                            <div className="space-y-2 text-gray-600">
                                                <p><strong>Date:</strong> {request.date}</p>
                                                <p><strong>Time:</strong> {request.timeFrom} - {request.timeTo}</p>
                                                <p><strong>Location:</strong> {request.location}</p>
                                                {!isOwnRequest && (
                                                    <p><strong>Requested By:</strong> {request.createdBy?.name}, {request.createdBy?.phoneNumber}</p>
                                                )}
                                                <p><strong>Looking for:</strong> {request.opponentType || 'Any Team'}</p>
                                                {request.status === 'Accepted' && request.acceptedBy._id != user._id&& (
                                                    <p className="text-green-600 mt-2">
                                                        <strong>✓ Accepted By:</strong> {request.acceptedBy?.name}, {request.acceptedBy?.phoneNumber}
                                                    </p>
                                                )}
                                            </div>

                                            {!isOwnRequest && request.status === 'Pending' && (
                                                <>
                                                    <div className="border-t border-gray-200 my-4"></div>
                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            onClick={() => handleDeleteRequest(request.id)}
                                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                                        >
                                                            Decline
                                                        </button>
                                                        <button
                                                            onClick={() => handleAcceptRequest(request.createdBy._id, user._id)}
                                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors"
                                                        >
                                                            Accept Challenge
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>

                    {/* Create Request Form */}
                    <div className="flex-1 shadow-lg shadow-indigo-600 p-4 rounded-lg">
                        <h1 className="text-2xl font-bold">Find Opponents</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
                                    Your Team Name
                                </label>
                                <input 
                                    type="text"
                                    id="teamName"
                                    name="teamName" 
                                    value={FormData.teamName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 border rounded w-full" 
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input 
                                    type="date"
                                    id="date"
                                    name="date" 
                                    value={FormData.date}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 border rounded w-full" 
                                />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <div className="flex-1">
                                    <label htmlFor="timeFrom" className="block text-sm font-medium text-gray-700">
                                        Time From
                                    </label>
                                    <input 
                                        type="time"
                                        id="timeFrom"
                                        name="timeFrom" 
                                        value={FormData.timeFrom}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 p-2 border rounded w-full" 
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="timeTo" className="block text-sm font-medium text-gray-700">
                                        Time To
                                    </label>
                                    <input 
                                        type="time"
                                        id="timeTo"
                                        name="timeTo" 
                                        value={FormData.timeTo}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 p-2 border rounded w-full" 
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                    Location
                                </label>
                                <input 
                                    type="text"
                                    id="location"
                                    name="location" 
                                    value={FormData.location}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 border rounded w-full" 
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="opponentType" className="block text-sm font-medium text-gray-700">
                                    Opponent Type
                                </label>
                                <select
                                    id="opponentType"
                                    name="opponentType" 
                                    value={FormData.opponentType}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 border rounded w-full"
                                >
                                    <option value="All">All</option>
                                    <option value="Tournament">Tournament</option>
                                </select>
                            </div>
                            <button type="submit" className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
                                Create Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindOpponent;
