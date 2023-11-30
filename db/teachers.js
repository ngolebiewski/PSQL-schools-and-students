const client = require('./client');

const createTeacher = async (name, subject) => {
  try {
    const { rows: [teacher]} = await client.query(`
    INSERT INTO teachers(name, subject)
    VALUES ('${name}', '${subject}')
    RETURNING *;
    `)
    return teacher;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createTeacher
}