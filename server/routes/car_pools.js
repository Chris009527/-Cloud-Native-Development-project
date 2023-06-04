const router = require('express').Router();

let activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    activity.car_pools.find()
    .then((car) => {
        switch(req.query.filter)
        {
            case "popular":
                car.sort((a, b) => b.attendence - a.attendence);
                break;
            case "startTime":
                car.sort((a, b) => new Date(b.from) - new Date(a.from));
                break;
            case "recent":
                car.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            default :
                ;
        }
        res.json(car);
    })
    .catch(err => res.status(400).json({error:'Error: '}));
});

router.route('/add').post((req, res) => {
    const title = 'car_pools:'+req.body.title;
    const hostid = req.body.hostid;
    const hostname = req.body.hostname;
    const from = req.body.from;
    const to = req.body.to;
    const headcount = Number(req.body.headcount);
    const introduction = req.body.introduction;
    const attendence = Number(req.body.attendence);

    const newcar = new activity.car_pools({
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
   else newcar.save()
      .then(() => res.json('car added!'))
      .catch(err => res.status(400).json({error:
        'Error: Please make sure\n'+
        '    1) all required information had been filled\n'+
        '    2) title of activity is unique.' }));
  });

  router.route('/findByName').post((req, res) => {
    const title = req.body.title;
    activity.car_pools.findOne({title:title})
    .then((car) => {
        res.json(car);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
});

router.route('/check_participate').post((req, res) => {
    const title = req.body.title;
    activity.car_pools.findOne({title:title})
    .then((car) => {
        const from = new Date(car.from);
        const to = new Date(car.to);
        const now = new Date();

        if (car.attendence >= car.headcount )
        {
            res.status(400).json({error:'Error: exceed max headcount.'});
        }
        else if(now > to)
        {
            res.status(400).json({error:'Error: Not in the time range.'});
        }
        else res.json(car);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/participate').post((req, res) => {
    const title = req.body.title;
    activity.car_pools.findOne({title:title})
    .then((car) => {

        car.attendence += 1;
        car.save();
        res.json(car);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/withdraw').post((req, res) => {
    const title = req.body.title;
    activity.car_pools.findOne({title:title})
    .then((car) => {

        car.attendence -= 1;
        car.save();
        res.json(car);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/search').post((req, res) => {
    const title = req.body.title;
    activity.car_pools.findOne({title:title})
    .then((car) => {
        res.json(car);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

module.exports = router;