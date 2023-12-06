const express = require('express');
const appConfig = require('./config/app.config')
const app = express();

const towaryRouter = require('./routes/towary');

app.set('view engine', 'ejs');

// to mówi expressowi, żeby uznał folder /public za ten ze statycznymi plikami
app.use(express.static(__dirname + '/public'))

// router, który zarządza podstroną z wsyztkimi towarami
app.use('/towary', towaryRouter);

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(appConfig.port);
