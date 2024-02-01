const express = require("express");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const cors = require("cors"); // Import the cors middleware
const path = require("path");

const app = express();
const port = 4000;

// Enable CORS for all routes
app.use(cors());

// Initialize Firebase


// Initialize Cloud Storage and get a reference to the service


// Setting up multer as middleware to grab photo uploads


app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("filename"), async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        // Grab the public URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(`url=${downloadURL}`)

        console.log('File successfully uploaded.');
        return res.send({
            message: 'File uploaded to Firebase Storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        });
    } catch (error) {
        console.error("Error uploading file:", error.message);
        return res.status(400).send(error.message);
    }
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
