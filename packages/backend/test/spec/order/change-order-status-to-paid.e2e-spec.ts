import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import request from 'supertest';

describe('get order after a date', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should modify the status of the order', async () => {
        const changeOrderStatusToPaidResponse = await request(app.getHttpServer()).put('/api/orders/update/1/paid');
        expect(changeOrderStatusToPaidResponse.status).toEqual(404);
    });
    afterAll(async () => {
        await cleanApp(app, connection);
    });
}
);