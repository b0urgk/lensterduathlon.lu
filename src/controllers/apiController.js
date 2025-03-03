const Content = require("../models/Content");
const Event = require("../models/Event");
module.exports = {
    updateContentLocale: async (req, res, next) => {
        if(!req.user){
            return res.status(401).redirect('/login');
        }

        const { site, lang, type, key, value } = req.body;


        try{
            if(type === 'content'){
                const pageEntry = await Content.findOne({ language: lang, page: site });

                if(!pageEntry){
                    console.log(site)
                    return res.status(404).json({ msg: 'Page locale not found in DB' })
                }

                const section = pageEntry.sections.find((sec) => sec.key === key);

                if(!section){
                    return res.status(404).json({ msg: 'Section with this key not found' });
                }

                section.value = value;

                await pageEntry.save();

                res.json({ msg: 'Section updated Succesfully' })
            }else if(type === 'eventData'){
                console.log(1)
                const currentYear = new Date().getFullYear();
                const eventEntry = await Event.findOne({ eventEdition: currentYear });

                console.log(eventEntry)

                if(!eventEntry){
                    return res.status(404).json({ msg: `Event data for ${currentYear} not found` });
                }

                if (key === 'eventTitle') {
                    eventEntry.eventTitle = value;
                } else if (key === 'eventDate') {
                    eventEntry.eventDate = value.split('.').reverse().join('-').replace('\n', '');
                    ;
                } else if (key === 'location') {
                    eventEntry.location = value;
                } else if (key === 'schedule') {
                    // Assuming value is an array of schedule entries, update accordingly
                    eventEntry.schedule = value;
                } else if (key === 'contactInfo') {
                    eventEntry.contactInfo = value;
                } else {
                    return res.status(400).json({ msg: 'Invalid key for event data' });
                }

                await eventEntry.save();

                return res.json({ msg: 'Event data updated successfully' });

            }else{
                console.log(12)
                return res.status(400).json({ msg: 'Invalid type specified' });
            }

        }catch (err){
            console.error(err);
            res.status(500).json({ msg: 'Server error while updating' });
        }

    }
}