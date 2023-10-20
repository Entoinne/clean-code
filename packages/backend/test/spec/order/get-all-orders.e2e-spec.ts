import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import request from 'supertest';
import { orderBuilder } from './order.e2e-builder';
import { givenExistingOrder } from './order.e2e-fixture';

describe('get all orders', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return all orders', async () => {
        const order = orderBuilder().build();
        const order2 = orderBuilder().build();
        const orderInDb = await givenExistingOrder(connection, order);
        const orderInDb2 = await givenExistingOrder(connection, order2);
        const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/all');
        expect(getAllOrdersResponse.status).toEqual(200);
        expect(order.createdAt).toEqual(orderInDb.createdAt);
        expect(order.customer).toEqual(orderInDb.customer);
        expect(order.status).toEqual(orderInDb.status);
        expect(order.updatedAt).toEqual(orderInDb.updatedAt);
        expect(order2.createdAt).toEqual(orderInDb2.createdAt);
        expect(order2.customer).toEqual(orderInDb2.customer);
        expect(order2.status).toEqual(orderInDb2.status);
        expect(order2.updatedAt).toEqual(orderInDb2.updatedAt);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
}
);