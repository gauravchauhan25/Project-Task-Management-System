import React, { useEffect, useState } from "react";
import { User, Mail } from "lucide-react";
import { useProfileContext } from "../contexts/ProfileContext";
import { Outlet, useNavigate } from "react-router-dom";

export const Profile = () => {
  const { userProfile } = useProfileContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Header Banner */}
       <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">My Profile</h1>
          
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userProfile?.name || ""}
              </h2>
              
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Mail className="w-5 h-5 mr-3 text-blue-500" />
              <span>{userProfile?.email || "Not provided"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
