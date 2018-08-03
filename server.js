var express = require('express');
var app = express();
/* For user authentication*/
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')


/* For user authentication*/
//To import the dot-env module to handle environment variables
var env = require('dotenv').load();

//Models
var models = require("./app/models");
//var config = require("./config/config.json")

var exphbs = require('express-handlebars');

//Routes
//var authRoute = require('./app/routes/auth.js')(app);

var authRoute = require('./app/routes/auth.js')(app,passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions


 
app.get('/', function(req, res) {
 
    res.send('Welcome to Passport with Sequelize');
 
});
 
 



 //Sync Database
 models.sequelize.sync().then(function() {
        
    console.log('Nice! Database looks fine')
    app.listen(8080, function(err) {
 
        if (!err) {
            console.log("Site is live");
                
        }
        else console.log(err)
       
     
    });
        
    }).catch(function(err) {
        
        console.log(err, "Something went wrong with the Database Update!")
        
    });
