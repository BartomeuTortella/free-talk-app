import request from 'supertest';
import { app } from '../../../app.js';

it('Should return a current user property', async () => {

    const cookie = await global.signin();

    if (cookie) {
        const res = await request(app)
            .get('/current-user')
            .set('Cookie', cookie)
            .send()
            .expect(200);

        expect(res.body.currentUser.email).toEqual('email@email.com');
    }


});