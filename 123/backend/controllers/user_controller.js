const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');



exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email }).select('+password');
  
  if (!user){
    return res.json("Incorrect_email");
  }
  console.log(user.password);
  console.log(password);
  const correct = password === user.password;
  if(!correct){
    return res.json("Incorrect_password");
  }
  else{
    return res.json('login_success');
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

exports.get = async(req, res) => {
  const id = req.query._id;
  const user = await User.find({_id : id});
  if(!user)
  {
    return res.json("Incorrect_email");
  }
  else
  {
    return res.json(user);
  }
}

