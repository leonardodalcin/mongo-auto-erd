import { Db } from 'mongodb';
export declare function getDB(connectURL?: string, databaseName?: string): Promise<Db>;
