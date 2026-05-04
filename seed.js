import pool from "./config/db.js";

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
      "Prepare the dough using flour, yeast, warm water, and olive oil, then let it rise for 1 hour. Roll out the dough, spread tomato sauce evenly, add mozzarella cheese and your favorite toppings. Bake in a preheated oven at 220°C for 12–15 minutes until golden and crispy.",
    image:
      "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    favorite: true,
  },

  {
    name: "Burger",
    description:
      "Season minced beef with salt, pepper, garlic, and onions, then shape into patties. Grill each side for 4–5 minutes. Toast burger buns, add lettuce, tomatoes, cheese, and the cooked patty. Finish with ketchup, mayonnaise, or your preferred sauce.",
    image:
      "https://assets.bonappetit.com/photos/5d1cb1880813410008e914fc/1:1/w_1920,c_limit/Print-Summer-Smash-Burger.jpg",
    favorite: false,
  },

  {
    name: "Pasta",
    description:
      "Boil salted water and cook pasta for 8-10 minutes until al dente. In a separate pan, sauté garlic in butter, add cream, parmesan cheese, and herbs. Mix in cooked pasta and shrimp, then simmer for 2–3 minutes before serving hot.",
    image:
      "https://jillhough.com/wp-content/uploads/2025/01/Pasta-Puttanesca-with-Shrimp-2.jpg",
    favorite: false,
  },
];

const seedDatabase = async () => {
  try {
    console.log(" Starting database seed...");

    for (const recipe of recipes) {
      await pool.query(
        `
        INSERT INTO recipes (name, description, image, favorite)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING
        `,
        [
          recipe.name,
          recipe.description,
          recipe.image,
          recipe.favorite,
        ]
      );
    }

    console.log("✅ Database seeded successfully");

    await pool.end();

    process.exit(0);

  } catch (error) {
    console.error("❌ Seed failed:", error);

    await pool.end();

    process.exit(1);
  }
};

seedDatabase();