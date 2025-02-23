import {Problem, TestCase} from "../../models/association.js";
import UploadFile from "../../utility/uploadFile.js";

const UpdateTestCase = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "Please upload a file" });
        }
        const problemId = req.params.id;
        const author_id = req.user.id;
        const problem = await Problem.findByPk(problemId);
        if (!problem) {
            return res.status(404).json({ success: false, message: "Problem not found" });
        }
        if (problem.author_id !== author_id) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this problem test case" });
        }
    
        const fileUrl = await UploadFile(file.buffer);

        if (!fileUrl) {
            return res.status(500).json({ success: false, message: "File upload failed" });
        }
        const testCase = await TestCase.findOne({
            where: { problem_id: problemId }
        });
        if (!testCase) {
            return res.status(404).json({ success: false, message: "Test case not found" });
        }
        testCase.input = fileUrl;
        await testCase.save();
        return res.status(201).json({ success: true, testCase });  
    } catch (error) {
        console.error("Error updating test case:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message }); 
    }

}

export default UpdateTestCase;