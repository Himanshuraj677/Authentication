import express from "express";
import CreateProblem from "../controllers/problems/createProblem.controller.js";
import AddTestCase from "../controllers/problems/addTestCase.controller.js";
import AuthMiddleware from "../middleware/userAuth.middleware.js";
import upload from "../config/upload.config.js";
import updateProblem from "../controllers/problems/updateProblem.controller.js";

const router = express.Router();

// Public Routes
// router.get("/", getAllProblems);
// router.get("/:id", getProblemById);
// router.get("/tags/:tag", getProblemsByTag);
// router.get("/difficulty/:level", getProblemsByDifficulty);

// Protected Routes (Only Teachers/Admins)
router.post("/", AuthMiddleware, CreateProblem);
router.put("/:id",AuthMiddleware, updateProblem);
// router.delete("/:id", deleteProblem);
router.post("/:id/testcases", upload.single('file'), AuthMiddleware, AddTestCase);
// router.get("/:id/testcases", getTestCases);

export default router;
