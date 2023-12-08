const express = require('express');
const appConfig = require('./config/app.config')
const app = express();

const towaryRouter = require('./routes/produkty');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');

// to mówi expressowi, żeby uznał folder /public za ten ze statycznymi plikami
app.use(express.static(__dirname + '/public'))

// router, który zarządza podstroną z wsyztkimi towarami
app.use('/produkty', towaryRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(appConfig.port);
