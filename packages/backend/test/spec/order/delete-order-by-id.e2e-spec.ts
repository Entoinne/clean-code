import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import request from 'supertest';
import { orderBuilder } from './order.e2e-builder';
import { givenExistingOrder } from './order.e2e-fixture';
import { get } from 'http';

describe('delete order by id', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('shouldnt return the deleted order', async () => {
        const order = orderBuilder().build();
        const orderInDb = await givenExistingOrder(connection, order);
        const getOrderResponse = await request(app.getHttpServer()).get(`/api/orders/${orderInDb.customer}`);
        expect(orderInDb.customer).toEqual(order.customer);
        expect(getOrderResponse.status).toEqual(200);
        const deleteOrderByIdResponse = await request(app.getHttpServer()).get('/api/orders/delete/1');
        expect(deleteOrderByIdResponse.status).toEqual(404);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
}
);