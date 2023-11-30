const client = require('./client');

const createStudentTeacher = async (student_id, teacher_id) => {
  try{ 
    const {rows: [studentTeacher] } = await client.query(`
      INSERT INTO students_teachers
      VALUES(${student_id}, ${teacher_id})
      RETURNING *;
    `) 
    return studentTeacher;

  }catch(err){
    console.log(err)
  }
}

module.exports = {
  createStudentTeacher
}