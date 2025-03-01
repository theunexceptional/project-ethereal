import React, { useEffect, useState } from "react";
import { checkProtected } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const [message, setMessage] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect if not logged in
        return;
      }
      const response = await checkProtected();
      if (response.success) {
        setMessage(response.message);
      } else {
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login");
      }
    };
    verifyAccess();
  }, [navigate]);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default Protected;
