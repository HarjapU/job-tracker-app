import JobCard from "./JobCard";

export default function SearchResults({ jobs, savedJobs, onToggleSave }) {
  return (
    <div className="results">
      {jobs.map((job) => (
        <JobCard
          key={job.job_id}
          job={job}
          isSaved={!!savedJobs.find((j) => j.job_id === job.job_id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
