import React from "react";
import {useState} from "react";
import Navbar from "./Navbar";

const RegistrationCard = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: ""
    });
    console.log(formData)
    const [profileImage, setProfileImage] = useState(null);

    const handleChange =(e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div>
            
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                        Profile Image
                    </label>
                    <input type="file"
                     id="profileImage"
                      name="profileImage"
                       onChange={handleImageChange}
                        className="mt-1 p-2 border rounded w-full" />
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input type="text"
                     id="name"
                      name="name"
                       value={formData.name}
                        onChange={handleChange}
                         className="mt-1 p-2 border rounded w-full" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input type="email"
                     id="email"
                      name="email"
                       value={formData.email}
                        onChange={handleChange}
                         className="mt-1 p-2 border rounded w-full" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input type="tel"
                     id="phone"
                      name="phone"
                       value={formData.phone}
                        onChange={handleChange}
                         className="mt-1 p-2 border rounded w-full" />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                     id="role"
                      name="role"
                       value={formData.role}
                        onChange={handleChange}
                         className="mt-1 p-2 border rounded w-full">
                         <option value="">Select Role</option>
                         <option value="Player">caption</option>
                         <option value="Coach">Coach</option>
                         <option value="Referee">player</option>
                    </select>
                </div>
                
            </form>           
        </div>
        </div>
    )
}
export default RegistrationCard