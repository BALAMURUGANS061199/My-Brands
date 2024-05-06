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
        // Fetch the existing brand model if it exists
        let existingBrand = await BrandModel.findOne();

        if (!existingBrand) {
            // If the brand doesn't exist, create a new brand object
            existingBrand = new BrandModel({ result: [] });
        }

        // Map over each brand in the request body and insert into the result array
        brandsData.forEach((brandData) => {
            const { name, imageUrl } = brandData;
            existingBrand.result.push({
                name: name,
                image: imageUrl
            });
        });

        // Save/update the brand in the database
        const savedBrand = await existingBrand.save();
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
