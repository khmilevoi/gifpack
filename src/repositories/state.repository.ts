import { Injector } from "../injector";
import { IRepository } from "../layers/repository.interface";
import { IState } from "../domain/state.interface";

export const StateRepository = Injector.create<IRepository<IState>>();
