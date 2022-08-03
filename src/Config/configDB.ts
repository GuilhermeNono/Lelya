import { DBSettings } from "src/Interfaces/IConfigs";
import * as dotenv from 'dotenv'
dotenv.config();

export const Settings: DBSettings = {
 MongoURI: String(process.env["MONGODB_LOGIN"])
}