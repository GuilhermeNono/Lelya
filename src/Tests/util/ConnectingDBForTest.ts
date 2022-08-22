import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export async function connectDBForTesting() {
    try {
        await mongoose.connect(process.env['MONGODB_TEST_LOGIN']!);
    } catch (error) {
        console.log("DB connect error");
    }
}

export async function disconnectDBForTesting() {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log("DB disconnect error");
    }
}