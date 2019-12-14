import { DefaultCrudRepository } from '@loopback/repository';
import { UserCredentials, UserCredentialsRelations } from '../models';
import { MongoDataSource } from '../datasources';
export declare class UserCredentialsRepository extends DefaultCrudRepository<UserCredentials, typeof UserCredentials.prototype.id, UserCredentialsRelations> {
    constructor(dataSource: MongoDataSource);
}
