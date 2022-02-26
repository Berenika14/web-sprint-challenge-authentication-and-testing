const db = require("../data/dbConfig");
const Users = require("./auth/auth-model");
const request = require("supertest");
const server = require("./server");

// Write your tests here

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

test("we are using the correct environment", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("tests the users model", () => {
  test("the table is empty", async () => {
    const users = await db("users");
    expect(users).toHaveLength(0);
  });

  test("user can be inserted", async () => {
    const result = await Users.create({
      username: "foo",
      password: "bar",
    });
    expect(result).toEqual({ id: 1, username: "foo", password: "bar" });
    let users = await db("users");
    expect(users).toHaveLength(1);
  });

  test("can get user by a specific id", async () => {
    const insert = await Users.create({
      username: "foo",
      password: "bar",
    });
    expect(insert).toEqual({ id: 1, username: "foo", password: "bar" });
    const result = await Users.findById(1);
    expect(result).toEqual({ id: 1, username: "foo", password: "bar" });
  });
});
