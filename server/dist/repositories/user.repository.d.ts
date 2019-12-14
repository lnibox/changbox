import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { User, UserRelations, UserCredentials } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { UserCredentialsRepository } from './user-credentials.repository';
export declare type Credentials = {
    email: string;
    password: string;
};
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
    protected userCredentialsRepository: Getter<UserCredentialsRepository>;
    readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
    constructor(dataSource: MongoDataSource, userCredentialsRepository: Getter<UserCredentialsRepository>);
}
