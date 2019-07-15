const express = require('express');
const multer = require('multer');
const SimianController = require('./controllers/SimianController');

const routes = new express.Router();
const upload = multer();

async function isSimio(dna){
const result = await routes.post('/simian', upload.single(), SimianController.store);
return result
}
routes.get('/stats', upload.single(), SimianController.index)

module.exports = routes;