const router = require('express').Router();

let activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    activity.shoppings.find()
    .then((sport) => {
        res.json(sport);
    })
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const title = 'shoppings:'+req.body.title;
    const hostid = req.body.hostid;
    const from = Date.parse(req.body.from);
    const to = Date.parse(req.body.to);
    const headcount = Number(req.body.headcount);
    const introduction = req.body.introduction;
    const attendence = Number(req.body.attendence);

    const newshopping = new activity.shoppings({
        title,
        hostid,
        from,
        to,
        headcount,
        introduction,
        attendence
    });
  
    newshopping.save()
      .then(() => res.json('shoppings added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/findByName').post((req, res) => {
    const title = req.body.title;
    activity.shoppings.findOne({title:title})
    .then((shopping) => {
        res.json(shopping);
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;