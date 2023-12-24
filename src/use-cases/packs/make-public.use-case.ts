import { Injector } from "injector";

export interface IMakePublicUseCase {
  maePublic(packId: string): Promise<void>;
}

export const MakePublicUseCase = Injector.create<IMakePublicUseCase>();
