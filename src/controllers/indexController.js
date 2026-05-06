const fs = require("fs");
const Event = require('../models/Event')

// Helper to merge nav content with page content
const mergeContent = (pageContent, navContent) => {
    return { ...navContent, ...pageContent };
};

// Sponsors whose URL doesn't follow the `<slug>.lu` filename convention.
const SPONSOR_URL_OVERRIDES = {
    'sponsor-mwd.svg': 'https://marcwilmes.com/',
};

const buildSponsors = () => {
    return fs.readdirSync('./src/public/images/')
        .filter(file => file.startsWith('sponsor-'))
        .map(file => {
            if (SPONSOR_URL_OVERRIDES[file]) {
                return { file, url: SPONSOR_URL_OVERRIDES[file] };
            }
            const slug = file.split('-').slice(1).join('-')
                .replace(/\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg)$/i, '');
            return { file, url: `https://${slug}.lu` };
        });
};

module.exports = {
    index: (req, res, next) => {
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.home || {};
        const content = mergeContent(pageContent, navContent);
        const eventData = res.locals.eventData;
        res.render('home.ejs', { title: 'Home', lang: res.locals.lang, pageStaticFiles: 'home', pageName: 'Home' , user: req.user, eventData ,  content, sponsorImages: buildSponsors() })
    },
    login: (req, res, next) => {
        if(req.user){
            res.status(302).redirect('/');
        }
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.login || {};
        const content = mergeContent(pageContent, navContent);
        res.render('login.ejs', { title: 'Login', lang: res.locals.lang, pageStaticFiles: 'login', pageName: 'login', user: req.user, content })
    },
    raceInfos: (req, res, next) => {
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.raceInfo || {};
        const content = mergeContent(pageContent, navContent);
        const eventData = res.locals.eventData;

        res.render('infos.ejs', { title: 'Race Infos', lang: res.locals.lang, pageStaticFiles: 'info', pageName: 'raceInfo',user: req.user, content, eventData })


    },
    volunteers: (req, res, next) => {
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.volunteers || {};
        const content = mergeContent(pageContent, navContent);

        res.render('volunteers.ejs', { title: 'Volunteers', lang: res.locals.lang, pageStaticFiles: 'volunteers', pageName: 'volunteers', user: req.user, content })


    },
    contact: (req, res, next) => {
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.contact || {};
        const content = mergeContent(pageContent, navContent);

        res.render('contact.ejs', { title: 'Contact', lang: res.locals.lang, pageStaticFiles: 'contact', pageName: 'contact', user: req.user, content })

    },
    archive: async (req, res, next) => {
        const allEvents = await Event.find({});
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.archive || {};
        const content = mergeContent(pageContent, navContent);

        const archiveRoot = './src/public/archive';
        const photoExt = /\.(jpe?g|png|gif|bmp|webp|tiff)$/i;
        const yearDirs = fs.existsSync(archiveRoot)
            ? fs.readdirSync(archiveRoot, { withFileTypes: true })
                .filter(d => d.isDirectory() && /^\d{4}$/.test(d.name))
                .map(d => d.name)
            : [];

        const eventByYear = {};
        for (const event of allEvents) {
            const yearMatch = String(event.eventEdition).match(/\d{4}/);
            if (yearMatch) eventByYear[yearMatch[0]] = event;
        }

        const RESULTS_LINK_OVERRIDES = {
            '2026': 'https://www.acn-timing.com/?lng=FR#/events/2141608132858859/ctx/20260503_junglinster/cms/CAP',
        };

        const yearSet = new Set([...yearDirs, ...Object.keys(eventByYear), ...Object.keys(RESULTS_LINK_OVERRIDES)]);
        const archives = [...yearSet]
            .sort((a, b) => Number(b) - Number(a))
            .map(year => {
                const dir = `${archiveRoot}/${year}`;
                const photos = fs.existsSync(dir)
                    ? fs.readdirSync(dir).filter(f => photoExt.test(f)).sort()
                    : [];
                const event = eventByYear[year] || null;
                const resultsLink = RESULTS_LINK_OVERRIDES[year] || (event && event.resultsLink) || null;
                return { year, photos, event, resultsLink };
            });

        res.render('archive.ejs', { title: 'Archive', lang: res.locals.lang, pageStaticFiles: 'archive', pageName: 'archive', user: req.user, content, archives })
    },

    sponsors: (req, res, next) => {
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.sponsors || {};
        const content = mergeContent(pageContent, navContent);

        res.render('sponsors.ejs', { title: 'Sponsors', lang: res.locals.lang, pageStaticFiles: 'partners', pageName: 'sponsors', user: req.user, sponsorImages: buildSponsors(), content })
    },
    shortDistance:  (req, res, next) =>{
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.shortDistance || {};
        const content = mergeContent(pageContent, navContent);

        res.render('shortDistance.ejs', { title: 'Short Distance Info', lang: res.locals.lang, pageStaticFiles: 'long-distance', pageName: 'long-distance', user: req.user, content })
    },
    longDistance: (req, res, next) =>{
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.longDistance || {};
        const content = mergeContent(pageContent, navContent);

        res.render('longDistance.ejs', { title: 'Long Distance Info', lang: res.locals.lang, pageStaticFiles: 'long-distance', pageName: 'long-distance', user: req.user, content })
    },
    middleDistance:  (req, res, next) =>{
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.middleDistance || {};
        const content = mergeContent(pageContent, navContent);

        res.render('middleDistance.ejs', { title: 'Middle Distance Info', lang: res.locals.lang, pageStaticFiles: 'long-distance', pageName: 'long-distance', user: req.user, content })
    },
    miniDistance: (req, res,next) => {
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.kidsDistance || {};
        const content = mergeContent(pageContent, navContent);

      res.render('miniDistance.ejs', { title: 'Kids A/B Info', lang: res.locals.lang, pageStaticFiles: 'mini-distance', pageName: 'mini-distance', user: req.user, content });
    },
    tba:  (req, res, next) =>{
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.volunteers || {};
        const content = mergeContent(pageContent, navContent);

        res.render('tba.ejs', { title: 'To Be Announced', lang: res.locals.lang, pageStaticFiles: null, pageName: 'tba', user: req.user, content })
    },
    privacyPolicy:  (req, res, next) =>{
        const navContent = res.locals.navContent || {};
        const pageContent = res.locals.contents.privacyPolicy || {};
        const content = mergeContent(pageContent, navContent);

        res.render('privacy-policy.ejs', { title: 'Privacy Policy', lang: res.locals.lang, pageStaticFiles: 'privacy-policy', pageName: 'privacy-policy', user: req.user, content })
    },
}
