
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'

//import AuthService from './auth.js';

import pageRouter from './routes/pageRoutes.js'

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(pageRouter)
/*
mongoose.connect('mongodb://localhost:27017/dishDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("MongoDB connected")).catch((err)=>console.log("Got some error"))
*/

app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`)
})