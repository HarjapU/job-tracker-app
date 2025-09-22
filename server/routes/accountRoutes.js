import express from "express";
import db from "../firebase.js";

const router = express.Router();

// save account to firebase
router.post("/save-account", async (req, res) => {
  try {
    const {username, password} = req.body;

    // check if username already exists
    const snapshot = await db.ref(`Accounts/${username}/`).get();
    if (snapshot.exists()) {
        return res.status(400).json({ error: "Username already exists" });
    }

    await db.ref(`Accounts/${username}/password`).set(password);

    res.status(200).json({ message: "Accounts saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// fetch account from firebase and validate login
router.post("/login", async (req, res) => {
  try {
    const {username, password} = req.body;

    // check if account exists
    const snapshot = await db.ref(`Accounts/${username}/`).get();
    if (!snapshot.exists()) {
        return res.status(400).json({ error: "Username or Password is incorrect" });
    }

    // check if password matches
    if (password == snapshot.val().password) {
        return res.status(200).json({message: "valid login"})
    }
    else {
        return res.status(400).json({ error: "Username or Password is incorrect" });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
