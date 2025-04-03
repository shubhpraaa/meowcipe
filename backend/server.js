
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
//import AuthService from './auth.js';

import pageRouter from './routes/pageRoutes.js'
import recipeRouter from './routes/recipeRoutes.js'
import authRouter from './routes/authRoutes.js'

const app = express();
const PORT = 3000;
app.use(session({
    secret: "yiddishlabradordomainrevealpurchasehenchman",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(recipeRouter);
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(pageRouter);
app.use(authRouter);

mongoose.connect('mongodb://localhost:27017/dishDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("MongoDB connected")).catch((err)=>console.log("Got some error"))


app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`)
})