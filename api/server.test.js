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
});
