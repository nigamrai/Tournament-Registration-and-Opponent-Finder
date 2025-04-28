import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            // Clear user data from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            
            // Redirect to login page
            navigate('/');
        }, 1500);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-indigo-600 p-8 text-center">
                    <div className="inline-block p-4 rounded-full bg-indigo-500 mb-4">
                        <FaUserCircle className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Sign Out</h2>
                    <p className="text-indigo-100">Are you sure you want to leave?</p>
                </div>

                <div className="p-8">
                    <div className="text-center mb-6">
                        <p className="text-gray-600 mb-2">Currently signed in as</p>
                        <h3 className="text-xl font-semibold text-gray-800">{user.name || 'User'}</h3>
                        <p className="text-gray-500">{user.email || 'user@example.com'}</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <FaSignOutAlt className="w-5 h-5" />
                                    <span>Sign Out</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            disabled={isLoading}
                            className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;