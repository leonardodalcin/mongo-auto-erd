import { IEntity } from '@interfaces/IEntity';
export declare function getERD(mongoURI: string, databaseName: string, outfile?: string): Promise<IEntity[]>;
