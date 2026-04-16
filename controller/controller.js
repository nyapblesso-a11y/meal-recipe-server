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

//create recipe

export const addRecipe = async(req, res) => {
 try {
    const recipe = await createRecipes(req.body)
    res.status(201).json({
        message: "Recipe sucessfully created!", recipe
    })
 }catch (err) {
    res.status(500).json({ 
      error: "Failed to create recipe",
      message: err.message 
    });
  }
}