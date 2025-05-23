import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { login } from '../Redux/Slices/AuthSlice';
import logo from '../assets/logo.png';
import BackgroundImage from '../assets/viber.webp';
import { Link } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;
        console.log('Login attempt:', { email, password });

        if (!email || !password) {
            toast.error("Please fill all the details");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            toast.error("Please enter a valid email address");
            return;
        }

        if(password.length < 6) {
            toast.error("Password must be at least 7 characters long");
            return;
        }
        try {
            const response = await dispatch(login(loginData));
            if (response.payload?.success) {
                toast.success("Login successful!");

                const userRole = response.payload.user.role;
                console.log("User Role:", userRole);

                if (userRole === "user") {
                    navigate("/tournament");

                }

            } else {
                toast.error(response.payload?.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            toast.error("Something went wrong. Try again later.");
            console.error("Login Error:", error);
        }

        setLoginData({
            email: "",
            password: "",
        });
    };

    return (
        <div
            className="h-screen w-full flex items-center justify-center bg-gray-900 bg-cover bg-center"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md h-[580px] flex flex-col justify-center">


                <div className="flex justify-center mb-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-20 w-20 object-contain rounded-full shadow-md bg-white p-2"
                    />
                </div>


                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Tournament Registration & Opponent Finder</h1>
                    <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={loginData.email}
                                onChange={handleUserInput}
                                placeholder="your@email.com"
                                className="w-full pl-5 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={loginData.password}
                                onChange={handleUserInput}
                                placeholder="••••••••"
                                className="w-full pl-5 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        SIGN IN
                    </button>
                    <div className="text-sm mt-2 ms-23">
                        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
