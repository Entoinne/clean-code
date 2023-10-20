import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import request from 'supertest';
import { orderBuilder } from './order.e2e-builder';
import { givenExistingOrder } from './order.e2e-fixture';

describe('get order after a date', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return all orders after a date', async () => {
        const order = orderBuilder().build();
        const orderInDb = await givenExistingOrder(connection, order);
        const getOrdersAfterDateResponse = await request(app.getHttpServer()).get('/api/orders/after-date/2023-10-22');
        expect(getOrdersAfterDateResponse.status).toEqual(200);
        expect(order.createdAt).toEqual(orderInDb.createdAt);
        expect(order.customer).toEqual(orderInDb.customer);
        expect(order.status).toEqual(orderInDb.status);
        expect(order.updatedAt).toEqual(orderInDb.updatedAt);
        expect(getOrdersAfterDateResponse.body.length).toEqual(1);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
}
);