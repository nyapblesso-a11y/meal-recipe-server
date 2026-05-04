import {
  createRecipes,
  updateRecipes,
  getAllRecipes,
  toggleFavorite,
  deleteRecipe,
  getRecipeById,
} from "../model/recipeMoodel.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get all recipes

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

//create recipe

export const addRecipe = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    let finalImage = imageUrl;

    if (req.file) {
      finalImage = `http://localhost:4040/uploads/${req.file.filename}`;
    }

    const recipe = await createRecipes({
      name,
      description,
      image: finalImage,
    });
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
    const update = await updateRecipes(req.params.id, req.body);
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


export const removeRecipe = async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    console.log("IMAGE FROM DB:", recipe.image);

    if (recipe.image) {
      const cleanPath = recipe.image.replace("http://localhost:4040", "");

      const filePath = path.join(__dirname, "..", cleanPath);

      console.log("FILE TO DELETE:", filePath);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("DELETE ERROR:", err.message);
        } else {
          console.log("FILE DELETED SUCCESSFULLY");
        }
      });
    }

    await deleteRecipe(req.params.id);

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to delete recipe" });
  }
};

// toggle favorite

export const toggleFav = async (req, res) => {
  console.log("TOGGLE HIT:", req.params.id);

  try {
    const update = await toggleFavorite(req.params.id);

    if (!update) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.json({
      message: "updated successfully",
      update,
    });
  } catch (error) {
    console.log("TOGGLE ERROR:", error);
    res.status(500).json({ error: "failed to toggle favorite" });
  }
};
