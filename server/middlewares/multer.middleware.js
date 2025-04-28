import multer from 'multer';
const upload=multer({
    dest:'uploads/',
    limits:{
        fileSize: 1024 * 1024 * 50, // 5MB
    },
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
}),
});
export const uploadFields = Array.from({ length: 10 }, (_, index) => ({
    name: `memberImage_${index}`,
    maxCount: 1,
  }));
export default upload;