
const router = require('express').Router();
const userController = require('../controllers/user_controller');
let User = require('../models/user.model');


router.post('/add', userController.add);
router.post('/login', userController.login);
router.get("/findByid", userController.findByid);
// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/login').post = async ((req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const user = await User.findOne({ email }).select('+password');
//   const correct = await bcrypt.compare(password, user.password);
//   if(!user || !correct){
//     res.status(401).json('Error: ' + "Incorrect email or password");
//   }
//   res.status(200).json('login success!');
    
// });

// router.route('/add').post((req, res) => {
//   const username = req.body.username;
//   const gender = Boolean(req.body.gender);
//   const phone = req.body.phone;
//   const email = req.body.email;
//   const password = req.body.password;
//   const old = Number(req.body.old);
//   const intro = req.body.intro;
//   const score = Number(req.body.score);
//   const newUser = new User({username, gender, phone, email, password, old, intro, score});

//   newUser.save()
//     .then(() => res.json('200'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;