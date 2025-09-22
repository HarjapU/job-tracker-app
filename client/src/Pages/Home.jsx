import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [userQuery, setUserQuery] = useState("");
  const [passQuery, setPassQuery] = useState("");
  const [showUserExistsError, setUserExistsError] = useState(false);
  const [showBlankError, setBlankError] = useState(false);
  const [showUserInvalidError, setUserInvalidError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in:", userQuery, passQuery);

    if (userQuery && passQuery) {
      setBlankError(false);
      accountLogin(userQuery, passQuery);
    }
    else {
      setBlankError(true);
      setUserInvalidError(false);
      setUserExistsError(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up:", userQuery, passQuery);

    if (userQuery && passQuery) {
      setBlankError(false);
      setUserInvalidError(false);
      saveAccount(userQuery, passQuery);
    }
    else {
      setBlankError(true);
      setUserExistsError(false);
      setUserInvalidError(false);
    }
  };

  async function accountLogin (username, password) {
    const res = await fetch("/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log("login success:", data);
      localStorage.setItem("Username", username);
      navigate("/dashboard");
    }
    else if (res.status === 400) {
      setUserInvalidError(true);
      setUserExistsError(false);
      setBlankError(false);
    }
    else if (res.status === 500) {
      console.log(data.error);
    }

  
  }

  async function saveAccount (username, password) {
    const res = await fetch("/account/save-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log("Saved:", data);
      navigate("/dashboard");
    }
    else if (res.status === 400) {
      setUserExistsError(true);
      setBlankError(false);
      setUserInvalidError(false);
    }
    else if (res.status === 500) {
      console.log(data.error);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Job Tracker</h1>
      <form>
        <h4>Username:</h4>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <h4>Password:</h4>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassQuery(e.target.value)}
        />
        {showUserExistsError && (<p style={{color: "red"}}>An account with this user name already exists</p>)}
        {showBlankError && (<p style={{color: "red"}}>Field(s) cannot be left blank</p>)}
        {showUserInvalidError && (<p style={{color: "red"}}>Username or password is incorrect</p>)}
        <br />
        <button type="button" onClick={handleSignup} style={{ marginRight: "10px", marginTop: "15px" }}>
          Sign Up
        </button>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}