
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';


import pageRouter from './routes/pageRoutes.js'
import recipeRouter from './routes/recipeRoutes.js'
import authRouter from './routes/authRoutes.js'
import savesRouters from './routes/savesRoutes.js'
import mailRoutes from './routes/mailRoutes.js'

import dotenv from "dotenv";
dotenv.config()

const app = express();
const PORT = process.env.PORT;
app.use(session({
    secret: "yiddishlabradordomainrevealpurchasehenchman",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.static('public'));
app.use(recipeRouter);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(mailRoutes)
app.use(pageRouter);
app.use(authRouter);
app.use(savesRouters);
mongoose.connect('mongodb://localhost:27017/dishDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("MongoDB connected")).catch((err)=>console.log("Got some error"))


app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`)
})