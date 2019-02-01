const knex = require('knex')
const config = require('../knexfile');
db = knex(config.development);

const request = require('supertest');
const hobbitFile = require('./hobbits');

afterEach(async () => {
    await db('hobbits').truncate();
})

describe('hobbits', () => {
    it('should insert a hobbit', async () => {
        const hobbit = await hobbitFile.insert({ name: 'bilbo' })

        const hobbits = await db('hobbits');
        expect(hobbits).toHaveLength(1);
        expect(hobbit.name).toEqual('bilbo')
    });

    it('should delete a hobbit', async () => {
        const austin = ({ name: 'austin' })
        const booboo = ({ name: 'booboo' })
        hobbitFile.insert(austin)
        hobbitFile.insert(booboo)
        hobbitFile.remove(1)
        const hobbits = await db('hobbits');

        expect(hobbits).toHaveLength(1)
        expect(booboo.name).toEqual('booboo')
    });
})
