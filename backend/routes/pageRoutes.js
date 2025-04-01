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
router.get('/add-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/addRecipe.html'))
})

export default router;