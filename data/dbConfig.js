const knex = require('knex');

// const config = {
//     client: 'sqlit3',
//     connection: {
//         filename: './data/sampleData.js'
//     },
//     useNullAsDefault: true
// };

// const db = knex(config)

// module.exports = db

const config = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'development'

module.exports = knex(config[dbEnv])