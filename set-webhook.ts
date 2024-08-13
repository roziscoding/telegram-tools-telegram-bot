import { bot } from "./bot.ts";

const { WEBHOOK_URL, TELEGRAM_TOKEN } = Deno.env.toObject();

await bot.api.setWebhook(WEBHOOK_URL, {
  secret_token: TELEGRAM_TOKEN.replace(/[^0-9a-z_]/g, ""),
})
  .then(console.log)
  .catch(console.error);
