import multer from "multer";


// Multer memory storage setup
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "text/plain") {
        cb(null, true);  // Accept the file
    } else {
        cb(new Error("Only .txt files are allowed!"), false);  // Reject the file
    }
};


const upload = multer({ storage, fileFilter });

export default upload;