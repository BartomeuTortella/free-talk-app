import request from 'supertest';
import { app } from '../../../app.js';


it('Returns a 201 on successful signup', async () => {
    return request(app)
        .post('/signup')
        .send({
            email: 'email@email.com',
            password: 'password'
        })
        .expect(201);
});

it('Sets the cookie after successful signup', async () => {

    const res = await request(app)
        .post('/signup')
        .send({
            email: 'email@email.com'
            , password: 'password'
        })
        .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined();
});