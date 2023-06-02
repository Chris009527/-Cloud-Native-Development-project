const router = require('express').Router();

let activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    activity.travels.find()
    .then((sport) => {
        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: '}));
});

router.route('/add').post((req, res) => {
    const title = 'travels:'+req.body.title;
    const hostid = req.body.hostid;
    const from = Date.parse(req.body.from);
    const to = Date.parse(req.body.to);
    const headcount = Number(req.body.headcount);
    const introduction = req.body.introduction;
    const attendence = Number(req.body.attendence);

    const newtravel = new activity.travels({
        title,
        hostid,
        from,
        to,
        headcount,
        introduction,
        attendence
    });
  
    newtravel.save()
      .then(() => res.json('travel added!'))
      .catch(err => res.status(400).json({error:
        'Error: Please make sure\n'+
        '    1) all required information had been filled\n'+
        '    2) title of activity is unique.' }));
  });
  router.route('/findByName').post((req, res) => {
    const title = req.body.title;
    activity.travels.findOne({title:title})
    .then((travel) => {
        res.json(travel);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
});

router.route('/check_participate').post((req, res) => {
    const title = req.body.title;
    activity.travels.findOne({title:title})
    .then((travel) => {
        if (travel.attendence < travel.headcount)
        {
            res.json(travel);
        }
        else return res.status(400).json({error:'Error: exceed max headcount.'});
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/participate').post((req, res) => {
    const title = req.body.title;
    activity.travels.findOne({title:title})
    .then((travel) => {

        travel.attendence += 1;
        travel.save();
        res.json(travel);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/withdraw').post((req, res) => {
    const title = req.body.title;
    activity.travels.findOne({title:title})
    .then((travel) => {

        travel.attendence -= 1;
        travel.save();
        res.json(travel);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

module.exports = router;