import JobCard from "./JobCard";

export default function SavedJobs({ savedJobs, onToggleSave }) {
  return (
    <div className="saved-area">
      <h2>Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        savedJobs.map((job) => (
          <JobCard key={job.id} job={job} isSaved={true} onToggleSave={onToggleSave} />
        ))
      )}
    </div>
  );
}
