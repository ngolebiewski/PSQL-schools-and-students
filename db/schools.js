const client = require('./client');

const createSchool = async (name, city, state, zip_code, is_accredited) => {
  try {
    const { rows: [school] } = await client.query(`
      INSERT INTO schools (name, city, state, zip_code, is_accredited)
      VALUES ('${name}', '${city}', '${state}', '${zip_code}', '${is_accredited}')
      RETURNING *;
    `);
    return school;
  } catch (err) {
    console.log(err);
  }
}
 
module.exports = {
  createSchool
}

