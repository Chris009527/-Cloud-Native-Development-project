const router = require('express').Router();
let Participate = require('../models/participate.model');
let ParticipateController = require('../controller/participateController')

router.route('/').get((req, res) => {
    Participate.find()
    .then(participate => res.json(participate))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userid = req.body.userid;
  const actid = [];

  const newParticipate = new Participate({userid, actid});

  newParticipate.save()
    .then(() => res.json('new Participate added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update', ParticipateController.update);

module.exports = router;