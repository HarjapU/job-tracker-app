import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page refresh

    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
    const data = await res.json()
    const jobsArray = data.data ? Object.values(data.data) : [];

    onSearch(jobsArray);
  };

  return (
    <form method="GET" onSubmit={handleSubmit} style={{textAlign:'center', marginTop:'25px'}}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
