import { Injector } from "injector";

export interface IIdGenerator {
  generateId(): string;
}

export const IdGenerator = Injector.create<IIdGenerator>();
