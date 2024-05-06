
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/var/task/uploads'); // Specify the destination directory here
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname)); 
    }
});

app.post('/Upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // Assuming the uploaded file path is accessible publicly
        const imageUrl = req.file.path;
        
        const { userId, brandName, index } = req.body;

        // Find the brand associated with the userId
        let existingBrand = await BrandModel.findOne({ userId });

        if (!existingBrand) {
            // If the brand doesn't exist, create a new brand object
            existingBrand = new BrandModel({
                userId: userId,
                result: []
            });
        }

        // Insert the new brand data into the result array at the specified index
        existingBrand.result.splice(index, 0, {
            name: brandName,
            image: imageUrl
        });

        // Save/update the brand in the database
        const savedBrand = await existingBrand.save();
        console.log('Brand saved:', savedBrand);

        res.status(200).json({ message: 'Brand saved successfully' });
    } catch (error) {
        console.error('Error uploading image and inserting URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

