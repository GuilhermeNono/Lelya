import { mongoMigrateCli } from 'mongo-migrate-ts';
import 'dotenv/config';
import path from "path";

mongoMigrateCli({
    database: 'Lelya',
    migrationsDir: path.join(__dirname, "/migrations"),
    uri: process.env.MONGODB_LOGIN,
    migrationsCollection: 'migrations',
});