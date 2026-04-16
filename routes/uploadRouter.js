import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// single file upload
router.post("/", upload.single("image"), (req, res, next) => {
console.log("UPLOAD ROUTE HIT:", req.method, req.url);
  next();
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      message: "Upload successful",
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
  
});

export default router;
