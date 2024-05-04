const express = require('express')
const mongoose = require('mongoose')
const route = require('./view/Route')
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
app.use(express.json());
app.use('/Api',route)


app.use('/',(req,res)=>{
    return res.json({message:"Welcome to NodeJS and MongoDB"})
})


app.listen(PORT,()=>{
    console.log(`Server Running PORT ${PORT} `);
})
const MONGO_URI = process.env.Mongo_URL; // Replace with your MongoDB Atlas connection string
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});
