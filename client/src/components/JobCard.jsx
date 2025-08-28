export default function JobCard({ job, isSaved, onToggleSave }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      {onToggleSave && (
        <button onClick={() => onToggleSave(job)}>
          {isSaved ? "Unsave" : "Save"}
        </button>
      )}
    </div>
  );
}
