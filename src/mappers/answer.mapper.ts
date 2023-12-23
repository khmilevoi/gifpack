import { IAnswer } from "layers/answer.interface";
import { InlineQueryResult } from "node-telegram-bot-api";

export const mapAnswer = (
  answer: IAnswer,
): { inlineMessages?: InlineQueryResult[] } => {
  return {
    inlineMessages: answer.inlineMessages?.map((inlineMessage) => {
      if (inlineMessage.type === "text") {
        return {
          type: "article",
          id: inlineMessage.id,
          title: inlineMessage.content,
          input_message_content: {
            message_text: inlineMessage.content,
          },
        };
      } else {
        return {
          type: "photo",
          id: inlineMessage.id,
          photo_url: inlineMessage.content,
          thumb_url: inlineMessage.content,
        };
      }
    }),
  };
};
