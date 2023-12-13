const express = require('express');
const appConfig = require('./config/app.config')
const app = express();

const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const towaryRouter = require('./routes/produkty');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Cookie Parser, sessions and flash
app.use(cookieParser(appConfig.cookieSecretKey));
app.use(session({
  secret : 'something',
  cookie: { maxAge: appConfig.cookieMaxAge },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// router, który zarządza podstroną z wsyztkimi towarami
app.use('/produkty', towaryRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(appConfig.port);
