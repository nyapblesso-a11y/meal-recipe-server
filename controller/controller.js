import { createRecipes, updateRecipes, getAllRecipes, toggleFavorite, deleteRecipe } from "../model/recipeMoodel";

// get all recipes

export const getRecipes = async(req, res) => {
    try {
     const recipes = await getAllRecipes()
     res.json(recipes)
    } catch(err) {
     res.status(500).json({error: "failed to fetch recipes"})
    }
}