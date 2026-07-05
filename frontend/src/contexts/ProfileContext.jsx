import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/auth/profile");

      console.log(response.data);
      setUserProfile(response.data);
    } catch (err) {
      console.log(err);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        fetchUserProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);