import express from "express";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; 
import { registercitizen, logincitizen, submitIssue,getMyIssues } from "../controllers/citizenController.js";

const router = express.Router();
router.post("/register", registercitizen);
router.post("/login", logincitizen);
router.post("/submit-issue", verifyToken, allowRoles("citizen"), upload.array("images", 5), submitIssue);
router.get("/my-issues", verifyToken, allowRoles("citizen"), getMyIssues);

export default router;
