import {Problem, TestCase} from "../../models/association.js";
import UploadFile from "../../utility/uploadFile.js";

const AddTestCase = async (req, res) => {
    const problemId = req.params.id;
    const file = req.file;

    if (!file || !file.buffer) {
        return res.status(400).json({ success: false, message: "Please upload a file" });
    }

    try {
        const problem = await Problem.findByPk(problemId);
        if (!problem) {
            return res.status(404).json({ success: false, message: "Problem not found" });
        }

        if (problem.author_id !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to add test cases to this problem" });
        }

        const test_cases = await TestCase.findOne({
            where: { problem_id: problemId }
        });

        if (test_cases) {
            return res.status(400).json({ success: false, message: "Test cases already added. Kindly edit Test Case!" });
        }
        const fileUrl = await UploadFile(file.buffer);
        const testCase = await TestCase.create({
            problem_id: problemId,
            input: fileUrl
        });

        return res.status(201).json({
            success: true,
            testCase});

    } catch (error) {
        console.error("Error adding test case:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message }); 
    }

};

export default AddTestCase;