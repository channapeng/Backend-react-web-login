
var connectDB = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

connectDB.initializeApp({
  credential: connectDB.credential.cert(serviceAccount)
});

module.exports = connectDB
