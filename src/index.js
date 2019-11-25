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
app.use(function (req, res, next) {
	/*var err = new Error('Not Found');
	 err.status = 404;
	 next(err);*/
  
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
  
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
	// Pass to next layer of middleware
	next();
  });

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