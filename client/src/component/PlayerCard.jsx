import { Phone, MapPin, User, Briefcase, Home } from 'lucide-react';
import React from 'react';

export default function PlayerCard({ player }) {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Player Image - Rounded */}
      <div className="w-full flex justify-center pt-6 pb-2">
        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-blue-100">
          <img
            src={player.imageUrl || 'https://via.placeholder.com/200'}
            alt={`${player.name}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Player Details */}
      <div className="px-4 py-3">
        <div className="font-bold text-xl text-center mb-1">{player.name}</div>
        <div className="bg-blue-100 text-blue-800 text-sm font-medium rounded px-2 py-1 text-center mb-3">
          {player.position}
        </div>

        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <User size={16} className="mr-2 flex-shrink-0" />
            <span>Age: {player.age}</span>
          </div>

          <div className="flex items-center">
            <Phone size={16} className="mr-2 flex-shrink-0" />
            <span>{player.phone}</span>
          </div>

          {player.address && (
            <div className="flex items-start">
              <Home size={16} className="mr-2 mt-1 flex-shrink-0" />
              <span>{player.address}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}