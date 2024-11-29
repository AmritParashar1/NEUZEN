use('neuzendatabase');

// Insert a few documents into the sales collection.
db.getCollection('articles').insertMany([
  {
    "name" : "Python",
    "Price" : 15000,
    "Instructor" : "Harry"
  },
  {
    "name" : "JavaScript",
    "Price" : 18000,
    "Instructor" : "Bob"
  },
  {
    "name" : "C++",
    "Price" : 20000,
    "Instructor" : "Joe"
  }
]);


// Print a message to the output window.
console.log(`Done inserting data`);
