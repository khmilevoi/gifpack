import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { Injector } from "./injector";
import { injectDependencies } from "./dependencies";
import { UsingController } from "./controllers/using.controller";
import { mapAnswer } from "./mappers/answer.mapper";

dotenv.config();

const config = {
  token: process.env.TOKEN,
};

if (config.token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const injector = new Injector();

const bot = new TelegramBot(config.token, { polling: true });

injectDependencies(injector);

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

bot
  .setMyCommands([
    {
      command: "add",
      description: "Add new Pack Item",
    },
    {
      command: "cancel",
      description: "Cancel current operation",
    },
  ])
  .then(() => {
    bot.on("message", async (message, metadata) => {});
  });

console.log("Bot is running...");
