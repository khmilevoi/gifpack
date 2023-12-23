import { IPack } from "../../domain/pack.interface.js";
import { Injector } from "../../injector.js";

export interface IFindPacksByUserIdUseCase {
  findPacksByUserId(userId: string): Promise<IPack[]>;
}

export const FindPacksByUserIdUseCase =
  Injector.create<IFindPacksByUserIdUseCase>();
