const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');



exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email }).select('+password');
  
  if (!user){
    return res.json({status: "Incorrect_email", user_id: 0});
  }
  console.log(user.password);
  console.log(password);
  const correct = password === user.password;
  if(!correct){
    return res.json({status: "Incorrect_password", user_id: 0});
  }
  else{
    return res.json({status: 'login_success', user_id: user._id});
  }
//   bcrypt.compare(password, user.password, (err, data) => {
//     //if error than throw error
//     if (err) throw err

//     //if both match than you can do anything
    
//     if (data) {
//         return res.status(200).json({ msg: "Login success" })
//     } else {
//         return res.status(401).json({ msg: "Invalid credencial" })
//     }

// })
   
  
    
};

exports.add = async(req, res) => {
  const username = req.body.username;
  const gender = Boolean(req.body.gender);
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const old = Number(req.body.old);
  const intro = req.body.intro;
  const score = Number(req.body.score);
  const newUser = new User({username, gender, phone, email, password, old, intro, score});

  newUser.save()
    .then(() => res.json('200'))
    .catch(err => res.json('400'));
};
