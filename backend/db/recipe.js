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

export default mongoose.model("Recipe", recipeSchema);
