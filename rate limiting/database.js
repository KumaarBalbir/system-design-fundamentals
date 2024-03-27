const database = {
  ["index.html"]: "<html>Hello world!</html>",
};

module.exports.get = (key, callback) => {
  setTimeout(() => {
    callback(database[key]);
  }, 1000);
};
