import React, { useState } from "react";
import RegistrationCard from "../component/RegistrationCars";
import Navbar from "../component/Navbar";

const numberOfPlayers = 7
const Registration = () => {
    const [formData, setFormData] = useState({
        teamName: ""
    }) 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    return (
        <div>
            <Navbar /> 
            <div className="text-center p-4">
                <h1 className="">Tournament Name:</h1>
                <p>Complete the form below to register your team</p>
            </div> 
            <div>
               <h2>Team Information</h2>
            </div> 
            <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
                <input 
                type="text"
                id="teamName"
                name="teamName" 
                value={FormData.teamName}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full" />
            </div>                     
            <div className="grid grid-cols-3 gap-4 ">
           {Array.from({length:10}).map((_,index)=>(
            <RegistrationCard key={index}/>            
           ))}
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700" >
                        Register
                    </button>
        </div>
    )
}
export default Registration
