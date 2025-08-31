import settingsLogo from "../assets/settings.png";
import React, { useState, useEffect } from "react";
import "../app.css";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SavedJobs from "../components/SavedJobs";
import SearchResults from "../components/SearchResults";

export default function Main() {
  const [view, setView] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobs, setJobs] = useState([])

  // keep the saved jobs updated
  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // handle save button actions
  const handleToggleSave = (job) => {
    if (savedJobs.find((j) => j.job_id === job.job_id)) {

      // remove locally
      setSavedJobs(savedJobs.filter((j) => j.job_id !== job.job_id));

      // Remove from Firebase
      deleteJobDatabase(job.job_id);
    } else {

      // save locally
      setSavedJobs([...savedJobs, job]);

      // save to firebase
      saveJobDatabase(job)
    }
  };

  // save to firebase database
  async function saveJobDatabase(job) {
    const res = await fetch("/api/save-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    const data = await res.json();
    console.log("Saved:", data);
  }

  // remove from firebase database
  async function deleteJobDatabase(jobId) {
    try {
      const res = await fetch(`/api/delete-job/${jobId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Deleted:", data);
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  }

  // retrieves from firebase database
  async function fetchSavedJobs() {
    try {
      const res = await fetch("/api/get-jobs");
      const data = await res.json();

      const jobsArray = data ? Object.values(data) : [];
      setSavedJobs(jobsArray);
    } catch (err) {
      console.error("Failed to fetch saved jobs:", err);
    }
  }

  // logic to determine content area display
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
            <SearchBar onSearch={(data) => setJobs(data)} />
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
