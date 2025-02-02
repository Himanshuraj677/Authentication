import { Problem } from '../../models/association.js';

const CreateProblem = async (req, res, next) => {
    try {
        const { title, description, difficulty, tags, optimized_code, lang } = req.body;
        
        // ✅ Check if all required fields are present
        if (!title || !description || !difficulty || !tags || !optimized_code || !lang) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Validate difficulty level
        const validDifficulties = ["easy", "medium", "hard"];
        if (!validDifficulties.includes(difficulty)) {
            return res.status(400).json({ success: false, message: "Invalid difficulty level" });
        }

        // ✅ Validate language
        const validLanguages = ["python", "javascript", "java", "cpp", "c"];
        if (!validLanguages.includes(lang)) {
            return res.status(400).json({ success: false, message: "Invalid language or Not supported" });
        }

        // ✅ Ensure `tags` is an array
        const formattedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

        const author_id = req.user.id; // Assuming `req.user` exists and contains authenticated user info

        // ✅ Check for duplicate problem title (optional)
        const existingProblem = await Problem.findOne({ where: { title } });
        if (existingProblem) {
            return res.status(400).json({ success: false, message: "A problem with this title already exists" });
        }

        // ✅ Create problem
        const problem = await Problem.create({
            title,
            description,
            difficulty,
            tags: formattedTags, // Store as JSON string if DB column is a STRING
            optimized_code,
            lang,
            author_id
        });

        return res.status(201).json({ success: true, problem });
    } catch (error) {
        console.error("Create Problem Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export default CreateProblem;
