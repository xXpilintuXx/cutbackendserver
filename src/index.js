//declaraciones de modulos
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const MySqlStore = require('express-mysql-session');	
const { database } = require('./config/keys');


//init
const app = express();


//config
app.set('port', process.env.PORT || 3000);




//middlewares
app.use(session({
	secret: 'xxSession',
	resave: false,
	saveUninitialized: false,
	store: new MySqlStore(database)
}))
app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

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