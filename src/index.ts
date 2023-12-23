import TelegramBot, { InlineQueryResult } from "node-telegram-bot-api";
import "dotenv/config";
import * as process from "process";
import { Injector } from "./injector.js";
import { FindPublicPacksByNameUseCase } from "./use-cases/packs/find-public-packs-by-name-use.case.js";
import { LoadPacksUseCase } from "./use-cases/packs/load-packs.use-case.js";
import { LoadPackItemsFromPackUseCase } from "./use-cases/packs/load-pack-items-from-pack.use-case.js";
import { createDependencies } from "./dependencies.js";
import { UsingController } from "./controllers/using.controller.js";
import { mapAnswer } from "./mappers/answer.mapper.js";

const config = {
  token: process.env.TOKEN,
};

if (config.token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const injector = new Injector();

const bot = new TelegramBot(config.token, { polling: true });

createDependencies(injector);

const usingController = new UsingController(injector);

bot.on("inline_query", async (query) => {
  const userId = query.from.id.toString();

  const answer = await usingController.handleMessage(userId, query.query);

  const { inlineMessages } = mapAnswer(answer);

  if (inlineMessages === undefined) {
    return;
  }

  await bot.answerInlineQuery(query.id, inlineMessages, { cache_time: 0 });
});

bot.setMyCommands([
  {
    command: "add",
    description: "Add new Pack Item",
  },
  {
    command: "cancel",
    description: "Cancel current operation",
  },
]);

bot.on("message", async (message, metadata) => {});

console.log("Bot is running...");
