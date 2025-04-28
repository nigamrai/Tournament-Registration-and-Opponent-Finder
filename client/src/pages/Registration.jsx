import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import RegistrationCars from "../component/RegistrationCars"; // small typo fixed (Cars -> Card)
import axiosInstance from "../Helpers/axiousInstance";
const Registration = () => {

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const tournament = location.state?.tournament;

  const [formData, setFormData] = useState({
    teamName: "",
    tournamentId: tournament?._id || "",
    userId: tournament?._id,
    teamMembers: Array.from({ length: 10 }, () => ({
      name: "",
      email: "",
      phone: "",
      role: "",
      image: null,
    })),
  });
  console.log(formData)
  const handleTeamNameChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      teamName: e.target.value,
    }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index][field] = value;

    setFormData((prevData) => ({
      ...prevData,
      teamMembers: updatedMembers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const formDataToSend = new FormData();
    formDataToSend.append("teamName", formData.teamName);
    formDataToSend.append("tournamentId", formData.tournamentId);
    formDataToSend.append("userId", formData.userId);

    // Filter out empty members
    const validTeamMembers = formData.teamMembers.filter(
      (member) => member.name && member.email && member.phone
    );

    formDataToSend.append("teamMembers", JSON.stringify(validTeamMembers));

    validTeamMembers.forEach((member, index) => {
      if (member.image) {
        formDataToSend.append(`memberImage_${index}`, member.image);
      }
    });

    try {
      const response = await axiosInstance.post("/api/participant/register", formDataToSend);
      console.log(response.data);
      if (response.data.success) {
      
        Navigate("/TeamList");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold mb-2">
          Tournament Name: {tournament?.title}
        </h1>
        <p className="text-gray-600">Complete the form below to register your team</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Team Information</h2>
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={handleTeamNameChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formData.teamMembers.map((member, index) => (
            <RegistrationCars
              key={index}
              index={index}
              member={member}
              handleMemberChange={handleMemberChange}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white text-sm py-2 px-4 rounded hover:bg-indigo-700 transition"
          onClick={handleSubmit}

        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;



