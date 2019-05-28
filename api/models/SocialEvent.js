module.exports = {
    attributes: {
      title: { type: 'string', required: true },
      description: { type: 'string', required: true },
      city: { type: 'string', required: true },
      country: { type: 'string', required: true },
      date: { type: 'string', required: true },
      maxparticipants: { type: 'number', required: true },
      createdBy: {
        model: 'User',
        required: true
      },
      participants: {
        collection: 'User',
        via: 'events'
      }
    },
    
  };