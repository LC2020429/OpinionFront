import React, { useState } from "react";
import Login from "../../components/auth/login";
import Register from "../../components/auth/register";

export const AuthPage = () => {
  const [islogin, setIslogin] = useState(true);

  const handleAuthPageToggle = () => {
    setIslogin((prevState) => !prevState);
  };
  return (
    <div className="auth-container">
      {islogin ? (
        <Login switchAuthHandler={handleAuthPageToggle} />
      ) : (
        <Register switchAuthHandler={handleAuthPageToggle} />
      )}
    </div>
  );
};
