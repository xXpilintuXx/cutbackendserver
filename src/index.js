//declaraciones de modulos
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//init
const app = express();


//config
app.set('port', process.env.PORT || 3000);




//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


//rutas
app.use(require('./routes/crud'));


//variables globales
app.use((req, res, next) => {
	app.locals.title = "CUT"
	next();
});



//run
app.listen(app.get('port'), () => {
	console.log('listen on port ', app.get('port'))
})