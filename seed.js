import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const recipes = [
  {
    name: "Jollof Rice",
    description:
      "Blend tomatoes, red peppers, onions, and garlic until smooth. Fry the mixture with vegetable oil and spices for 10 minutes. Add stock, thyme, curry powder, and washed rice, then cook on low heat for 30–40 minutes until the rice is tender. Serve with grilled chicken and fried plantains.",
    image:
      "https://zenaskitchen.com/wp-content/uploads/2025/02/one-pot-jollof-rice-and-chicken-4.jpg",
    favorite: false,
  },

  {
    name: "Pizza",
    description:
      "Prepare the dough using flour, yeast, warm water, and olive oil, then let it rise for 1 hour. Roll out the dough, spread tomato sauce evenly, add mozzarella cheese and toppings. Bake at 220°C for 12–15 minutes until golden and crispy.",
    image:
      "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    favorite: true,
  },

  {
    name: "Burger",
    description:
      "Season minced beef with salt, pepper, garlic, and onions, then shape into patties. Grill for 4–5 minutes per side. Toast buns, add lettuce, tomatoes, cheese, and the patty. Finish with sauce.",
    image:
      "https://assets.bonappetit.com/photos/5d1cb1880813410008e914fc/1:1/w_1920,c_limit/Print-Summer-Smash-Burger.jpg",
    favorite: false,
  },

  {
    name: "Pasta",
    description:
      "Boil salted water and cook pasta until al dente. Sauté garlic in butter, add cream, parmesan, and herbs. Mix in pasta and shrimp, simmer for 2–3 minutes, then serve hot.",
    image:
      "https://jillhough.com/wp-content/uploads/2025/01/Pasta-Puttanesca-with-Shrimp-2.jpg",
    favorite: false,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    await pool.query("DELETE FROM recipes");

    for (const recipe of recipes) {
      await pool.query(
        `INSERT INTO recipes (name, description, image, favorite)
         VALUES ($1, $2, $3, $4)`,
        [recipe.name, recipe.description, recipe.image, recipe.favorite]
      );
    }

    console.log("✅ Seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();