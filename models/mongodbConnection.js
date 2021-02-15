const { MongoClient } = require('mongodb');

const URI = 'mongodb://localhost:27017/live_lecture_27_1';

const DB_NAME = 'live_lecture_27_1';

let connection = null;

module.exports = async function (collectionName) {
  connection =
    connection ||
    (await MongoClient.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));

  return connection.db(DB_NAME).collection(collectionName);
};