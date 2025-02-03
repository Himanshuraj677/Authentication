import cloudinary from "../config/cloudinary.config.js";
const UploadFile = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { 
            resource_type: "raw"  // Important for .txt files
        });
        console.log("File uploaded successfully:", result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error("Upload failed:", error);
        throw new Error("Upload failed");
    }
};

export default UploadFile;
