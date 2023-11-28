const {Client} = require('pg');
const client = new Client('postgres://localhost:5432/schools_and_students');

module.exports=client;  