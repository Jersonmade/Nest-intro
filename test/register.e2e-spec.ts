/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  email: 'dima1@mail.ru',
  password: '1',
};

describe('RegisterController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - successed', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined;
      });
  });

  it('/auth/login (POST) - fail password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, password: '2'})
      .expect(401, {
			message: 'Invalid password',
			error: 'Unauthorized',
			statusCode: 401,
		});
  });

  it('/auth/login (POST) - fail email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, email: 'dima12@mail.ru'})
      .expect(401, {
			message: 'Пользователь не найден',
			error: 'Unauthorized',
			statusCode: 401,
		});
  });

  afterAll(() => {
    disconnect();
  });
});
