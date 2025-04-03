import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    prep_time:{type: Number, required:true},
    cook_time:{type:Number,required:true},
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true }, 
    image: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", recipeSchema);

class RecipeService{
    static async addRecipe(recipeData){
        try{
            const newRecipe = new Recipe(recipeData);
            await newRecipe.save();
            return {message: "Recipe is saved"};
        }catch(error){
            throw new Error(error.message);
        }
    }
    static async getAllRecipe(skipAmount){
        try {
            const recipes = Recipe.find().skip(skipAmount).limit(16)
            return recipes;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
export default RecipeService;
