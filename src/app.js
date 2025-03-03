const e = require('express');
const cookieParser = require('cookie-parser')
const app = e();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./utils/db');

app.use(cookieParser());
app.use(e.urlencoded({ extended: true }))
app.use(e.json())
app.use('/public', e.static(path.join(__dirname, 'public')));

app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/default.ejs');

connectDB();

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

module.exports = app;