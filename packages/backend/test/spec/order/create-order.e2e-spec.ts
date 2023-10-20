import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import request from 'supertest';
import { orderBuilder } from './order.e2e-builder';

describe('create order', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return the order created', async () => {
        const order = orderBuilder().build();
        const response = await request(app.getHttpServer())
            .post('/api/orders/')
            .send(order);
        expect(response.status).toEqual(201);
        expect(new Date(response.body.createdAt)).toEqual(order.createdAt);
        expect(response.body.customer).toEqual(order.customer);
        expect(response.body.status).toEqual(order.status);
        expect(new Date(response.body.updatedAt)).toEqual(order.updatedAt);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
}
);