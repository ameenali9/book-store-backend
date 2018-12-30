
const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const registerRoute = require('./route/register');
const loginRoute = require('./route/login');
const logoutRoute = require('./route/logout');
var app = express();
mongoose.connect('mongodb://recete:recete1@ds145369.mlab.com:45369/recete', { useNewUrlParser: true });//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => { console.log('\x1b[36m%s\x1b[0m', 'mongo has been connected...'); })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: true, 
    saveUninitialized: false, 
    secret: 'shhhh, very secret' 
}));
app.use('/register', registerRoute);

app.use('/login', loginRoute);

app.use('/logout', logoutRoute);

app.get('/', (req, res) => {
    if(req.session.user){ // if there are session
        const decodeToken  = jwt.verify(req.session.user['X-auth-token'],'fikracamps');
            res.setHeader("Content-Type", "text/html");
            
            res.send("hi, "+ req.session.user.username + "<br/>auto <a href='logout'>logout</a> after 10 seconds" );
        }else{
            req.session.destroy(); 
            res.setHeader("Content-Type", "text/html");
            res.send("access denied!<br/>try to <a href='login'>login</a> or <a href='register'>register</a>")
        }
    }else{ 
        res.setHeader("Content-Type", "text/html");
        res.send("access denied!<br/>try to <a href='login'>login</a> or <a href='register'>register</a>")
    }
  })

if(!module.parent){ 
    app.listen(3000);
    console.log('server listening on port 3000')
}