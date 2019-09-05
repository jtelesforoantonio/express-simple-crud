require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const routesDir = `${process.cwd()}/routes`;

app.use(cookieParser());
app.use(session({
    secret: process.env.APP_NAME,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;

        return method;
    }
}));
app.use(function (req, res, next) {
    res.locals.app_name = process.env.APP_NAME;
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('errors');
    let oldValues = req.flash('old');
    if (oldValues.length > 0) {
        res.locals.old = oldValues[0];
    } else {
        res.locals.old = {};
    }

    next();
});
app.set('view engine', 'twig');

const routes = fs.readdirSync(routesDir, {withFileTypes: true});
routes.forEach((route) => {
    if (route.isFile()) {
        let router = require(`${routesDir}/${route.name}`);
        if (router.hasOwnProperty('uri')) {
            app.use(router.uri, router);
        } else {
            app.use(router);
        }
    }
});

module.exports = app;
