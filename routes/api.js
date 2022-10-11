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

  notes.delete('/notes/:id',(req, res) => {
    const data = require('../db/db.json');
    console.info(`${req.method} request received to delete a note`);
    const reqNote = req.params.id;

    for(var i = 0; i < data.length; i ++) {
        if (reqNote == data[i].id) {
            data.splice(i,1);
            writeToFile('./db/db.json', data);
            res.json(JSON.parse(data));
            return;
        }
    }

  });

  module.exports = notes;