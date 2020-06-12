const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//console.log('Testing Server');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'my_app'
});

db.connect(function(err){
    if(err){
        console.log('DB Error.');
        throw err;
        return false;
    }
});

const sessionStore = new MySQLStore({
    expiration:(1825 * 86400 * 1000),
    endConnectionOnClose: false
}, db);

app.use(session({
    key:'jnsdjsrerej553331',
    secret:'jdhjhj3h5j3h3jh3',
    store: sessionStore,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1825 * 86400 * 1000),
        httpOnly:false
    }
}));

new Router(app, db);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
