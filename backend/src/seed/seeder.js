const { readFile } = require('fs').promises
const { join } = require('path')

// data files to be seeded:
const modelName = ['user'];

(async () => {
  modelName.forEach(async (model) => {
    const rawJson = await readFile(join(__dirname, `${model}.json`), 'utf8');
    const entity = JSON.parse(rawJson);
    return await require(`../model/${model}.model.js`).insertMany(entity);
  })
  console.log('Data has been seeded!');
})()
