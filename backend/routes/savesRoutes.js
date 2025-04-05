import { Router } from "express";
import path from "path";
import SavesService from '../db/savedRecipe.js';
import RecipeService from '../db/recipe.js'

const router = Router()

router.post("/api/saveRecipe", async (req,res)=>{
    try{
        const {userId,recipeId} = req.body
        const response = await SavesService.saveRecipe(userId,recipeId);
        if(response.ok){
            res.status(200)
        }
        else{
            res.status(400).json({message:"Couldn't Save recipe"})
        }
    }catch(error){
        res.status(400).json({message:"Couldn't Save recipe"})
    }

})
router.get("/api/get-Saves", async (req,res)=>{
    try{
        const userId = req.query.id
        const response = await SavesService.getSavedRecipe(userId);
        res.status(200).json({data:response})
    }catch(error){
        res.status(400).json({message:"Couldn't Save recipe"})
    }

})
router.get('/api/fetch-saved-recipe',async(req,res)=>{

    try {
        const ids = req.query.ids
        const recipeResponse = await RecipeService.getSavedRecipe(ids)
        res.status(200).json({message:"Data fetched Success!",data:recipeResponse})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Can't fetch the recipes"})
    }
})

export default router;