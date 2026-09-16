// Nodemailer
const express = require("express")
const nodemailer = require("nodemailer");
const multer = require('multer')
require("dotenv").config()


const app = express()

const upload = multer({
    storage: multer.memoryStorage()
})

const sendEmail = require("./utils/email")
const saveImageToS3 = require("./utils/s3")
const imageToBase64Data = require("./utils/imagetobase64")

app.get("/", (req, res) => {
    res.send("Server is live");
})

app.get("/upload", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post("/upload", upload.single("image"), async (req, res) => {
    
    const image = req.file
    const result = await saveImageToS3(image)
    res.send({
        message: "file uploaded successfully",
        result: result
    })
})
// const image = imageToBase64Data("download.jpeg")

// const result = saveImageToS3(image)


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})