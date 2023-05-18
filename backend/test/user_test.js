const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../main');
const db = require('../data/db_utils');
const bcrypt = require("bcryptjs");

describe('User Test', () => {

    after(() => {
        // Stop the server after running the tests
        process.exit();
    });

    afterEach(() => {
        sinon.restore();
    });

    app.request.session = { user_id: 1 }
    const user = {
        user_id:1, username:'user1', first_name:'user', last_name:'user', password:'User123', email:'user1@user.com',
        score:0, gender:1, year_of_birth:1990, height:165, weight:60, kosher:0, vegetarian:0, vegan:0, gluten_free:0,
        without_lactose:0, physical_activity:"active", EER:2000, replace_score:0, login_score:0,
    };

    describe('GET /getGlobalDetails', () => {

        let userGlobalDetails = {
            first_name: 'user',
            total_score: 0,
            EER: 2000,
            kosher: 0,
            vegetarian: 0,
            vegan: 0,
            gluten_free: 0,
            without_lactose: 0,
            badges: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            favorites: []
        }

        const badges = {
            '5c':0,'15c':0,'30c':0,'50c':0,'80c':0,'120c':0,
                '10p':0,'50p':0,'100p':0,'200p':0,'500p':0,'1000p':0,
                '2l':0,'4l':0,'7l':0,'10l':0,'14l':0,'20l':0
        }

        it('should return user global details', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([user]);
            execQueryStub.onCall(2).resolves([badges]);
            execQueryStub.onCall(3).resolves([]);

            const response = await request(app).get('/user/getGlobalDetails').send();
            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body,  userGlobalDetails);
        });

        it('should respond with an error if user does not exist', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([]);

            const response = await request(app).get('/user/getGlobalDetails').send();
            assert.strictEqual(response.status, 404);
            assert.deepStrictEqual(response.body.message,  "user doesn't exist");
            assert.strictEqual(response.body.success,  false);
        });

        it('should respond with an error if user does not have preferences', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([{user_id:1, EER: null}]);

            const response = await request(app).get('/user/getGlobalDetails').send();
            assert.strictEqual(response.status, 404);
            assert.deepStrictEqual(response.body.message,  "login without preferences");
            assert.strictEqual(response.body.success,  false);

        });

        it('should respond with an error if user does not have badges', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([user]);
            execQueryStub.onCall(2).resolves([]);

            const response = await request(app).get('/user/getGlobalDetails').send(user);
            assert.strictEqual(response.status, 404);
            assert.deepStrictEqual(response.body.message,  "badges doesn't exist for user");
            assert.strictEqual(response.body.success,  false);
        });
    });

    describe('POST /updatePreferences', () => {

        it('should update user preferences', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([]);

            const response = await request(app).post('/user/updatePreferences').send(user);
            assert.strictEqual(response.status, 202);
            assert.deepStrictEqual(response.body.message,  "user preferences updated successfully");
            assert.strictEqual(response.body.success,  true);
        });
    });

    describe('GET /getPreferences', () => {

        it('should return user preferences', async () => {

            const preferences = {
                gender: 1,
                year_of_birth: 1990,
                height: 165,
                weight: 60,
                physical_activity:"active",
                kosher: 0,
                vegetarian: 0,
                vegan: 0,
                gluten_free: 0,
                without_lactose: 0,
                EER: 2000,
                login_score: 0
            }
            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([preferences]);

            const response = await request(app).get('/user/getPreferences').send();
            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body,  preferences);
        });

        it('should respond with an error if user does not exist', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([]);

            const response = await request(app).get('/user/getPreferences').send();
            assert.strictEqual(response.status, 404);
            assert.deepStrictEqual(response.body.message, "user doesn't exist");
            assert.strictEqual(response.body.success,  false);
        });
    });

    describe('POST /updatePassword', () => {

        it('should update user password', async () => {

            const body = {
                old_pass: "User123",
                new_pass: "User321"
            }
            let hash_password = bcrypt.hashSync(user.password, parseInt(process.env.bcrypt_saltRounds));

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([{password:hash_password}]);
            execQueryStub.onCall(2).resolves();

            const response = await request(app).post('/user/updatePassword').send(body);
            assert.strictEqual(response.status, 202);
            assert.deepStrictEqual(response.body.message,  "password updated successfully");
            assert.strictEqual(response.body.success,  true);

        });

        it('should respond with an error if user does not exist', async () => {

            const body = {
                old_pass: "User123",
                new_pass: "User321"
            }

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([]);

            const response = await request(app).post('/user/updatePassword').send(body);
            assert.strictEqual(response.status, 403);
            assert.deepStrictEqual(response.body.message,  "password incorrect");
            assert.strictEqual(response.body.success,  false);
        });

        it('should respond with an error if password is incorrect', async () => {

            const body = {
                old_pass: "User321",
                new_pass: "User123"
            }
            let hash_password = bcrypt.hashSync(user.password, parseInt(process.env.bcrypt_saltRounds));

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([{password:hash_password}]);

            const response = await request(app).post('/user/updatePassword').send(body);
            assert.strictEqual(response.status, 403);
            assert.deepStrictEqual(response.body.message,  "password incorrect");
            assert.strictEqual(response.body.success,  false);
        });
    });

    describe('GET /getUserDetails', () => {

        it('should return user details', async () => {

            const userDetails = {
                first_name: 'user',
                last_name: 'user',
                email: 'user1@user.com'
            }
            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([user]);

            const response = await request(app).get('/user/getUserDetails').send();
            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body,  userDetails);
        });

        it('should respond with an error if user does not exist', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([]);

            const response = await request(app).get('/user/getUserDetails').send();
            assert.strictEqual(response.status, 404);
            assert.deepStrictEqual(response.body.message, "user doesn't exist");
            assert.strictEqual(response.body.success,  false);
        });
    });

    describe('POST /updateUserDetails', () => {

        let userDetails = {
            first_name: 'user',
            last_name: 'user',
            email: 'user1@user.com'
        }

        it('should update the user details when the email has not changed', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([user]);
            execQueryStub.onCall(2).resolves();

            const response = await request(app).post('/user/updateUserDetails').send(userDetails);
            assert.strictEqual(response.status, 202);
            assert.deepStrictEqual(response.body.message,  "user details updated successfully");
        });

        it('should UPDATE the user details when the email has changed', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([]);
            execQueryStub.onCall(2).resolves([]);

            const response = await request(app).post('/user/updateUserDetails').send(userDetails);
            assert.strictEqual(response.status, 202);
            assert.deepStrictEqual(response.body.message, "user details updated successfully");
            assert.strictEqual(response.body.success,  true);
        });

        it('should respond with an error if new email already exist', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            let user2 = {user_id:2, email:"user1@user.com"}
            execQueryStub.onCall(1).resolves([user2]);

            const response = await request(app).post('/user/updateUserDetails').send(userDetails);
            assert.strictEqual(response.status, 412);
            assert.deepStrictEqual(response.body.message, "email already exists");
            assert.strictEqual(response.body.success,  false);
        });


    });
});
