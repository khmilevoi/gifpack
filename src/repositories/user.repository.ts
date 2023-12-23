import { Injector } from "../injector.js";
import { IRepository } from "../layers/repository.interface.js";
import { IUser } from "../domain/user.interface.js";

export const UserRepository = Injector.create<IRepository<IUser>>();
