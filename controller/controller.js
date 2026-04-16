import {
  createRecipes,
  updateRecipes,
  getAllRecipes,
  toggleFavorite,
  deleteRecipe,
} from "../model/recipeMoodel";

// get all recipes

export const getRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch recipes" });
  }
};

//create recipe

export const addRecipe = async (req, res) => {
  try {
    const recipe = await createRecipes(req.body);
    res.status(201).json({
      message: "Recipe sucessfully created!",
      recipe,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create recipe",
      message: err.message,
    });
  }
};

// update recipe

export const editRecipe = async (req, res) => {
  try {
    const update = await updateRecipes(req.param.id, req.body);
    res.json({
      message: "Recipe updated successfully",
      update,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update recipe", message: err.message });
  }
};

// delete recipe

export const removeRecipe = async (req, res) => {
  try {
    await deleteRecipe(req.param.id);
    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "failed to delete recipe" });
  }
};

// toggle favorite

export const toggleFav = async (req, res) => {
  try {
    const update = await toggleFavorite(req.param.id);
    res.json({
      message: "update sucessfully",
      update
    });
  } catch (error) {
    res.status(500).json({error: "failed to toggle favorite"})
  }
};
