import { Injector } from "../injector";
import { IRepository } from "../layers/repository.interface";
import { IUser } from "../domain/user.interface";

export const UserRepository = Injector.create<IRepository<IUser>>();
