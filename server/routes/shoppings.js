const router = require('express').Router();

let activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    activity.shoppings.find()
    .then((shopping) => {
        switch(req.query.filter)
        {
            case "popular":
                shopping.sort((a, b) => b.attendence - a.attendence);
                break;
            case "startTime":
                shopping.sort((a, b) => new Date(b.from) - new Date(a.from));
                break;
            case "recent":
                shopping.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            default :
                ;
        }
        res.json(shopping);
    })
    .catch(err => res.status(400).json({error:'Error: '}));
});

router.route('/add').post((req, res) => {
    const title = 'shoppings:'+req.body.title;
    const hostid = req.body.hostid;
    const hostname = req.body.hostname;
    const from = req.body.from;
    const to = req.body.to;
    const headcount = Number(req.body.headcount);
    const introduction = req.body.introduction;
    const attendence = Number(req.body.attendence);

    const newshopping = new activity.shoppings({
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
    else newshopping.save()
      .then(() => res.json('shoppings added!'))
      .catch(err => res.status(400).json({error:
        'Error: Please make sure\n'+
        '    1) all required information had been filled\n'+
        '    2) title of activity is unique.' }));
  });
  router.route('/findByName').post((req, res) => {
    const title = req.body.title;
    activity.shoppings.findOne({title:title})
    .then((shopping) => {
        res.json(shopping);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
});

router.route('/check_participate').post((req, res) => {
    const title = req.body.title;
    activity.shoppings.findOne({title:title})
    .then((shopping) => {
        const from = new Date(shopping.from);
        const to = new Date(shopping.to);
        const now = new Date();

        if (shopping.attendence > shopping.headcount )
        {
            res.status(400).json({error:'Error: exceed max headcount.'});
        }
        else if(now > to)
        {
            res.status(400).json({error:'Error: Not in the time range.'});
        }
        else res.json(shopping);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/participate').post((req, res) => {
    const title = req.body.title;
    activity.shoppings.findOne({title:title})
    .then((shopping) => {

        shopping.attendence += 1;
        shopping.save();
        res.json(shopping);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/withdraw').post((req, res) => {
    const title = req.body.title;
    activity.shoppings.findOne({title:title})
    .then((shopping) => {

        shopping.attendence -= 1;
        shopping.save();
        res.json(shopping);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/search').post((req, res) => {
    const title = req.body.title;
    activity.shoppings.findOne({title:title})
    .then((shopping) => {
        
        res.json(shopping);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

module.exports = router;