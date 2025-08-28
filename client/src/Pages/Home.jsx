import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // add auth and proper login later
    navigate("/dashboard"); 
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Job Tracker</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
