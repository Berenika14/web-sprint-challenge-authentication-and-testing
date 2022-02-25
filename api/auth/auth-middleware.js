const Users = require("./auth-model");

function validateUser(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      status: 404,
      message: " The client must provide username and password",
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
        next({ status: 400, message: "Username already exists" });
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
