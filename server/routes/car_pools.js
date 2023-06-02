const router = require('express').Router();

let activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    activity.car_pools.find()
    .then((car) => {
        res.json(car);
    })
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const title = 'car_pools:'+req.body.title;
    const hostid = req.body.hostid;
    const from = Date.parse(req.body.from);
    const to = Date.parse(req.body.to);
    const headcount = Number(req.body.headcount);
    const introduction = req.body.introduction;
    const attendence = Number(req.body.attendence);

    const newcar = new activity.car_pools({
        title,
        hostid,
        from,
        to,
        headcount,
        introduction,
        attendence
    });
  
    newcar.save()
      .then(() => res.json('car added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/findByName').post((req, res) => {
    const title = req.body.title;
    activity.car_pools.findOne({title:title})
    .then((car) => {
        res.json(car);
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;