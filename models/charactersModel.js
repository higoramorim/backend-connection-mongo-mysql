const { ObjectId } = require('mongodb');
const getConnection = require('./mongodbConnection');


const getAll = async () => 
getConnection('characters').then((characters) => 
characters.find({}).toArray()
);

const getById = async (id) => 
getConnection('characters').then(characters => 
  ObjectId.isValid(id) ?
  characters.findOne({ _id: ObjectId(id)}) : null
);

const add = async (name, cartoon) => 
getConnection('characters')
.then(characters => characters.insertOne({ name, cartoon }))
.then((result) => ({
  _id: result.insertedId,
  name,
  cartoon,
})
);

const update = async (id, name, cartoon) => {
  if(!ObjectId.isValid(id)) return;

  await getConnection('characters')
  .then(characters => characters.updateOne({ _id: ObjectId(id)}, {$set: {name, cartoon}}))
}

const exclude = async (id) => 
ObjectId.isValid(id) ?
await getConnection('characters')
.then(characters => characters.deleteOne({ _id: ObjectId(id)})
)
: null;

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};