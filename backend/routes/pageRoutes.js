import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import RecipeService from '../db/recipe.js'

const router = Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/index.html'))
})
router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/loginPage.html'))
})
router.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/signupPage.html'))
})
router.get('/my-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/myRecipe.html'))
})
router.get('/upload-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/addRecipe.html'))
})
router.get('/browse-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/allRecipe.html'))
})
router.get('/viewcard',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/viewRecipe.html'))
})
router.get('/saved',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/savedRecipes2.html'))
})
export default router;