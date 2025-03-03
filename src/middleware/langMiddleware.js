const Content = require("../models/Content");
module.exports = async (req, res, next) => {
    const lang = req.params.lang;
    if(!lang){
        return res.redirect('/de')
    }

    try {
        // Get language from URL, query, or fallback to 'en' (default language)

        // Fetch content for the specified language, e.g., 'home', 'about', etc.
        const content = await Content.find({ language: lang });


        // Transform the sections array into a key-value object for easier access
        const contents = content.reduce((acc, item) => {
            acc[item.page] = item.sections.reduce((secAcc, section) => {
                secAcc[section.key] = section.value;
                return secAcc;
            }, {});
            return acc;
        }, {});

        for(let content in contents){
            for(let value in contents[content]){
                contents[content][value] = contents[content][value].replace('&eventDate;', new Intl.DateTimeFormat('de-DE').format(new Date(res.locals.eventData.eventDate)))

            }
        }

        // Store the filtered content in res.locals
        res.locals.contents = contents;
        res.locals.lang = lang;

        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.error('Error fetching content:', err);
        next(err); // Pass the error to the next handler (e.g., error handling middleware)
    }

}