import express from "express"
import { getRecipes,addRecipe,editRecipe,removeRecipe,toggleFav } from "../controller/controller.js"
import { upload } from "../middleware/uploadMiddleware.js"
const router = express.Router()
 
// get all recipes

router.get("/", getRecipes)

//post new recipes

router.post("/", upload.single('image'), addRecipe)

// put update recipe

router.put("/:id", editRecipe)

// delete recipe 

router.delete("/:id",removeRecipe)

// toggle favorite

router.patch("/:id/favorite", toggleFav)

export default router