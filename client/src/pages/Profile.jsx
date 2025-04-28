import React, { useEffect, useState, useRef} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaEnvelope, FaUser, FaEdit, FaCamera } from 'react-icons/fa';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        name: 'askjdjsd',
        email: 'john@example.com',
        image: '',
        teams: ['Thunder FC', 'Lightning United'],
        tournaments: ['Summer Cup 2025', 'Winter League 2024'],
        matches: 15,
        wins: 10
    });
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/users/${id}`
                );
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
    }, [id]);
    const handleFileChange = async () =>{
        const file = event.target.files[0];
        if (file) {
            console.log('Selected File:', file);

            const imageUrl = URL.createObjectURL(file);
            setUser(prev=> ({
                ...prev,
                image: imageUrl
            }));

        }
    }


    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                    <div className="relative group">
                        <img
                            src={user.image}
                            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                        />
                        {/* <button className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition-colors"
                        onClick={() => fileInputRef.current.click()}>
                            <FaCamera size={16} />
                        </button> */}
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                            <button 
                                onClick={() => setIsEditing(!isEditing)}
                                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                                {/* <FaEdit size={20} /> */}
                            </button>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
                            <FaEnvelope />
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
