import { Bot, InlineKeyboard, InlineQueryResultBuilder } from "./deps.ts";

const bot = new Bot(Deno.env.get("TELEGRAM_TOKEN") ?? "");

const TOOLS = [
  {
    id: "connectivity-test",
    name: "Connectivity Test",
    description: "See if you are able to reach Telegram’s data centers.",
    url: "/connectivity-test",
  },
  {
    id: "creation-date",
    name: "Creation Date",
    description: "Get approximate creation date of Telegram users.",
    url: "/creation-date",
  },
  {
    id: "file-id-analyzer",
    name: "File ID Analyzer",
    description:
      "Extract information from file IDs provided by Bot API or TDLib.",
    url: "/file-id-analyzer",
  },
  {
    id: "inline-message-id-unpacker",
    name: "Inline Message ID Unpacker",
    description: "Unpack inline message IDs.",
    url: "/inline-message-id-unpacker",
  },
  {
    id: "update-explorer",
    name: "Update Explorer",
    description: "Explore a bot’s update stream live.",
    url: "/update-explorer",
  },
  {
    id: "webhook-manager",
    name: "Webhook Manager",
    description: "Manage a bot’s webhook settings.",
    url: "/webhook-manager",
  },
  {
    id: "session-string-generator",
    name: "Session String Generator",
    description: "Generate a session string for your desired client library.",
    url: "/session-string-generator",
  },
  {
    id: "session-string-converter",
    name: "Session String Converter",
    description: "Convert between different known session string formats.",
    url: "/session-string-converter",
  },
  {
    id: "session-string-analyzer",
    name: "Session String Analyzer",
    description: "Extract information from session strings.",
    url: "/session-string-analyzer",
  },
  {
    id: "filter-query-browser",
    name: "Filter Query Browser",
    description: "Browse through grammY’s filter queries.",
    url: "/filter-query-browser",
  },
].map(({ url, ...tool }) => ({
  ...tool,
  url: `https://telegram.tools${url}`,
}))
  .map((tool) =>
    InlineQueryResultBuilder.article(tool.id, tool.name, {
      description: tool.description,
      url: tool.url,
    }).text(`[${tool.name}](${tool.url})`, { parse_mode: "MarkdownV2" })
  );

bot.inlineQuery(/.*/, (ctx) => ctx.answerInlineQuery(TOOLS));
bot.on(
  "message",
  (ctx) =>
    ctx.reply("I only work inline!", {
      reply_markup: new InlineKeyboard([
        [InlineKeyboard.switchInlineCurrent("Click here to try it!")],
      ]),
    }),
);

bot.start();
