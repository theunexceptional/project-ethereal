import React, { useState } from "react";
import { signup } from "../services/authService";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await signup(username, email, password);
    if (response.token) {
      localStorage.setItem("token", response.token); // Store token
      setMessage("Signup successful!");
    } else {
      setMessage(response.message || response.error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
