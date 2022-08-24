import { Db, InsertOneResult } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class Migration1647528152600 implements MigrationInterface {
    public async up(db: Db): Promise<InsertOneResult<Document>> {
        const collection = await db.createCollection('newCollection');

        return collection.insertOne({
            name: 'Pablo',
            age: 24,
        });
    }

    public async down(db: Db): Promise<boolean> {
        return db.dropDatabase();
    }
}