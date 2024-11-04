const express = require('express')
const multer = require('multer')
const Tesseract = require('tesseract.js')
const cors = require('cors')
const app = express()
const os = require('os');
const interfaces = os.networkInterfaces();
const localIp = Object.values(interfaces)
  .flat()
  .find((iface) => iface.family === 'IPv4' && !iface.internal).address;

app.use(cors())

const upload = multer({ dest: 'uploads/' })


// ocr is our endpoint, upload.single handles uploading images
// req is the request we're sending to our backend to process
// res is the response we get after we process the image
app.post('/ocr', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path

        const { data } = Tesseract.recognize(imagePath, 'eng')

        res.json({ text: data })
    }
    catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: 'OCR processing failed' })
    }

})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://${localIp}:${PORT}`);

})