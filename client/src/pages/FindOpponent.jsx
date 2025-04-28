import React from "react";
import Navbar from "../component/Navbar";

const FindOpponent = () => {
    const [FormData, setFormData] = React.useState({
        teamName: "",
        date: "",
        time: "",
        timeTo: "",
        location: "",
        opponentType: "",
        groundStyle: "",
        registrationAmount: "",
        numberOfPlayers: "",
        rules: "",
        description: "",
        adminName: "",
        imageUrl: "",
    });
    const [requests, setRequests] = React.useState(() => {
        const savedRequests = localStorage.getItem('findOpponentRequests');
        return savedRequests ? JSON.parse(savedRequests) : [];
    });

    React.useEffect(() => {
        localStorage.setItem('findOpponentRequests', JSON.stringify(requests));
    }, [requests]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = {
            ...FormData,
            id: Date.now(),
            status: 'pending',
            createdAt: new Date().toLocaleString()
        };
        setRequests(prevRequests => [...prevRequests, newRequest]);
        setFormData({
            teamName: "",
            date: "",
            time: "",
            timeTo: "",
            location: "",
            opponentType: "",
            groundStyle: "",
            registrationAmount: "",
            numberOfPlayers: "",
            rules: "",
            description: "",
            adminName: "",
            imageUrl: "",
        });
    };

    const handleDeleteRequest = (id) => {
        const updatedRequests = requests.filter(request => request.id !== id);
        setRequests(updatedRequests);
    };

    const handleAcceptRequest = (id) => {
        const updatedRequests = requests.map(request => {
            if (request.id === id) {
                return {
                    ...request,
                    status: 'accepted',
                    acceptedAt: new Date().toLocaleString()
                };
            }
            return request;
        });
        setRequests(updatedRequests);
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'accepted':
                return 'bg-green-100 text-green-800 border border-green-200';
            case 'pending':
            default:
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        }
    };

    return (    
        <div>
            <Navbar />
            <div className="flex flex-col justify-center gap-4 ml-12 p-8">
                <h6 className="text-3xl font-bold">Find Opponent</h6>
                <p>Create a request to find oppenentsor accept challenges from other teams</p>
                <div className="flex gap-6 items-start">
                    <div className="flex-2 shadow-lg shadow-indigo-600 p-4 rounded-lg">
                        <h1 className="text-2xl font-bold">Your Requests</h1>
                        <div className="flex flex-col gap-4 mt-4">
                            {requests.length === 0 ? (
                                <p className="text-gray-500">No requests created yet</p>
                            ) : (
                                requests.map(request => (
                                    <div key={request.id} className={`bg-white p-6 rounded-lg shadow-sm border ${
                                        request.status === 'accepted' ? 'border-green-200' : 'border-gray-200'
                                    }`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-xl font-bold text-gray-800">{request.teamName}</h2>
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(request.status)}`}>
                                                {request.status === 'accepted' ? 'Accepted' : 'Pending'}
                                            </span>
                                        </div>
                                        <div className="space-y-2 text-gray-600">
                                            <p><strong>Date:</strong> {request.date}</p>
                                            <p><strong>Time:</strong> {request.time} - {request.timeTo}</p>
                                            <p><strong>Location:</strong> {request.location}</p>
                                            <p><strong>Looking for:</strong> {request.opponentType || 'Any Team'}</p>
                                            {request.status === 'accepted' && (
                                                <p className="text-green-600 mt-2">
                                                    <strong>✓ Accepted at:</strong> {request.acceptedAt}
                                                </p>
                                            )}
                                        </div>
                                        {request.status === 'pending' && (
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
                                                        onClick={() => handleAcceptRequest(request.id)}
                                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors"
                                                    >
                                                        Accept Challenge
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>                                    
                                ))
                            )}
                        </div>
                    </div>
                    <div className="flex-1 shadow-lg shadow-indigo-600 p-4 rounded-lg">
                        <h1 className="text-2xl font-bold">Find Opponents</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label htmlFor="teamName" className="block text-sm font-medium text-gray-700" required
                                >Your Team Name</label>
                                <input 
                                type="text"
                                id="teamName"
                                name="teamName" 
                                value={FormData.teamName}
                                onChange={handleChange}
                                required
                                className="mt-1 p-2 border rounded w-full" />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700" required
                                >Date</label>
                                <input 
                                type="date"
                                id="date"
                                name="date" 
                                value={FormData.date}
                                onChange={handleChange}
                                required
                                className="mt-1 p-2 border rounded w-full" />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <div className="flex-1"> 
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700" required
                                    >Time range</label>
                                    <input 
                                    type="time"
                                    id="time"
                                    name="time" 
                                    value={FormData.time}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 border rounded w-full" />
                                </div>
                                <div className="flex-1"> 
                                    <label htmlFor="timeTo" className="block text-sm font-medium text-gray-700" required
                                    >To</label>
                                    <input 
                                    type="time"
                                    id="timeTo"
                                    name="timeTo" 
                                    value={FormData.timeTo}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 border rounded w-full" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700" required
                                >Location</label>
                                <input 
                                type="text"
                                id="location"
                                name="location" 
                                value={FormData.location}
                                onChange={handleChange}
                                required
                                className="mt-1 p-2 border rounded w-full" />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="opponentType" className="block text-sm font-medium text-gray-700" required
                                >Opponent Type</label>
                                <select
                                id="opponentType"
                                name="opponentType" 
                                value={FormData.opponentType}
                                onChange={handleChange}
                                required
                                className="mt-1 p-2 border rounded w-full">
                                    <option value="">Any Team</option>
                                    <option value="Tournament Participant">Tournament Participant</option>
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

export default FindOpponent
