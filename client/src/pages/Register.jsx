import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../assets/viber.webp';
import { register } from '../Redux/Slices/AuthSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        role: "user",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic required field validation
        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.address || !formData.password) {
            toast.error("Please fill all fields");
            return;
        }

        // Name validation (2-50 characters, letters and spaces only)
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        if (!nameRegex.test(formData.name.trim())) {
            toast.error("Name should be 2-50 characters long and contain only letters and spaces");
            return;
        }

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        // Password validation (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        // Phone number validation (10-15 digits, can start with +)
        const phoneNumberRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneNumberRegex.test(formData.phoneNumber.trim())) {
            toast.error("Please enter a valid phone number (10-15 digits, can start with +)");
            return;
        }

        // Address validation (minimum 5 characters, maximum 100)
        if (formData.address.trim().length < 5 || formData.address.trim().length > 100) {
            toast.error("Address should be between 5 and 100 characters");
            return;
        }

        // Profile image validation
        if (!profileImage) {
            toast.error("Please upload profile picture");
            return;
        }

        // Image size and type validation
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        
        if (!allowedTypes.includes(profileImage.type)) {
            toast.error("Please upload an image file (JPEG, PNG, or JPG)");
            return;
        }

        if (profileImage.size > maxSize) {
            toast.error("Image size should be less than 2MB");
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        data.append("image", profileImage);

        try {
            const response = await dispatch(register(data));
            if (response.payload?.success) {
                toast.success("Registered successfully!");
                navigate("/");
            }
        } catch (error) {
            toast.error("Registration failed");
        }
    };

    return (
        <div
            className=" min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <div className="bg-white/80 rounded-2xl shadow-2xl p-8 w-full max-w-xl shadow-blue-800 animate-shadow-expand">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Tournament Registration</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {/* Profile Picture */}
                <div
                    className="flex flex-col items-center mb-8 cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                >
                    <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-blue-500 overflow-hidden">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                Upload Photo
                            </div>
                        )}
                    </div>
                    <h2 className="text-lg font-bold mt-3">{formData.name || "Your Name"}</h2>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    rows="2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="player">Player</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-md font-bold mt-6 cursor-pointer"
                    >
                        Register
                    </button>

                    {/* Login Link */}
                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <a href="/" className="text-blue-600 font-medium">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;