import settingsLogo from "../assets/settings.png";
import React, { useState } from "react";
import "../app.css";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SavedJobs from "../components/SavedJobs";
import SearchResults from "../components/SearchResults";

export default function Main() {
  const [view, setView] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  //CHANGE TO API LATER
  const [jobs] = useState([
    { id: 1, title: "Job Title", description: "Hello, everyone! This is the first job description ever..." },
    { id: 2, title: "Job Title 2", description: "Hello, everyone! This is the second job description ever..." }
  ]);

  const handleToggleSave = (job) => {
    if (savedJobs.find((j) => j.id === job.id)) {
      setSavedJobs(savedJobs.filter((j) => j.id !== job.id));
    } else {
      setSavedJobs([...savedJobs, job]);
    }
  };

  const renderContent = () => {
    switch (view) {
      case "dashboard":
        return(
        <div className="contentarea"> 
          <SavedJobs savedJobs={savedJobs} onToggleSave={handleToggleSave}></SavedJobs>
        </div>)
      case "search":
        return (
          <div className="contentarea">
            <SearchBar onSearch={(q) => console.log("Searching for ", q)} />
            <SearchResults
              jobs={jobs}
              savedJobs={savedJobs}
              onToggleSave={handleToggleSave}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="topnav">
        <h1 className="title">Job Tracker</h1>
        <input
          className="settingsbutton"
          type="image"
          src={settingsLogo}
          alt="Settings"
          onClick={() => setShowSettings((prev) => !prev)}
        />
      </div>
      <div className="leftnav">
        <a onClick={() => setView("dashboard")} style={{ padding: "6px 20px" }}>
          Dashboard
        </a>
        <a onClick={() => setView("search")} style={{ padding: "6px 36px" }}>
          Search
        </a>
      </div>
      {showSettings && (
        <div className="settings-menu">
          <Link to={"/"}>
            <button>Logout</button>
          </Link>
        </div>
      )}
      {renderContent()}
    </>
  );
}
