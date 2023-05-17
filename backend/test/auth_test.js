const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../main');
const db = require('../data/db_utils');
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');

describe('Auth Test', () => {

    after(() => {
        // Stop the server after running the tests
        process.exit();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('POST /register', () => {

        const newUser = {
            username: 'user1',
            first_name: 'user',
            last_name: 'user',
            password: 'User123',
            email: 'user1@user.com'
        };

        it('should insert a new user into the database', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([]);
            execQueryStub.onCall(1).resolves({insertId:'1'});
            execQueryStub.onCall(2).resolves();

            const response = await request(app)
                .post('/auth/register')
                .send(newUser);

            assert.strictEqual(response.status, 201);
            assert.deepStrictEqual(response.body.message,  "new user created");
            assert.deepStrictEqual(response.body.success,  true);
        });

        it('should respond with an error if username already exist', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{username:'user1', email:'user2@user.com'}]);

            const response = await request(app)
                .post('/auth/register')
                .send(newUser);

            assert.strictEqual(response.status, 409);
            assert.deepStrictEqual(response.body.message,  "username already exists");
            assert.deepStrictEqual(response.body.success,  false);
        });

        it('should respond with an error if email already exist', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{username:'user2', email:'user1@user.com'}]);

            const response = await request(app)
                .post('/auth/register')
                .send(newUser);

            assert.strictEqual(response.status, 412);
            assert.deepStrictEqual(response.body.message,  "email already exists");
            assert.deepStrictEqual(response.body.success,  false);
        });
    });

    describe('POST /login', () => {

        const user = {
            username: 'user1',
            password: 'User123',
        };

        it('should login a user without preferences', async () => {

            let hash_password = bcrypt.hashSync(user.password, parseInt(process.env.bcrypt_saltRounds));
            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1, username:'user1', password:hash_password, EER:null}]);

            const response = await request(app)
                .post('/auth/login')
                .send(user);

            assert.strictEqual(response.status, 202);
            assert.deepStrictEqual(response.body.message,  "login without preferences");
            assert.deepStrictEqual(response.body.success,  true);
        });

         it('should login a user successfully with preferences', async () => {

            let hash_password = bcrypt.hashSync(user.password, parseInt(process.env.bcrypt_saltRounds));
            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1, username:'user1', password:hash_password, EER:2000}]);

            const response = await request(app)
                .post('/auth/login')
                .send(user);

            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body.message,  "successful login");
            assert.deepStrictEqual(response.body.success,  true);
        });

        it('should respond with an error if password incorrect', async () => {

            let hash_password = bcrypt.hashSync('User321', parseInt(process.env.bcrypt_saltRounds));
            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1, username:'user1', password:hash_password, EER:null}]);

            const response = await request(app)
                .post('/auth/login')
                .send(user);

            assert.strictEqual(response.status, 403);
            assert.deepStrictEqual(response.body.message,  "username or password incorrect");
            assert.deepStrictEqual(response.body.success,  false);
        });

        it('should respond with an error if username do not exist', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([]);

            const response = await request(app)
                .post('/auth/login')
                .send(user);

            assert.strictEqual(response.status, 403);
            assert.deepStrictEqual(response.body.message,  "username or password incorrect");
            assert.deepStrictEqual(response.body.success,  false);
        });
    });

    describe('POST /logout', () => {

        it('should logout a user successfully', async () => {
            app.request.session = { user_id: 1 }
            app.request.session.reset = () => { app.request.session = null};

            const response = await request(app)
                .post('/auth/logout')
                .send()

            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body.message,  "successful logout");
            assert.deepStrictEqual(response.body.success,  true);
            assert.deepStrictEqual( app.request.session,  null);
        });

        it('should respond with an error if no user is logged in', async () => {

            const response = await request(app)
                .post('/auth/logout')
                .send()

            assert.strictEqual(response.status, 419);
            assert.deepStrictEqual(response.body.message,  "no user is logged in");
            assert.deepStrictEqual(response.body.success,  false);
        });
    });

    describe('POST /forgotPassword', () => {

        const email = {email:'user1@user.com'}

        it('should generate code and send an email', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{email:'user1@user.com', first_name:'user'}]);
            execQueryStub.onCall(1).resolves();
            const sgMailStub = sinon.stub(sgMail, 'send');
            sgMailStub.onCall(0).resolves(true);

            const response = await request(app)
                .post('/auth/forgotPassword')
                .send(email)

            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body.message,  "successfully sent verification code to email");
            assert.deepStrictEqual(response.body.success,  true);
        });

        it('should respond with an error if email not exist', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([]);

            const response = await request(app)
                .post('/auth/forgotPassword')
                .send(email)

            assert.strictEqual(response.status, 403);
            assert.deepStrictEqual(response.body.message,  "email doesn't exists");
            assert.deepStrictEqual(response.body.success,  false);
        });

        it('should respond with an error if failed to send an email', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{email:'user1@user.com', first_name:'user'}]);
            execQueryStub.onCall(1).resolves();

            const sgMailStub = sinon.stub(sgMail, 'send');
            sgMailStub.onCall(0).resolves(false);

            const response = await request(app)
                .post('/auth/forgotPassword')
                .send(email)

            assert.strictEqual(response.status, 400);
            assert.deepStrictEqual(response.body.message,  "failed to send an email");
            assert.deepStrictEqual(response.body.success,  false);
        });
    });

    describe('POST /verifyResetPasswordCode', () => {

        const body = {
            email:'user1@user.com',
            code: 123456
        }

        it('should verify a code with ok expiry time', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{expiryTime:Math.floor(Date.now() / 1000) }]);
            execQueryStub.onCall(1).resolves();

            const response = await request(app)
                .post('/auth/verifyResetPasswordCode')
                .send(body)

            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body.message,  "verification code is correct");
            assert.deepStrictEqual(response.body.success,  true);
        });

        it('should respond with an error if the code has expired', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{expiryTime:Math.floor(Date.now() / 1000 - 600) }]);
            execQueryStub.onCall(1).resolves();

            const response = await request(app)
                .post('/auth/verifyResetPasswordCode')
                .send(body)

            assert.strictEqual(response.status, 401);
            assert.deepStrictEqual(response.body.message,  "verification code expired");
            assert.deepStrictEqual(response.body.success,  false);
        });

        it('should respond with an error if the code is incorrect', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([]);

            const response = await request(app)
                .post('/auth/verifyResetPasswordCode')
                .send(body)

            assert.strictEqual(response.status, 408);
            assert.deepStrictEqual(response.body.message,  "verification code is incorrect");
            assert.deepStrictEqual(response.body.success,  false);
        });
    });

    describe('POST /resetPassword', () => {

        const body = {
            email:'user1@user.com',
            newPassword: "User321"
        }

        it('should update the new password', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves();

            const response = await request(app)
                .post('/auth/resetPassword')
                .send(body)

            assert.strictEqual(response.status, 202);
            assert.deepStrictEqual(response.body.message,  "password updated successfully");
            assert.deepStrictEqual(response.body.success,  true);
        });
    });

});
