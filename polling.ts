import { bot } from "./bot.ts";

bot.start({
  onStart: (me) => {
    console.log(`Listening as ${me.username}`);
  },
});
