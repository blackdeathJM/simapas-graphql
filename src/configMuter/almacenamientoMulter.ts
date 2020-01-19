import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, path.join(__dirname, '../public/uploads/temp'));
    },
    filename: (req, file, cb) =>
    {
        cb(null, file.originalname);
    }
});
