const Event = require('../models/Event');
module.exports = async (req, res, next) => {
    try{
        const currentYear = new Date().getFullYear();
        const event = await Event.findOne({ eventEdition: currentYear });

        if (!event) {
            console.log('No events found for edition:', currentYear
            );
        }
        res.locals.eventData = {
            eventTitle: event.eventTitle,
            eventDate: event.eventDate,
            eventEdition: event.eventEdition,
            location: event.location,
            schedule: event.schedule,
            contactInfo: event.contactInfo,
            resultsLink: event.resultsLink
        };

        next();

    }catch (err){
        console.error('Error fetching event Data', err);
        res.status(500).send('Internal Server Error');
    }
}