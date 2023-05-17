const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../main');
const db = require('../data/db_utils');

describe('Auth Test', () => {

    after(() => {
        // Stop the server after running the tests
        process.exit();
    });

    describe('POST /register', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should insert a new user into the database', async () => {
            const newUser = {
                username: "user",
                first_name: "user",
                last_name: "user",
                password: "User123",
                email: "user@user.com"
            };

            const getUserStub = sinon.stub(db, 'execQuery');
            getUserStub.onCall(0).resolves([]); // First call resolves with null (user does not exist)
            getUserStub.onCall(1).resolves({insertId:'1'}); // Second call resolves with the mock user
            getUserStub.onCall(2).resolves();

            const response = await request(app)
                .post('/auth/register')
                .send(newUser);

            assert.strictEqual(response.status, 201);
            assert.deepStrictEqual(response.body.message,  "new user created");
            assert.deepStrictEqual(response.body.success,  true);
        });
    });
});
