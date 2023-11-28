const client = require('./client.js');

const makeTables = async() => {
  
}

const syncAndSeed = async() => {
  try{
    await client.connect();
    console.log('SUCCESS! Client Connected.');

  } catch (error) {
    console.log(error);
  }
}

syncAndSeed();