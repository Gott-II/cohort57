 db.drinks.insertMany([
  {
    name: "Whiskey",
    price: 45.99,
    strength: 40,
    type: "Alcoholic",
    volume_ml: 700
  },
  {
    name: "Orange Juice",
    price: 3.49,
    strength: 0,
    type: "Non-Alcoholic",
    volume_ml: 1000
  },
  {
    name: "Vodka",
    price: 29.99,
    strength: 40,
    type: "Alcoholic",
    volume_ml: 500
  },
  {
    name: "Energy Drink",
    price: 2.99,
    strength: 0,
    caffeine_mg: 80,
    type: "Non-Alcoholic",
    volume_ml: 250
  },
  {
    name: "Craft Beer",
    price: 4.99,
    strength: 6.5,
    type: "Alcoholic",
    volume_ml: 330
  },
  {
    name: "Mineral Water",
    price: 1.49,
    strength: 0,
    type: "Non-Alcoholic",
    volume_ml: 500
  }
 ])


 db.drinks.find().sort({ price: -1 }).limit(1)

 db.drinks.find().sort({ price: 1 }).limit(3)

 db.drinks.find().sort({ strength: -1 }).limit(1).project({ name: 1, _id: 0 })

 db.drinks.find({ type: "Non-Alcoholic" }).sort({ price: 1 }).limit(1).project({ name: 1, _id: 0 })
