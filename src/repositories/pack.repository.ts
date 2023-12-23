import { Injector } from "../injector";
import { IRepository } from "../layers/repository.interface";
import { IPack } from "../domain/pack.interface";

export const PackRepository = Injector.create<IRepository<IPack>>();
