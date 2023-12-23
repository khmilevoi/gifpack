import { IPack } from "domain/pack.interface";
import { Injector } from "injector";

export interface IFindPacksByUserIdUseCase {
  findPacksByUserId(userId: string): Promise<IPack[]>;
}

export const FindPacksByUserIdUseCase =
  Injector.create<IFindPacksByUserIdUseCase>();
