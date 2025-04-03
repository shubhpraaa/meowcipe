import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import RecipeService from '../db/recipe.js'

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
router.get('/browse-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/allRecipe.html'))
})


export default router;