import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const response = await axios.get("api/auth/profile", {
          headers: { Authorization: `Bearer ${token} ` },
        });
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [user, token]);
  if (!user) {
    return navigate("/login");
  }

  return (
    <div className="profile">
      <h2>Profile</h2>

      {userData ? (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* ... Display other user data if available */}
          {/* ... Profile editing form (optional) */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
