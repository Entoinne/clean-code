import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import request from 'supertest';
import { orderBuilder } from './order.e2e-builder';
import { givenExistingOrder } from './order.e2e-fixture';

describe('get order with customer name', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return all orders of a customer', async () => {
        const order = orderBuilder().build();
        const orderInDb = await givenExistingOrder(connection, order);
        const order2 = orderBuilder().build();
        const orderInDb2 = await givenExistingOrder(connection, order2);
        const order3 = orderBuilder().build();
        const orderInDb3 = await givenExistingOrder(connection, order3);
        const getOrdersByCustomer = await request(app.getHttpServer()).get('/api/orders/customer');
        const getOrdersByCustomer1 = await request(app.getHttpServer()).get('/api/orders/jean-pierre1');
        expect(getOrdersByCustomer.status).toEqual(200);
        expect(getOrdersByCustomer.body.length).toEqual(3);
        expect(getOrdersByCustomer1.status).toEqual(500);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
}
);