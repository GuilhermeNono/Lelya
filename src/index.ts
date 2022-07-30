import { Bot } from './Client/Client';
import 'reflect-metadata';
import { Container } from "typedi";
import * as dotenv from 'dotenv'

dotenv.config();

Container.get<Bot>(Bot)
