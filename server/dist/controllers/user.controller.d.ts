import { Count, Filter, Where } from '@loopback/repository';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
export declare class NewUserRequest extends User {
    password: string;
}
export declare class UserController {
    userRepository: UserRepository;
    passwordHasher: PasswordHasher;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher);
    create(newUserRequest: NewUserRequest): Promise<User>;
    count(where?: Where<User>): Promise<Count>;
    find(filter?: Filter<User>): Promise<User[]>;
    updateAll(user: User, where?: Where<User>): Promise<Count>;
    findById(id: string, filter?: Filter<User>): Promise<User>;
    updateById(id: string, user: User): Promise<void>;
    replaceById(id: string, user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
}
