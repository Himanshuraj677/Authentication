import { Problem } from "../../models/association.js";

const updateProblem = async (req, res) => {
    const problemId = req.params.id;
    const { title, description, difficulty, tags, optimized_code, lang } = req.body;

    if (!title && !description && !difficulty && !tags && !optimized_code && !lang) {
        return res.status(400).json({ success: false, message: "Please provide at least one field to update" });
    }

    const author_id = req.user.id;
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
        return res.status(404).json({ success: false, message: "Problem not found" });
    }
    if (problem.author_id !== author_id) {
        return res.status(403).json({ success: false, message: "You are not authorized to update this problem" });
    }

    // ✅ Validate difficulty level
    if (difficulty) {
        const validDifficulties = ["easy", "medium", "hard"];
        if (!validDifficulties.includes(difficulty)) {
            return res.status(400).json({ success: false, message: "Invalid difficulty level" });
        }
    }

    // ✅ Validate language
    if (lang) {
        const validLanguages = ["python", "javascript", "java", "cpp", "c"];
        if (!validLanguages.includes(lang)) {
            return res.status(400).json({ success: false, message: "Invalid language or Not supported" });
        }
    }

    // ✅ Ensure `tags` is an array
    let formattedTags;
    if (tags) {
        formattedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    }

    try {
        problem.title = title ?? problem.title;
        problem.description = description ?? problem.description;
        problem.difficulty = difficulty ?? problem.difficulty;
        problem.tags = formattedTags ?? problem.tags;
        problem.optimized_code = optimized_code ?? problem.optimized_code;
        problem.lang = lang ?? problem.lang;
        await problem.save();
        return res.status(200).json({ success: true, message: "Problem updated successfully", problem });
    } catch (error) {
        console.error("Error updating problem:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
        
    }

}

export default updateProblem;