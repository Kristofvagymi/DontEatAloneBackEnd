var moment = require("moment");
module.exports = {
    login: async function (req, res) {
        var user = await User.findOne({email: req.param('email')}).decrypt();
        if(user != null){
            if(user.password === req.param('password')){
                user.password = "";
                return res.send(user); 
            }
        }
        res.status(401);
        return res.send(user);
    },

    updatemodel: async function (req, res) {
        try{
            if(req.param('password')===""){
                var user = await User.updateOne({email: req.param('email')}).set({
                    firstName: req.param('firstname'),
                    lastName: req.param('lastname'),
                    dateOfBirth: req.param('date'),
                    job: req.param('job'),
                    hobby: req.param('hobby'),
                    sex: req.param('sex'),
                    phoneNumber: req.param('phone')
                })
            } else{
                var user = await User.updateOne({email: req.param('email')}).set({
                    firstName: req.param('firstname'),
                    lastName: req.param('lastname'),
                    dateOfBirth: req.param('date'),
                    password: req.param('password'),
                    job: req.param('job'),
                    hobby: req.param('hobby'),
                    sex: req.param('sex'),
                    phoneNumber: req.param('phone')
                })
            }
        }catch (err) {
            return res.serverError(err);
        }
        user.password = "";
        return res.send(user);
    },
    
    signup: async function (req, res) {

        try {
            var userCreated = await User.create({
                firstName: req.param('firstname'),
                lastName: req.param('lastname'),
                dateOfBirth: req.param('date'),
                password: req.param('password'),
                email: req.param('email'),
                job: req.param('job'),
                hobby: req.param('hobby'),
                sex: req.param('sex'),
                phoneNumber: req.param('phone'),
                events: []
            }).fetch();
          } catch (err) {
            if (err.code === 'E_UNIQUE') {
                console.log("not unique");
                return res.sendStatus(409);
              } else if (err.name === 'UsageError') {
                console.log("invalid parameter");
                return res.badRequest();
              } else if (err) {
                return res.serverError(err);
              }
          }
        userCreated.password = "";
        return res.send(userCreated);
    },

    

    test: async function (req, res) {
        var event = await SocialEvent.findOne({id: req.query.id}).populate('participants').populate('createdBy');
        return res.status(200).json(event);
    }
};