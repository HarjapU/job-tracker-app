import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jobRoutes from "./routes/jobRoutes.js";

const PORT = 5000;

const app = express();
app.use(express.json())

app.use("/api", jobRoutes)

// endpoint for API search
app.get("/api/search", async (req, res) => {
	
  const query = req.query.query;

  const url = `${process.env.APILINK}search?query=${encodeURIComponent(query)}&page=1&num_pages=1&country=ca&language=en&date_posted=all`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.APIKEY,
      "x-rapidapi-host": process.env.APIHOST
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
