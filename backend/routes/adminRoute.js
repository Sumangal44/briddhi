import express from "express";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";
import { getAllIssues, updateIssueStatus } from "../controllers/adminController.js";

const router = express.Router();

// get all pending issues

// Routes
router.get("/issues", verifyToken, allowRoles("admin"), getAllIssues);
router.put("/issues/:id/status", verifyToken, allowRoles("admin"), updateIssueStatus);

export default router;
