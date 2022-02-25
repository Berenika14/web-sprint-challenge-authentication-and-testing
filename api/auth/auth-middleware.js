const Users = require("./auth-model");

function validateUser(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      status: 404,
      message: "username and password required",
    });
  } else {
    req.user = req.body;
    next();
  }
}
async function usernameIsUnique(req, res, next) {
  Users.findUser(req.user.username)
    .then((user) => {
      if (user.length > 0) {
        next({ status: 400, message: "username taken" });
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = {
  validateUser,
  usernameIsUnique,
};
