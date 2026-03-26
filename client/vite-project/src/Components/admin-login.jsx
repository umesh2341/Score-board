import React, { useState } from "react";

function AdminLogin({ setToken }) {
  const [detail, setDetail] = useState({ 
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/get-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      
      localStorage.setItem("token", data.token);
      setToken(data.token);

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={detail.email}
          placeholder="enter your email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={detail.password}
          placeholder="enter your password"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AdminLogin;