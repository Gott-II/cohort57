use('zoo_db');

db.animals.insertMany([
    { name: "Leo", species: "Lion", age: 5, habitat: "Savannah", predatory: true },
    { name: "Bengamin", species: "Elephant", age: 10, habitat: "Forest", predatory: false },
    { name: "Stripes", species: "Crocodile", age: 4, habitat: "Savannah", predatory: true },
    { name: "Molly", species: "Giraffe", age: 7, habitat: "Savannah", predatory: false },
    { name: "Rex", species: "Tiger", age: 3, habitat: "Forest", predatory: true },
    { name: "Zara", species: "Zebra", age: 6, habitat: "Savannah", predatory: false },{kind: "elephant", weight: 2000, name: "Bengamin", age: 60, climate: "savanna", predatory: false},
    {kind: "crocodile", weight: 400, name: "Gena", age: 24, climate: "savanna", predatory: false},
    {kind: "lemure", weight: 3, name: "Cheburashka", age: 6, climate: "tropical", predatory: false},
    {kind: "zebra", weight: 350, name: "Tsue", age: 12, climate: "savanna", predatory: false},
    {kind: "polar bear", weight: 500, name: "Nanuk", age: 10, climate: "arctic", predatory: true},
    {kind: "bear", weight: 400, name: "Stich", age: 15, climate: "continental", predatory: true}

]);

db.animals.updateMany({kind: "crocodile"}, {$set: {predatory: true}}); -- alle Krokodile als Raubtiere markieren

db.animals.updateMany({kind: "elephant"}, {$set: {weight: 5000}}); -- das Gewicht aller Elefanten auf 5000 setzen

db.animals.updateMany(
  {},
  [
    {
      $set: {
        weight: { $multiply: ["$weight", 1.02] } -- bei allen Tieren das Gewicht um 2% erhöhen
      }
    }
  ]
);

db.animals.deleteMany({age: {$gt: 50}}); -- alle Tiere löschen, die älter als 50 Jahre sind

db.animals.updateMany({}, {$rename: {name: "nick"}}); -- das Feld name in nick umbenennen

db.animals.updateMany({kind: "lion"}, {$set: {foods: ["rabbit", "elphant", "zebra"]}}); -- dem Löwen ein neues Feld foods mit den Lieblingsspeisen hinzufügen

db.animals.updateMany({kind: "lion"}, {$push: {foods: "crocodile"}}); -- dem Löwen eine weitere Lieblingsspeise hinzufügen

db.animals.updateMany({kind: "lion"}, {$pop: {foods: -1}}); -- die erste Lieblingsspeise des Löwen entfernen

db.animals.updateMany({kind: "lion"}, {$pull: {foods: -2}}); -- die letzte Lieblingsspeise des Löwen entfernen

db.animals.updateOne({_id: ObjectId("68b7248b0e0a1bc3a2520da7")}, {$inc: {age: 1}});

db.animals.insertMany([
     {kind: "t-rex", weight: 4000, name: "Rex", age: 1, climate: "jungle", predatory: true},
     {kind: "t-rex", weight: 3500, name: "Rex Mini", age: 1, climate: "jungle", predatory: true},
]);

db.animals.deleteMany({kind: "t-rex"}); -- alle T-Rexe löschen

db.animals.deleteOne({kind: "t-rex"}); -- einen T-Rex löschen

db.animals.aggregate([
    {$match: {
      predatory: true
    }}
]); -- alle Raubtiere anzeigen

db.animals.aggregate([
    {$match: {
      predatory: false
    }},
    {$sort: {
      weight: -1
    }},
    {$limit: 2}
]); -- die zwei schwersten Pflanzenfresser anzeigen

db.animals.aggregate([
    {$match: {
      predatory: false
    }},
    {$sort: {
      weight: -1
    }},
    {$skip: 1},
    {$limit: 1}
]);-- den zweitschwersten Pflanzenfresser anzeigen

db.animals.aggregate([
    {$match: {
      predatory: false
    }},
    {$sort: {
      weight: -1
    }},
    {$skip: 1},
    {$limit: 1},
    {$project: {nick: 1, weight: 1, _id: 0}}
]); -- nur den Namen und das Gewicht des zweitschwersten Pflanzenfressers anzeigen


db.animals.aggregate([
    {$match: {
      predatory: false
    }},
    {$sort: {
      weight: -1
    }},
    {$skip: 1},
    {$limit: 1},
    {$sample: {size: 2}}
]);-- zwei zufällige Tiere anzeigen

db.posts.insertOne({likes: 12, text: "I love MongoDB"}); -- einen neuen Post anlegen

// 68b73b21c46c0fd101cedb19

db.comments.insertMany([
    {postId: ObjectId("68b73b21c46c0fd101cedb19"), text: "Great post!"},
    {postId: ObjectId("68b73b21c46c0fd101cedb19"), text: "Very informative."},
    {postId: ObjectId("68b73b21c46c0fd101cedb19"), text: "Thanks for sharing!"}
]); -- drei Kommentare zu dem Post hinzufügen

db.posts.updateOne({_id: ObjectId("68b73b21c46c0fd101cedb19")}, {$inc: {likes: 1}}); -- die Anzahl der Likes um 1 erhöhen

db.comments.aggregate([
    {$lookup: {
      from: "posts",
      localField: "postId",
    foreignField: "_id",
      as: "postDetails"
    }}
]); -- alle Kommentare mit den zugehörigen Post-Details anzeigen

