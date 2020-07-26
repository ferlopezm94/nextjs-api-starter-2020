/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserModel } from './../model';
import { closeDatabase, createMocks, setupDatabase, userOne } from './../../../fixtures';
import handler from './../../../pages/api/v1/users';

describe('/v1/users', () => {
  const { req, res } = createMocks();

  beforeEach(setupDatabase);
  afterAll(closeDatabase);

  test('Should create a new user', async () => {
    req.method = 'POST';
    req.body = {
      name: 'John',
      email: 'john2@test.com',
    };

    const response = await handler(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(response).toMatchObject({
      name: 'John',
      email: 'john2@test.com',
    });

    // @ts-ignore
    const user = await UserModel.findById(response._id);
    expect(user).not.toBeNull();
  });

  test('Should not create a new user with missing data', async () => {
    req.method = 'POST';
    req.body = {
      name: 'John',
    };

    const response = await handler(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('error');

    // @ts-ignore
    const user = await UserModel.findById(response._id);
    expect(user).toBeNull();
  });

  test('Should get all users', async () => {
    req.method = 'GET';
    const response = await handler(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(response).toHaveLength(1);
    expect(response).toMatchObject([userOne]);
  });
});
