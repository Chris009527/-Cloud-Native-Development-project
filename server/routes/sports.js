const router = require('express').Router();

let activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    activity.sports.find()
    .then((sport) => {
        switch(req.query.filter)
        {
            case "popular":
                sport.sort((a, b) => b.attendence - a.attendence);
                break;
            case "startTime":
                sport.sort((a, b) => new Date(b.from) - new Date(a.from));
                break;
            case "recent":
                sport.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            default :
                ;
        }
        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: '}));
});

router.route('/add').post((req, res) => {
    const title = 'sports:'+req.body.title;
    const hostid = req.body.hostid;
    const hostname = req.body.hostname;
    const from = req.body.from;
    const to = req.body.to;
    const headcount = Number(req.body.headcount);
    const introduction = req.body.introduction;
    const attendence = Number(req.body.attendence);
    const member = req.body.member;

    const newsport = new activity.sports({
        title,
        hostid,
        hostname,
        from,
        to,
        headcount,
        introduction,
        attendence,
        member
    });
  
    if(headcount <= 0)
   {
        return res.status(400).json({error:"Error: headcount should be > 0"});
   }
   else if(new Date(from) >= new Date(to))
   {
        return res.status(400).json({error:"Error: fromTime should earlier than toTime"});
   }
    else newsport.save()
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
        else if(now > to)
        {
            res.status(400).json({error:'Error: Not in the time range.'});
        }
        else res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/participate').post((req, res) => {
    const title = req.body.title;
    const member = {
        name : req.body.name,
        email : req.body.email
    }
    activity.sports.findOne({title:title})
    .then((sport) => {
        sport.member.push(member);
        sport.attendence += 1;
        sport.save();
        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/withdraw').post((req, res) => {
    const title = req.body.title;
    const username = req.body.username;
    activity.sports.findOne({title:title})
    .then((sport) => {
        sport.member.splice(sport.member.findIndex(o => o.name === username), 1);
        sport.attendence -= 1;
        sport.save();
        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

router.route('/search').post((req, res) => {
    const title = req.body.title;
    activity.sports.findOne({title:title})
    .then((sport) => {

        res.json(sport);
    })
    .catch(err => res.status(400).json({error:'Error: activity not found.'}));
})

module.exports = router;