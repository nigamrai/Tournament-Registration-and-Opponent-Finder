import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaFutbol,
  FaMapMarkedAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout";
import TeamList from "./TeamList";

const TournamentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tournament = location.state?.tournament;
  const [activeTab, setActiveTab] = useState("details");
  const role = useSelector((state) => state?.auth?.role);
  const navigateToRegistration = () => {
    navigate("/registration", { state: { tournament } });
  };

  const navigateToRegisteredTeams = (e) => {
    e.preventDefault();
    // navigate("/registered-teams", { state: { tournament } }); // create this page later
    setActiveTab("teams");
  };

  return (
    <HomeLayout>
      <div>
        <p className="text-center m-10 text-[30px] font-bold">
          Tournament Details
        </p>

        <img
          src={tournament?.image?.public_url}
          alt={tournament?.title}
          className="w-full h-[300px] object-cover"
        />

        {/* Tabs for "Tournament Details" and "Registered Teams" */}
        <div className="flex justify-center space-x-6 my-6">
          <button
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === "details"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Tournament Details
          </button>
        
          {role==='admin' &&(
              <button
              className={`px-4 py-2 rounded-full font-semibold ${
                activeTab === "teams"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={(e)=>navigateToRegisteredTeams(e)}
            >
              Registered Teams
            </button> )}

        </div>

        {activeTab === "details" && (
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-6 md:space-y-0 p-4">
            {/* Left Part */}
            <div className="flex-1 p-4 border rounded-lg">
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">
                  About the Tournament:
                </p>
                <p className="text-gray-600">{tournament?.description}</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">
                  Price Details:
                </p>
                <p className="text-gray-600">{tournament?.price}</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">Rules:</p>
                <p className="text-gray-600">{tournament?.rules}</p>
              </div>
            </div>

            {/* Right Part */}
            <div className="flex-1 p-4 border rounded-lg space-y-4">
              <div>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FaCalendarAlt /> Date:
                </p>
                <p className="text-gray-600">{tournament?.startDate}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FaFutbol /> Format:
                </p>
                <p className="text-gray-600">{tournament?.tournamentFormat}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FaMapMarkedAlt /> Location:
                </p>
                <p className="text-gray-600">{tournament?.location}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FaFutbol /> Ground Style:
                </p>
                <p className="text-gray-600">{tournament?.groundStyle}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FaMoneyBillWave /> Registration Fee:
                </p>
                <p className="text-gray-600">
                  {tournament?.registrationAmount}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Max Teams:</p>
                <p className="text-gray-600">{tournament?.maxTeams}</p>
              </div>

              <button
                onClick={navigateToRegistration}
                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition duration-200"
              >
                Register
              </button>
            </div>
          </div>
        )}
        {activeTab === "teams" && <TeamList tournament={tournament} />}
      </div>
    </HomeLayout>
  );
};

export default TournamentDetails;
