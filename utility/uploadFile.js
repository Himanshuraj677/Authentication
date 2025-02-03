import cloudinary from "../config/cloudinary.config.js";

const UploadFile = async (fileBuffer) => {
    try {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "raw" },
                (error, uploadResult) => {
                    if (error) {
                        console.error("Upload failed:", error);
                        reject(new Error("Upload failed"));
                    } else {
                        console.log("File uploaded successfully:", uploadResult.secure_url);
                        resolve(uploadResult.secure_url);
                    }
                }
            );

            stream.end(fileBuffer); // Uploads the file buffer
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Upload failed");
    }
};

export default UploadFile;
