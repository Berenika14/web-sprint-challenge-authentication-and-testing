const db = require("../../data/dbConfig");

const findUser = async (username) => {
  let result = await db("users").where("username", username);
  return result;
};
const findById = async (id) => {
  let [result] = await db("users").where("id", id);
  return result;
};

const create = async (body) => {
  let result = await db("users").insert(body);
  let user = findById(result);
  return user;
};
module.exports = {
  findUser,
  findById,
  create,
};
