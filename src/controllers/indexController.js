const fs = require("fs");
const Event = require('../models/Event')
module.exports = {
    index: (req, res, next) => {
        const content = res.locals.contents.home;
        const eventData = res.locals.eventData;
        const files = fs.readdirSync('./src/public/images/');
        const filteredFiles = files.filter(file => file.startsWith('sponsor-'));
        res.render('home.ejs', { title: 'Home', lang: res.locals.lang, pageStaticFiles: 'home', pageName: 'Home' , user: req.user, eventData ,  content, sponsorImages: filteredFiles })
    },
    login: (req, res, next) => {
        if(req.user){
            res.status(302).redirect('/');
        }
        const content = res.locals.contents.login;
        res.render('login.ejs', { title: 'Login', lang: res.locals.lang, pageStaticFiles: 'login', pageName: 'login', user: req.user, content })
    },
    raceInfos: (req, res, next) => {
        const content = res.locals.contents.raceInfo;
        const eventData = res.locals.eventData;

        res.render('infos.ejs', { title: 'Race Infos', lang: res.locals.lang, pageStaticFiles: 'info', pageName: 'raceInfo',user: req.user, content, eventData })


    },
    volunteers: (req, res, next) => {
        const content = res.locals.contents.volunteers;

        res.render('volunteers.ejs', { title: 'Volunteers', lang: res.locals.lang, pageStaticFiles: 'volunteers', pageName: 'volunteers', user: req.user, content })


    },
    archive: async (req, res, next) => {

        const allEvents = await Event.find({});
        const content = {};
        res.render('archive.ejs', { title: 'Archive', lang: res.locals.lang, pageStaticFiles: 'md', pageName: 'archive',user: req.user, content, allEvents })
    },

    sponsors: (req, res, next) => {

        const files = fs.readdirSync('./src/public/images/');
        const filteredFiles = files.filter(file => file.startsWith('sponsor-'));
        const content = {};

        res.render('sponsors.ejs', { title: 'Sponsors', lang: res.locals.lang, pageStaticFiles: 'md', pageName: 'sponsors', user: req.user, sponsorImages: filteredFiles, content })
    },
    longDistance: (req, res, next) =>{
        const files = fs.readdirSync('./src/public/images/');
        const content = {};

        res.render('longDistance.ejs', { title: 'Long Distance Info', lang: res.locals.lang, pageStaticFiles: 'long-distance', pageName: 'long-distance', user: req.user, content })

    }

}