import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/index.html'))
})
router.get('/my-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/myRecipe.html'))
})
router.get('/upload-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/addRecipe2.html'))
})

router.post('/upload-recipe',(req,res)=>{
    const data = req.body;
    const recipe = {...data,author:req.session.user['_id']}
    console.log(recipe)
    res.sendStatus(200);
})

export default router;