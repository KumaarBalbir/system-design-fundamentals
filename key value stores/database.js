const database = {
  "index.html": "<h1>Hello World, from the database</h1>",
};

module.exports.get = (key, callback) => {
  setTimeout(() => {
    callback(database[key]);
  }, 3000);
};
