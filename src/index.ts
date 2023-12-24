import TelegramBot from "node-telegram-bot-api";
import { Injector } from "./injector";
import { injectDependencies } from "./dependencies";
import { mapAnswer } from "./mappers/answer.mapper";
import { IAnswer } from "./layers/answer.interface";
import { RootController } from "./controllers/root.controller";
import { config } from "./config";

if (config.token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const injector = new Injector();

const bot = new TelegramBot(config.token, { polling: true });

injectDependencies(injector);

const rootController = new RootController(injector);

bot.on("inline_query", async (query) => {
  const userId = query.from.id.toString();

  await handleAnswer(
    query.id,
    await rootController.handleInline(userId, query.query),
  );
});

bot.setMyCommands([
  {
    command: "add_item",
    description: "Add new Pack Item",
  },
  {
    command: "create_pack",
    description: "Create new Pack",
  },
  {
    command: "cancel",
    description: "Cancel current operation",
  },
  {
    command: "done",
    description: "Finish current operation",
  },
  // {
  //   command: "make_publish",
  //   description: "Make pack public",
  // },
  // {
  //   command: "make_private",
  //   description: "Make pack private",
  // },
]);

bot.on("message", async (message) => {
  const userId = message.from?.id.toString();
  const chatId = message.chat.id.toString();

  if (userId === undefined) {
    await bot.sendMessage(message.chat.id, "Can't identify user");
    return;
  }

  if (message.text === "/create_pack") {
    await handleAnswer(chatId, await rootController.handleCretePack(chatId));

    return;
  }

  if (message.text === "/add_item") {
    await handleAnswer(
      chatId,
      await rootController.handleAddItem(chatId, userId),
    );

    return;
  }

  if (message.text === "/cancel") {
    await handleAnswer(chatId, await rootController.handleCancel(chatId));

    return;
  }

  if (message.text === "/done") {
    await handleAnswer(chatId, await rootController.handleDone(chatId));

    return;
  }

  if (message.text) {
    await handleAnswer(
      chatId,
      await rootController.handleMessage(chatId, userId, message.text),
    );

    return;
  }

  if (message.photo) {
    await handleAnswer(
      chatId,
      await rootController.handlePhoto(chatId, message.photo[0].file_id),
    );

    return;
  }

  if (message.document) {
    await handleAnswer(
      chatId,
      await rootController.handleDocument(chatId, message.document.file_id),
    );

    return;
  }

  await bot.sendMessage(chatId, "Unknown command");
});

const handleAnswer = async (chatId: string, answer: IAnswer) => {
  try {
    const { textMessage, inlineMessages } = mapAnswer(answer);

    if (textMessage !== undefined) {
      await bot.sendMessage(chatId, textMessage.content, textMessage.options);
    }

    if (inlineMessages !== undefined) {
      await bot.answerInlineQuery(chatId, inlineMessages, { cache_time: 0 });
    }
  } catch (error) {
    console.error(error);
  }
};

console.log("Bot is running...");
