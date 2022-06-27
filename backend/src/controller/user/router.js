const express = require('express');
const User = require('../../model/user.model');
const controller = require('../base/controller')(User);

const router = express.Router();

// create
router.post('/', async (req, res, next) => {
    const { username } = req.body;
    // console.log({username});

    const user = await User.findOne({ username });

    console.log(user);
    if (user) {
        // console.log('username | van már ilyen user bejedzés');
        return res.sendStatus(401);
    }

    return controller.create(req, res, next);
  });

// search
router.get('/search', (req, res, next) => {
  return controller.search(req, res, next);
});

// get
router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
});

// get one
router.get('/:id', (req, res, next) => {
  console.log('getOne works');
  return controller.findOne(req, res, next);
});

// patch - update
router.patch('/:id', (req, res, next) => {
    return controller.updateOne(req, res, next);
});

// delete
router.delete('/:id', (req, res, next) => {
  return controller.delete(req, res, next);
});


module.exports = router;

/*
// POST - create

fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: 'Jack',
      last_name: 'London',
      email: 'jl@gmail.com',
      password: 'test2',
      role: 1,
      username: 'Logo'
    })
  }).then(r => r.json())
  .then(d => console.log(d));


// GET
fetch('http://localhost:3000/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
  .then(d => console.log(d));


*/