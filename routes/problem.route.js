import express from "express";
import CreateProblem from "../controllers/problems/createProblem.controller.js";
import AuthMiddleware from "../middleware/userAuth.middleware.js";

const router = express.Router();

// Public Routes
// router.get("/", getAllProblems);
// router.get("/:id", getProblemById);
// router.get("/tags/:tag", getProblemsByTag);
// router.get("/difficulty/:level", getProblemsByDifficulty);

// Protected Routes (Only Teachers/Admins)
router.post("/", AuthMiddleware, CreateProblem);
// router.put("/:id", updateProblem);
// router.delete("/:id", deleteProblem);
// router.post("/:id/testcases", addTestCases);
// router.get("/:id/testcases", getTestCases);

export default router;
