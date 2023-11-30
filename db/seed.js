const client = require('./client.js');
const { createSchool } = require('./schools.js');
const { createStudent } = require('./students.js');
const { createTeacher } = require('./teachers.js');
const { createStudentTeacher } = require('./studentsTeachers.js')
const destroyTables = async () => {
  try{
    await client.query(`
    DROP TABLE IF EXISTS students_teachers;
    DROP TABLE IF EXISTS teachers;
    DROP TABLE IF EXISTS students;
    DROP TABLE IF EXISTS schools;
    `);

  } catch (error) {
    console.log(error)
  }
}


const makeTables = async() => {
  try{
    await client.query(`
      CREATE TABLE schools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        city VARCHAR(40) NOT NULL,
        state CHAR(2) NOT NULL,
        zip_code CHAR(5) NOT NULL,
        is_accredited BOOLEAN
      );

      CREATE TABLE students (
        id SERIAL PRIMARY KEY,
        grade_level INTEGER NOT NULL,
        gpa DECIMAL(3,2),
        name VARCHAR(30) NOT NULL,
        start_date DATE NOT NULL,
        graduation_date DATE,
        has_required_classes BOOLEAN,
        school_id INTEGER REFERENCES schools(id)
      );

      CREATE TABLE teachers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        subject VARCHAR(40) NOT NULL
      );

      CREATE TABLE students_teachers (
        student_id INTEGER REFERENCES students(id),
        teacher_id INTEGER REFERENCES teachers(id)
      );

    ` )

  }catch (error) {
    console.log(error);
    
  }
  
}

const syncAndSeed = async() => {
  try{
    await client.connect();
    console.log('SUCCESS! Client Connected.');

    await destroyTables();
    console.log(`SUCCESS! Dropped tables.`);

    await makeTables();
    console.log(`SUCCESS! Created tables`);

    const nyu = await createSchool('New York University', 'New York', 'NY', '10012', true)
    const mit = await createSchool('MIT', 'Cambridge', 'MA', '08982', true)
    console.log('added schools!')

    const phil = await createStudent(12, 4.0, 'Phil Tolkein', '2023-10-09', '2024-09-02', true, mit.id);
    const kate = await createStudent(8, 2.0, 'Kate Katoferson', '2013-10-09', '2029-12-01', false, mit.id);
    const monica = await createStudent(10, 3.5, 'Monica Escobar', '2020-01-01', '2025-09-02', true, nyu.id);
    console.log('added students');

    const drSmith = await createTeacher('Doctor Smith', 'Biology');
    const wolf = await createTeacher('Naomi Wolf', 'English');
    console.log('added teachers')

    await createStudentTeacher(phil.id, drSmith.id);
    await createStudentTeacher(phil.id, wolf.id);
    await createStudentTeacher(kate.id, wolf.id);
    await createStudentTeacher(monica.id, drSmith.id);
    console.log('added student-teacher connection');

  } catch (error) {
    console.log(error);
  }

  client.end();
}

syncAndSeed();