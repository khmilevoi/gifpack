import { Injector } from "injector";
import { IAnswer } from "layers/answer.interface";
import { CleanStateUseCase } from "use-cases/state/clean-state.use-case";
import { MoveStageUseCase } from "use-cases/state/move-stage.use-case";
import { AddPackUseCase } from "use-cases/packs/add-pack.use-case";

export class CreatePackController {
  constructor(private readonly injector: Injector) {}

  async handleStart(chatId: string): Promise<IAnswer> {
    await this.injector.resolve(CleanStateUseCase).cleanState(chatId);

    await this.injector
      .resolve(MoveStageUseCase)
      .moveToCreatePackNameStage(chatId);

    return {
      textMessage: {
        content: "Enter pack name",
      },
    };
  }

  async handleName(
    chatId: string,
    userId: string,
    name: string,
  ): Promise<IAnswer> {
    await this.injector.resolve(AddPackUseCase).addPack({
      name,
      userId,
    });

    await this.injector.resolve(CleanStateUseCase).cleanState(chatId);

    return {
      textMessage: {
        content: "Pack created",
      },
    };
  }
}
