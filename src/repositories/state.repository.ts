import { Injector } from "../injector.js";
import { IRepository } from "../layers/repository.interface.js";
import { IState } from "../domain/state.interface.js";

export const StateRepository = Injector.create<IRepository<IState>>();
