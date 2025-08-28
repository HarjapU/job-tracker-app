import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
