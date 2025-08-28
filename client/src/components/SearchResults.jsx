import JobCard from "./JobCard";

export default function SearchResults({ jobs, savedJobs, onToggleSave }) {
  return (
    <div className="results">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={!!savedJobs.find((j) => j.id === job.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
