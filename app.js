const express = require('express');
const appConfig = require('./config/app.config')
const app = express();

const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const productsRouter = require('./routes/products');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser(appConfig.cookieSecretKey));
app.use(session({
  secret : appConfig.sessionSecret,
  cookie: { maxAge: appConfig.cookieMaxAge },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());


app.use('/products', productsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(appConfig.port);
