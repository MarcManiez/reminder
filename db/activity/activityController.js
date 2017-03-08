const Activity = require('./activityModel');

module.exports = {
  newActivity: (req, res, next) => {
    const frequency = req.body.times > 1 ? `${req.body.times} times per ${req.body.period}` : `once per ${req.body.period}`;
    const activity = new Activity({
      title: req.body.title,
      description: req.body.description,
      times: req.body.times,
      period: req.body.period,
      frequency: frequency,
      cost: req.body.cost
    });
    activity.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('saved:', data);
      }
    })
    .then(newEntry => {
      res.status(201).json(newEntry);
    })
    .catch(err => {
      next(err);
    });
  },

  getActivities: (req, res, next) => {
    const filter = req.get('status') ? {status: true} : {};
    Activity.find(filter)
      .then(results => {
        if (results) {
          res.json(results);
        }
      })
      .catch(err => {
        next(err);
      }); 
  },

  toggleStatus: (req, res, next) => {
    Activity.update({_id: req.body._id}, {$set: {status: req.body.status}}, () => {
      res.status(204).end();
      next();
    });
  },

  updateModel: (req, res, next) => {
    console.log(req.body);
    Activity.update({_id: req.body[0]._id}, {$set: req.body[1]}, () => {
      res.status(204).end();
      next();
    });
  }
};