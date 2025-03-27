
import express from 'express';
import mongoose from 'mongoose';
import AuthService from './auth';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/dishDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("MongoDB connected")).catch((err)=>console.log("Got some error"))


app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`)
})