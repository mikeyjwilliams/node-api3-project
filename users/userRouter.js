const express = require('express');
const router = express.Router();
const userDb = require('./userDb');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'invalid user id' });
      }
    })
    .catch(err => {
      next(err);
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: 'missing user data' });
  }

  if (!req.body.name) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: 'missing post data' });
  }
  if (!req.body.text) {
    return res.status(400).json({ message: 'missing required text field' });
  }
  next();
}

module.exports = router;
