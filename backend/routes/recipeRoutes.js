import { Router } from "express";
import path from "path";
import RecipeService from '../db/recipe.js';
import multer from 'multer';
import SavesService from "../db/savedRecipe.js";

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/upload-recipe',upload.single("image"),async (req,res)=>{
    try{
        const { title, description, prep_time, cook_time, instructions } = req.body;
        const ingredients = JSON.parse(req.body.ingredients || "[]");
        
        const imagePath = req.file ? "/uploads/" + req.file.filename : null;
        
        const recipe = {
            title,
            description,
            prep_time,
            cook_time,
            ingredients,
            instructions,
            image: imagePath,
            author:req.session.user['_id']
        };
        const dbResponse = await RecipeService.addRecipe(recipe);
        if(dbResponse){
            res.status(200).json({message:"Recipe Added Success!"})
        }
    }catch(error){
        res.status(400).json({message:"Couldn't Add recipe"})
    }
})

router.get('/api/fetch-all-recipes',async(req,res)=>{

    try {
        const skip = Number(req.query.page)-1;
        const Rcount = await RecipeService.countRecipe()
        const recipeResponse = await RecipeService.getAllRecipe(skip*10)
        res.status(200).json({message:"Data fetched Success!",data:recipeResponse,count:Rcount})
    } catch (error) {
        res.status(400).json({message:"Can't fetch the recipes"})
    }
})
router.get('/api/fetch-front',async(req,res)=>{
    try {
        const recipeResponse = await RecipeService.getWithQuerry()
        res.status(200).json({message:"Data fetched Success!",data:recipeResponse})
    } catch (error) {
        res.status(400).json({message:"Can't fetch the recipes"})
    }
})
router.get('/api/fetch-user-recipes',async(req,res)=>{

    try {
        const Rcount = await RecipeService.countRecipe()
        const recipeResponse = await RecipeService.getUserRecipe(req.query.id)
        res.status(200).json({message:"Data fetched Success!",data:recipeResponse,count:Rcount})
    } catch (error) {
        res.status(400).json({message:"Can't fetch the recipes"})
    }
})
router.get('/api/fetch-recipe',async(req,res)=>{

    try {
        const recipeResponse = await RecipeService.getRecipe(req.query.id)
        res.status(200).json({message:"Data fetched Success!",data:recipeResponse})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Can't fetch the recipes"})
    }
})
router.delete('/api/delete-recipe/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const ack = await RecipeService.deleteRecipe(id)
        if(!ack){
            await SavesService.deleteSavedRecipe(id)
            return res.status(404).json({ message: "Recipe not found." });
        }
        res.status(200).json({ message: "Recipe deleted successfully." });
    } catch (error) {
        console.error("Delete Error:", error.message);
        res.status(500).json({ message: "Server error while deleting the recipe." });
    }
})
export default router;