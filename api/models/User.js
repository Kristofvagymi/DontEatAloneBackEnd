module.exports = {
    attributes: {
      firstName: { type: 'string', required: true },
      lastName: { type: 'string', required: true },
      dateOfBirth: { type: 'string', required: true },
      password: {type: 'string', required: true, encrypt: true },
      email: { type: 'string', required: true, email: true, unique: true},
      job: { type: 'string', required: true },
      hobby: { type: 'string', required: true },
      sex: { type: 'string', required: true },
      phoneNumber: { type: 'string', required: true},
      events: {
        collection: 'SocialEvent',
        via: 'participants'
      }
    },
    
  };
