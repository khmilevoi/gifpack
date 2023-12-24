import { Injector } from "injector";
import { CreatePackController } from "./create-pack.controller";
import { IAnswer } from "layers/answer.interface";
import { UsingController } from "./using.controller";
import { LoadStateByIdUseCase } from "use-cases/state/load-state-by-id.use-case";
import { CleanStateUseCase } from "use-cases/state/clean-state.use-case";
import { AddItemController } from "./add-item.controller";

export class RootController {
  private readonly createPackController: CreatePackController;
  private readonly usingController: UsingController;
  private readonly addItemController: AddItemController;

  constructor(private readonly injector: Injector) {
    this.createPackController = new CreatePackController(injector);
    this.usingController = new UsingController(injector);
    this.addItemController = new AddItemController(injector);
  }

  handleInline(userId: string, message: string): Promise<IAnswer> {
    return this.usingController.handleMessage(userId, message);
  }

  handleCretePack(chatId: string): Promise<IAnswer> {
    return this.createPackController.handleStart(chatId);
  }

  async handleAddItem(chatId: string, userId: string): Promise<IAnswer> {
    return await this.addItemController.handleAddItem(chatId, userId);
  }

  async handleMessage(
    chatId: string,
    userId: string,
    message: string,
  ): Promise<IAnswer> {
    const state = await this.injector
      .resolve(LoadStateByIdUseCase)
      .loadStateById(chatId);

    if (state?.stage === "create-pack:name") {
      return this.createPackController.handleName(chatId, userId, message);
    }

    if (state?.stage === "add-item:pack") {
      return this.addItemController.handleChoosePack(chatId, userId, message);
    }

    return {
      textMessage: {
        content: "Unknown command",
      },
    };
  }

  async handlePhoto(chatId: string, fileId: string): Promise<IAnswer> {
    const state = await this.injector
      .resolve(LoadStateByIdUseCase)
      .loadStateById(chatId);

    if (state?.stage === "add-item:images") {
      return this.addItemController.handleAddItemImages(
        chatId,
        "image",
        fileId,
      );
    }

    return {
      textMessage: {
        content: "Unknown command",
      },
    };
  }

  async handleDocument(chatId: string, fileId: string): Promise<IAnswer> {
    const state = await this.injector
      .resolve(LoadStateByIdUseCase)
      .loadStateById(chatId);

    if (state?.stage === "add-item:images") {
      return this.addItemController.handleAddItemImages(chatId, "gif", fileId);
    }

    return {
      textMessage: {
        content: "Unknown command",
      },
    };
  }

  async handleCancel(chatId: string): Promise<IAnswer> {
    await this.injector.resolve(CleanStateUseCase).cleanState(chatId);

    return {
      textMessage: {
        content: "Canceled",
      },
    };
  }

  async handleDone(chatId: string): Promise<IAnswer> {
    const state = await this.injector
      .resolve(LoadStateByIdUseCase)
      .loadStateById(chatId);

    if (state?.stage === "add-item:images") {
      return this.addItemController.handleDone(chatId);
    }

    return {
      textMessage: {
        content: "Unknown command",
      },
    };
  }
}
