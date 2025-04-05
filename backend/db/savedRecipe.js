import mongoose from "mongoose";

const savesSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,unique: true},
    recipes:[{type:mongoose.Schema.Types.ObjectId,ref:"Recipe"}]
},{ timestamps: true });

const Saves = mongoose.model("Saves", savesSchema);

class SavesService{
    static async saveRecipe(userId,recipeId){
        try{
            const response = await Saves.findOne({user:userId})
            if(response){
                const h = response.recipes.includes(recipeId)
                console.log(h)
                if(!h){
                    response.recipes.push(recipeId)
                    await response.save();
                }
                return {message: "Recipe Added!",ok:true};
            }
            const newSave = new Saves({user:userId,recipes:[recipeId]})
            await newSave.save()
            return {message: "Recipe Added!",ok:true};
        }catch(error){
            throw new Error(error.message);
        }
    }
    static async getSavedRecipe(userId){
        try{
            const response = await Saves.findOne({user:userId})
            if(response){
                return response;
            }
            return null;
        }catch(error){
            throw new Error(error.message);
        }
    }
    static async deleteSavedRecipe(recipeId){
        try{
            await Saves.updateMany(
                {},
                { $pull: { recipes: recipeId } }
              );          
        }catch(error){
            throw new Error(error.message);
        }
    }
}
export default SavesService;