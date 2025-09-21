import { db } from "../firebaseadmin.js";

export const postUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const data = req.body;

    const docRef = db.collection("users").doc(uid);
    await docRef.set(
      {
        uid,
        displayName: data.displayName || "",
        email: req.user.email,
        username: data.username || "",
        role: "user",
        updatedAt: new Date(),
      },
      { merge: true }
    );

    const snap = await docRef.get();
    res.json(snap.data());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const snap = await db.collection("users").doc(req.user.uid).get();
    res.json(snap.data());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

