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
            const recipes =await Recipe.find().skip(skipAmount).limit(16)
            return recipes;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    static async getWithQuerry(){
        try {
            const recipes = await Recipe.find().sort({createdAt:-1}).limit(3)
            return recipes;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    static async getUserRecipe(id){
        try {
            const recipes =await Recipe.find({author:id})
            return recipes;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    static async getRecipe(id){
        try {
            const recipe = await Recipe.findOne({ _id:id })
            return recipe;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    static async getSavedRecipe(id){
        try {
            const recipe = await Recipe.find({ _id:id })
            return recipe;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    static async deleteRecipe(id){
        try {
            const ack = await Recipe.findByIdAndDelete(id)
            return ack;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    static async countRecipe(){
        try{
            const count = await Recipe.countDocuments();
            return count;
        }catch(error){
            console.log(error)
            return 0;
        }
    }
}
export default RecipeService;
