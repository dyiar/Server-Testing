const knex = require('knex')
const config = require('../knexfile');
db = knex(config.development);

module.exports = {
    insert,
    remove,
    get
}

async function insert(hobbit) {
    const [id] = await db('hobbits').insert(hobbit)
    return db('hobbits')
    .where({ id })
    .first()
}

async function remove(id){
    return db('hobbits').where('id', id)
    .del();
}

async function get(id){
    let query = db('hobbits')
    return query
}