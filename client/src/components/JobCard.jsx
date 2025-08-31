export default function JobCard({ job, isSaved, onToggleSave }) {
  return (
    <div className="job-card" style={{border: '10px', borderColor:'black', padding: '50px'}}>
      <h3>{job.job_title}</h3>
      <p>{job.job_description}</p>
      {onToggleSave && (
        <button onClick={() => onToggleSave(job)}>
          {isSaved ? "Unsave" : "Save"}
        </button>
      )}
    </div>
  );
}
