import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
    });

    alert("Registered!");
  };

  return (
    <div className="p-10 text-white bg-gray-900 min-h-screen">
      <h1>Register</h1>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={register}>Register</button>
    </div>
  );
};

export default RegisterPage;