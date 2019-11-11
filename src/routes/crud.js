const express = require('express');
const router = express.Router();


const rssModel = require('./../lib/rss')
const controler = new rssModel()
const url = 'http://www.cutonala.udg.mx/rss/eventos_proximos';

const Configurator = require('./../lib/loadConfig');
const loader = new Configurator()

router.get('/', (req, res) => {
	res.json(loader.loadDevelopers());
})




router.get('/eventos', async (req, res) => {
	let num = 100;
	let result = {}
	if (num >= 0){
		let feed = await controler.show(url, num)
		result.respuesta = 'exito'
		result.feed = feed
	} else {
		result.respuesta = 'fallo',
		result.motivo = 'Numero no es mayor a 0'
	}
	res.send(result)
});


router.get('/eventos/:num', async (req, res) => {
	let num = req.params.num;
	let result = {}
	if (num >= 0){
		let feed = await controler.show(url, num)
		result.respuesta = 'exito'
		result.feed = feed
	} else {
		result.respuesta = 'fallo',
		result.motivo = 'Numero no es mayor a 0'
	}
	res.send(result)
})


module.exports = router;