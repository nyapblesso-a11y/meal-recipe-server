import express from "express";

import {
  getRecipes,
  addRecipe,
  editRecipe,
  removeRecipe,
  toggleFav,
} from "../controller/controller.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/", upload.single("image"), addRecipe);
router.put("/:id", upload.single("image"), editRecipe);
router.delete("/:id", removeRecipe);
router.patch("/:id/favorite", toggleFav);

export default router;
