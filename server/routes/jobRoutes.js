import express from "express";
import db from "../firebase.js";

const router = express.Router();

// Save a job
router.post("/save-job", async (req, res) => {
  try {
    const job = req.body;

    if (!job.job_id) {
      return res.status(400).json({ error: "Job has no id" });
    }

    await db.ref("jobs/" + job.job_id).set(job);

    res.status(200).json({ message: "Job saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete job
router.delete("/delete-job/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    await db.ref("jobs/" + jobId).remove();

    res.status(200).json({ message: "Job deleted successfully", jobId });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ error: "Failed to delete job" });
  }
});


// Get all jobs
router.get("/get-jobs", async (req, res) => {
  try {
    const snapshot = await db.ref("jobs").once("value");
    const jobs = snapshot.val() || {};
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch saved jobs" });
  }
});

export default router;
