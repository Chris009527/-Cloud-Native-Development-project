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
  const actname = [];

  const newParticipate = new Participate({userid, actname});

  newParticipate.save()
    .then(() => res.json('new Participate added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update', ParticipateController.update);
router.post('/withdraw', ParticipateController.withdraw);
router.post('/findByUser', ParticipateController.findByUser);
module.exports = router;