const router = require('express').Router();

let activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    activity.travels.find()
    .then((travel) => {
        switch(req.query.filter)
        {
            case "popular":
                travel.sort((a, b) => b.attendence - a.attendence);
                break;
            case "startTime":
                travel.sort((a, b) => new Date(b.from) - new Date(a.from));
                break;
            case "recent":
                travel.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            default :
                ;
        }
        res.json(travel);
    })
    .catch(err => res.status(400).json({error:'Error: '}));
});

router.route('/add').post((req, res) => {
    const title = 'travels:'+req.body.title;
    const hostid = req.body.hostid;
    const hostname = req.body.hostname;
    const from = req.body.from;
    const to = req.body.to;
    const headcount = Number(req.body.headcount);
    const introduction = req.body.introduction;
    const attendence = Number(req.body.attendence);

    const newtravel = new activity.travels({
        title,
        hostid,
        hostname,
        from,
        to,
        headcount,
        introduction,
        attendence
    });
  
    if(headcount <= 0)
   {
        return res.status(400).json({error:"Error: headcount should be > 0"});
   }
   else if(new Date(from) >= new Date(to))
   {
        return res.status(400).json({error:"Error: fromTime should earlier than toTime"});
   }
    else newtravel.save()
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
        const from = new Date(travel.from);
        const to = new Date(travel.to);
        const now = new Date();

        if (travel.attendence >= travel.headcount )
        {
            res.status(400).json({error:'Error: exceed max headcount.'});
        }
        else if(now > to)
        {
            res.status(400).json({error:'Error: Not in the time range.'});
        }
        else res.json(travel);
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