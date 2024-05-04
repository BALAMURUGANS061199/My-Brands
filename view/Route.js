const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }); 
// Define your Mongoose schema
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    result: [{
        name: { type: String },
        image: { type: String } 
    }]
});

const BrandModel = mongoose.model('brands', BrandSchema);

// Define your image upload logic
function uploadImageAndInsertURL( brandName, imageUrl) {
    return new Promise((resolve, reject) => {
        resolve(imageUrl);
    });
}





router.post('/Upload', async (req, res) => {
    const brandsData = req.body.brands; // Assuming the request body contains an array of brands

    try {
        // Map over each brand in the request body
        const results = await Promise.all(brandsData.map(async (brandData) => {
            const { name, imageUrl } = brandData;

            // You can directly use the imageUrl received in the request body
            const uploadedImageUrl = await uploadImageAndInsertURL(name, imageUrl);

            return {
                name: name,
                image: uploadedImageUrl
            };
        }));

        const newBrand = new BrandModel({ result: results });

        const savedBrand = await newBrand.save();
        res.status(201).json(savedBrand);
    } catch (error) {
        console.error('Error uploading image and inserting URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/getBrands',async (req,res)=>{
    try{
        const brand = await BrandModel.find();
        res.status(200).json({status:"success",brand})
        if(!brand){
        res.status(404).json({message:"Invalid"})

        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;
