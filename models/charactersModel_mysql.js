const connection = require('./mysqlConnection');

const getAll = async () => connection.execute('SELECT * FROM characters').then(([results]) => results);

const getById = async (id) => connection.execute('SELECT * FROM characters WHERE id = ?', [id]).then(([[character]]) => character || null)

const add = async (name, cartoon) => connection.execute('INSERT INTO characters (name, cartoon) VALUES (?, ?)', [name, cartoon]).then(([result]) => ({ id: result.insertId, name, cartoon}))

const update = async (id, name, cartoon) => await connection.execute('UPDATE characters SET name = ?, cartoon = ? WHERE id = ?', [name, cartoon, id]
);

const exclude = async (id) => await connection.execute('DELETE FROM characters WHERE id = ?', [id]
);

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};