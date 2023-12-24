import { Injector } from "injector";
import { IAnswer } from "layers/answer.interface";
import { CleanStateUseCase } from "use-cases/state/clean-state.use-case";
import { FindPacksByUserIdUseCase } from "use-cases/packs/find-packs-by-user-id.use-case";
import { MoveStageUseCase } from "use-cases/state/move-stage.use-case";
import { AddImageToStateUseCase } from "use-cases/state/add-image-to-state-use.case";
import { LoadStateByIdUseCase } from "use-cases/state/load-state-by-id.use-case";
import { AddPackItemUseCase } from "use-cases/pack-items/add-pack-item.use-case";

export class AddItemController {
  constructor(private readonly injector: Injector) {}

  async handleAddItem(chatId: string, userId: string): Promise<IAnswer> {
    await this.injector.resolve(CleanStateUseCase).cleanState(chatId);

    const packs = await this.injector
      .resolve(FindPacksByUserIdUseCase)
      .findPacksByUserId(userId);

    if (packs.length === 0) {
      return {
        textMessage: {
          content: "You have no packs",
        },
      };
    }

    await this.injector
      .resolve(MoveStageUseCase)
      .moveToAddItemPackStage(chatId);

    return {
      textMessage: {
        content: "Choose pack",
        buttons: packs.map(({ name }) => ({
          content: name,
        })),
      },
    };
  }

  async handleChoosePack(
    chatId: string,
    userId: string,
    packName: string,
  ): Promise<IAnswer> {
    const packs = await this.injector
      .resolve(FindPacksByUserIdUseCase)
      .findPacksByUserId(userId);

    const pack = packs.find(({ id }) => id === packName);

    if (pack === undefined) {
      return {
        textMessage: {
          content: "Unknown pack",
          buttons: packs.map(({ name }) => ({
            content: name,
          })),
        },
      };
    }

    await this.injector
      .resolve(MoveStageUseCase)
      .moveToAddItemImagesStage(chatId, pack.id);

    return {
      textMessage: {
        content: "Send images or gifs",
      },
    };
  }

  async handleAddItemImages(
    chatId: string,
    type: "gif" | "image",
    content: string,
  ): Promise<IAnswer> {
    await this.injector
      .resolve(AddImageToStateUseCase)
      .addImageToState(chatId, { type: type, content });

    return {
      textMessage: {
        content:
          "Image Added\nIf you want to add more images, send another one\nIf you want to finish, send /done",
      },
    };
  }

  async handleDone(chatId: string): Promise<IAnswer> {
    const state = await this.injector
      .resolve(LoadStateByIdUseCase)
      .loadStateById(chatId);
    const packId = state?.packId;

    if (state == null || packId == null) {
      return {
        textMessage: {
          content:
            "If you want to add images, send /add_item\nIf you want to create pack, send /create_pack",
        },
      };
    }

    await this.injector.resolve(CleanStateUseCase).cleanState(chatId);

    await this.injector.resolve(AddPackItemUseCase).addPackItems(
      state.images.map(({ type, content }) => ({
        type,
        content,
        packId: packId,
      })),
    );

    return {
      textMessage: {
        content: "Images added",
      },
    };
  }
}
