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

module.exports = multer({ storage });