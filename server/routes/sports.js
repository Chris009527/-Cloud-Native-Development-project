const router = require('express').Router();

let activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    activity.sports.find()
    .then((sport) => {
        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: '}));
});

router.route('/add').post((req, res) => {
    const title = 'sports:'+req.body.title;
    const hostid = req.body.hostid;
    const from = Date.parse(req.body.from);
    const to = Date.parse(req.body.to);
    const headcount = Number(req.body.headcount);
    const introduction = req.body.introduction;
    const attendence = Number(req.body.attendence);

    const newsport = new activity.sports({
        title,
        hostid,
        from,
        to,
        headcount,
        introduction,
        attendence
    });
  
    newsport.save()
      .then(() => res.json('Sport added!'))
      .catch(err => res.status(400).json({error:
        'Error: Please make sure\n'+
        '    1) all required information had been filled\n'+
        '    2) title of activity is unique.'}));
  });
  router.route('/findByName').post((req, res) => {
    const title = req.body.title;
    activity.sports.findOne({title:title})
    .then((sport) => {
        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
});

router.route('/check_participate').post((req, res) => {
    const title = req.body.title;
    activity.sports.findOne({title:title})
    .then((sport) => {
        const from = new Date(sport.from);
        const to = new Date(sport.to);
        const now = new Date();

        if (sport.attendence >= sport.headcount )
        {
            res.status(400).json({error:'Error: exceed max headcount.'});
        }
        else if(now < from || now > to)
        {
            res.status(400).json({error:'Error: Not in the time range.'});
        }
        else res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/participate').post((req, res) => {
    const title = req.body.title;
    activity.sports.findOne({title:title})
    .then((sport) => {

        sport.attendence += 1;
        sport.save();
        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/withdraw').post((req, res) => {
    const title = req.body.title;
    activity.sports.findOne({title:title})
    .then((sport) => {

        sport.attendence -= 1;
        sport.save();
        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

module.exports = router;