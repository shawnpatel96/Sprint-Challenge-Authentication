const router = require("express").Router();
const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require('./secrets');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(user=>res.status(201).json(user))
    .catch(err=>{
      res.status(500).json(err)
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); 
        res.status(200).json({
          message: `Welcome ${user.username}!`,token});
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });


});

module.exports = router;

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, jwtSecret, options)
}