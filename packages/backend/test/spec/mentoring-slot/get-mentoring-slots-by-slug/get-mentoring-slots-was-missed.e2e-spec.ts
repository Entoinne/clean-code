import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { mentoringSlotBuilder } from '../mentoring-slot.e2e-builder';
import { givenExistingMentoringSlot } from '../mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Mentoring Slots By Slug ', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    // beforeAll est fonction mise à dispo par Vitest (framework de test)
    // qui sera executée avant tous les tests
    // permet de créer l'application et la connection à la base de données
    // et les stocker dans des variables globales (dispos pour tous les tests de ce fichier)
    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return 404 if Mentoring Slots by slug does not exist', async () => {
        const getMentoringSlotsBySlugResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/by-slug/Jean-Michel');
        expect(getMentoringSlotsBySlugResponse.status).toBe(404);
    });

    it('should return mentoring slot by slug if slug exist', async () => {
        const mentoringSlot = mentoringSlotBuilder().build();
        const mentoringSlotInDb = await givenExistingMentoringSlot(connection, mentoringSlot);

        const getMentoringSlotsBySlugResponse = await request(app.getHttpServer()).get(`/api/mentoring-slots/by-slug/${mentoringSlotInDb.slug}`);
        expect(getMentoringSlotsBySlugResponse.status).toBe(200);

        expect(getMentoringSlotsBySlugResponse.body.id).toEqual(mentoringSlotInDb.id);
        expect(getMentoringSlotsBySlugResponse.body.startDate).toEqual(mentoringSlotInDb.startDate);
        expect(getMentoringSlotsBySlugResponse.body.endDate).toEqual(mentoringSlotInDb.endDate);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
});
