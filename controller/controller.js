import {
  createRecipes,
  updateRecipes,
  getAllRecipes,
  toggleFavorite,
  deleteRecipe,
  getRecipeById,
} from "../model/recipeMoodel.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js"; 

// GET all recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (err) {
    console.log("GET RECIPES ERROR:", err);

    res.status(500).json({
      error: "failed to fetch recipes",
      message: err.message,
    });
  }
};




export const addRecipe = async (req, res) => {
  try {
    const { name, description } = req.body;

    let image = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      image = result.secure_url;
    }

    const recipe = await createRecipes({
      name,
      description,
      image,
    });

    return res.status(201).json(recipe);

  } catch (err) {
    console.log("ADD RECIPE ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
};

// UPDATE recipe

export const editRecipe = async (req, res) => {
  try {
    const { name, description } = req.body;

    let image = req.body.image;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      image = result.secure_url;
    }

    const update = await updateRecipes(req.params.id, {
      name,
      description,
      image,
    });

    return res.json({
      message: "Recipe updated successfully",
      update,
    });

  } catch (err) {
    console.log("🔥 UPDATE ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
};
// DELETE recipe (NO FILE SYSTEM)
export const removeRecipe = async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    await deleteRecipe(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to delete recipe" });
  }
};

// TOGGLE favorite
export const toggleFav = async (req, res) => {
  try {
    const update = await toggleFavorite(req.params.id);

    if (!update) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({
      message: "updated successfully",
      update,
    });
  } catch (error) {
    console.log("TOGGLE ERROR:", error);
    res.status(500).json({ error: "failed to toggle favorite" });
  }
};