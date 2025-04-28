import React from "react";

const RegistrationCars = ({ index, member, handleMemberChange }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === "image" ? files[0] : value;
    handleMemberChange(index, name, fieldValue);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="font-semibold mb-2">Member {index + 1}</h3>

      {/* Profile Image */}
      <div>
        <label
          htmlFor="profileImage"
          className="block text-sm font-medium text-gray-700"
        >
          Profile Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={member.name}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={member.email}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={member.phone}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          id="role"
          name="role"
          value={member.role}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Captain">Captain</option>
          <option value="Coach">Coach</option>
          <option value="Player">Player</option>
         
        </select>
      </div>
    </div>
  );
};

export default RegistrationCars;
