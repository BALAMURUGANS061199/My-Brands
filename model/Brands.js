
// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

// const Schema = mongoose.Schema;

// const BrandSchema = new Schema({
//     userId: { type: Number, default: 1001 },
//     result: [{
//         brandId: { type: String, default: uuidv4 },
//         name: { type: String },
//         image: { type: String } 
//     }]
// });

// const BrandModel = mongoose.model('Brand', BrandSchema);

// //  function to handle image upload and URL insertion
// async function uploadImageAndInsertURL(userId, brandName, imageUrl) {
//     try {
//         // Upload image and get URL (implementation specific to your system)
//         const uploadedImageUrl = await uploadImage(imageUrl);

//         // Create a new brand object
//         const newBrand = new BrandModel({
//             userId: userId,
//             result: [{
//                 name: brandName,
//                 image: uploadedImageUrl
//             }]
//         });

//         // Save the new brand to the database
//         const savedBrand = await newBrand.save();
//         console.log('Brand saved:', savedBrand);
//     } catch (error) {
//         console.error('Error uploading image and inserting URL:', error);
//     }
// }

// // Example usage

// uploadImageAndInsertURL(userId, brandName, imageUrl);

// module.exports ={
//     uploadImageAndInsertURL
// }


const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();
const upload = multer({ dest: '/var/task/uploads' }); // Set the destination directory for uploaded files



// Define Mongoose schema and model
const BrandSchema = new mongoose.Schema({
    userId: { type: Number, default: 1001 },
    result: [{
        brandId: { type: String, default: uuidv4 },
        name: { type: String },
        image: { type: String } // Assuming you store image URLs
    }]
});
const BrandModel = mongoose.model('Brand', BrandSchema);

// Handle file upload route
app.post('/Upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // Assuming the uploaded file path is accessible publicly
        const imageUrl = req.file.path;
        
        const { userId, brandName } = req.body;

        // Create a new brand object
        const newBrand = new BrandModel({
            userId: userId,
            result: [{
                name: brandName,
                image: imageUrl
            }]
        });

        // Save the new brand to the database
        const savedBrand = await newBrand.save();
        console.log('Brand saved:', savedBrand);

        res.status(200).json({ message: 'Brand saved successfully' });
    } catch (error) {
        console.error('Error uploading image and inserting URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
