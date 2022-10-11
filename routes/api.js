const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  notes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a notes`);
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newTip = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newTip, './db/db.json');
      res.json(`notes added successfully 🚀`);
    } else {
      res.error('Error in adding notes');
    }
  });