const userDb = require('../users/userDb');

module.exports = userIdParam => {
  return (req, res, next) => {
    userDb
      .getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({ message: 'user ID not found' });
        }
      })
      .catch(err => {
        next(err);
      });
  };
};
