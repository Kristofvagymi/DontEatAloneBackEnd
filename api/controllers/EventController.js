var moment = require("moment");
module.exports = {
    createevent: async function (req, res) {
       try {
            var eventCreated = await SocialEvent.create({
                title: req.param('title'),
                description: req.param('description'),
                city: req.param('city'),
                country: req.param('country'),
                date: req.param('date'),
                maxparticipants: req.param('maxparticipants'),
                createdBy: req.param('userid'),
                participants: [],
            }).fetch();
            await User.addToCollection(req.param('userid'), 'events').members(eventCreated.id);
            console.log(eventCreated);
          } catch (err) {
            if (err.name === 'UsageError') {
                console.log("invalid parameter");
                return res.badRequest();
              } else if (err) {
                return res.serverError(err);
              }
          }
        return res.send(eventCreated);
    },
    getevents: async function (req, res) {
        try {
            var currentDate = moment().format('YYYY-MM-DD hh:mm');
            var events = await SocialEvent.find({
                createdBy: { '!=' : req.query.userid},
                date: { '>': currentDate},
            }).populate('participants', {
                where: { id: req.query.userid},
            });
            var eventsWithEveryParticipant = await SocialEvent.find({
                createdBy: { '!=' : req.query.userid},
                date: { '>': currentDate},
            }).populate('participants');

            var eventsWhereUserNotParticipant = [];
           
            for (var i = 0;i< events.length;i++) {
                if( events[i].participants.length == 0 && eventsWithEveryParticipant[i].participants.length <= eventsWithEveryParticipant[i].maxparticipants){
                    eventsWhereUserNotParticipant.push(events[i]);
                }
            }
           } catch (err) {
            console.log('error');
            return res.serverError(err);
        }
        return res.status(200).json(eventsWhereUserNotParticipant);
    },

    gethistoricevents: async function (req, res) {
        var user = await User.findOne({"id":req.query.userid}).populate('events');
        return res.status(200).json(user.events);
    },
    getdetailed: async function (req, res) {
        var event = await SocialEvent.findOne({id: req.query.eventid}).populate('participants').populate('createdBy');
        return res.status(200).json(event);
    },

    applytoevent: async function (req, res) {

        var event = await SocialEvent.findOne({'id': req.param('eventid')}).populate('participants', {
            where: { id: req.param('userid')},
          });

        if( (event.participants.length < event.maxparticipants) && event.participants.length == 0){
            await User.addToCollection(req.param('userid'), 'events').members(req.param('eventid'));
        } else{
            return res.badRequest();
        }

        return res.status(200).json(event);
    },
};