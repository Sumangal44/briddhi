import multer from "multer";

// Use memory storage and upload buffers to Cloudinary in the controller.
// This avoids compatibility issues between cloudinary v2 and older multer-storage-cloudinary.
const storage = multer.memoryStorage();

const upload = multer({ storage });
export default upload;