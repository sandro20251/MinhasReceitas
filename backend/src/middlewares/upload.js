const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, "uploads/");
    },

    filename: (req, file, callback) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1000000);

        callback(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }

});

const fileFilter = (req, file, callback) => {

    if (file.mimetype.startsWith("image/")) {
        callback(null, true);
    } else {
        callback(new Error("Apenas imagens são permitidas."));
    }

};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});