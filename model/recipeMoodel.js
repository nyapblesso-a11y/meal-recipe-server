import pool from "../config/db.js";

// Get recipes

export const getAllRecipes = async () => {
  const results = await pool.query("SELECT * FROM recipes ORDER BY id DESC");
  return results.rows;
};

// Create recipes
export const createRecipes = async (recipe) => {
  const { name, description, image } = recipe;

  const result = await pool.query(
    `INSERT INTO recipes (name, description, image)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, description, image]
  );
  return result.rows[0];
};

// update recipe

export const updateRecipes = async (id, recipe) => {
  const { name, description, image } = recipe;

  const result = await pool.query(
    `UPDATE recipes
     SET name = $1,
         description = $2,
         image = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4
     RETURNING *`,
    [name, description, image, id]
  );

  return result.rows[0]
};

// Delete recipe

export const getRecipeById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM recipes WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

export const deleteRecipe = async (id) => {
  await pool.query("DELETE FROM recipes WHERE id = $1", [id]);
};

// toggle favorite

export const toggleFavorite = async(id) => {
    const result = await pool.query( `UPDATE recipes
     SET favorite = NOT favorite
     WHERE id = $1
     RETURNING *`,
    [id]
)
return result.rows[0]
}