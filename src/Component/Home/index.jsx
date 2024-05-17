import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="home">
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
        </>
      ) : (
        <>
          <p>Please log in to see user information</p>
          <h1>Welcome to your React Application</h1>
        </>
      )}
    </div>
  );
};

export default Home;
