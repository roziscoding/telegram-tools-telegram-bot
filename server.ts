import { bot } from "./bot.ts";
import { webhookCallback } from "./deps.ts";

const { TELEGRAM_TOKEN } = Deno.env.toObject();

const handleUpdate = webhookCallback(bot, "std/http", {
  secretToken: TELEGRAM_TOKEN.replace(/[^0-9a-z_]/g, ""),
});

Deno.serve(async (req) => {
  if (req.method === "POST") {
    try {
      return await handleUpdate(req);
    } catch (err) {
      console.error(err);
    }
  }
  return new Response();
});
