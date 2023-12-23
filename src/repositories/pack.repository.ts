import { Injector } from "../injector.js";
import { IRepository } from "../layers/repository.interface.js";
import { IPack } from "../domain/pack.interface.js";

export const PackRepository = Injector.create<IRepository<IPack>>();
