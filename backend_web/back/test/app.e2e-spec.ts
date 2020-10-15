import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from '../src/companies/companies.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { join } from 'path';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: join(__dirname, '..', '..', 'backend_base.sqlite3'),
          entities: [__dirname + '/../src/**/*.entity.ts'],
        }),
        CompaniesModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should return specified limit values', () => {
    return request(app.getHttpServer())
      .get('/companies?limit=10')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => expect(res.body.result.length).toEqual(10));
  });

  it('should give symetric answers for matches', async () => {
    const res1 = await request(app.getHttpServer())
      .get('/companies/82/matches')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => expect(res.body.result.length).toBeGreaterThan(0));
    const id = res1.body.result[0].id;

    const res2 = await request(app.getHttpServer())
      .get(`/companies/${id}/matches`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => expect(res.body.result.length).toBeGreaterThan(0));

    expect(
      (res2.body.result as Array<any>).find(m => m.id === 82),
    ).toBeDefined();
  });
});
