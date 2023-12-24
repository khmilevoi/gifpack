import { IAnswer } from "layers/answer.interface";
import { InlineQueryResult, SendMessageOptions } from "node-telegram-bot-api";

export const mapAnswer = (
  answer: IAnswer,
): {
  inlineMessages?: InlineQueryResult[];
  textMessage?: { content: string; options?: SendMessageOptions };
} => {
  return {
    inlineMessages: answer.inlineMessages?.map<InlineQueryResult>(
      (inlineMessage) => {
        switch (inlineMessage.type) {
          case "text":
            return {
              type: "article",
              id: inlineMessage.id,
              title: inlineMessage.content,
              input_message_content: {
                message_text: inlineMessage.content,
              },
            };
          case "photo":
            return {
              type: "photo",
              id: inlineMessage.id,
              photo_url: inlineMessage.content,
              thumb_url: inlineMessage.content,
            };
          case "gif":
            return {
              type: "gif",
              id: inlineMessage.id,
              gif_url: inlineMessage.content,
              thumb_url: inlineMessage.content,
            };
        }
      },
    ),
    textMessage: answer.textMessage && {
      content: answer.textMessage.content,
      options: {
        reply_markup: {
          remove_keyboard: answer.textMessage.buttons === undefined,
          resize_keyboard: true,
          keyboard:
            answer.textMessage.buttons?.map((button) => [
              {
                text: button.content,
                callback_data: button.content,
              },
            ]) ?? [],
        },
      } satisfies SendMessageOptions,
    },
  };
};
