const request = require('supertest');
const app = require('./app'); 


test('POST /signup should create user', async () => {
  const res = await request(app)
    .post('/signup')
    .send({
      username: 'testuser',
      password: '1234'
    });

  expect(res.statusCode).toBe(200);
});


test('POST /login should authenticate user', async () => {
  const res = await request(app)
    .post('/login')
    .send({
      username: 'testuser',
      password: '1234'
    });

  expect(res.statusCode).toBe(200);
});

test('GET /tasks should return task list', async () => {
  const res = await request(app).get('/tasks?username=testuser');

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});