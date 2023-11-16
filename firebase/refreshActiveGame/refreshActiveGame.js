import { database } from "../../bot.js";
import { ref, get, set } from "firebase/database";

const refreshActiveGame = async () => {
  try {
    const guildsRef = ref(database, `guilds/`);
    const snapshot = await get(guildsRef);

    //refresh outdated games
    if (snapshot.exists()) {
      const guildData = snapshot.val();

      for (const guildId in guildData) {
        const guild = guildData[guildId];
        const games = guild.games;
        const currentDate = new Date().setHours(new Date().getHours() - 9);

        for (const gameId in games) {
          const game = games[gameId];

          const gameDate = new Date(game.date);

          if (gameDate < currentDate) {
            game.isActive = false;
          }
        }

        await set(ref(database, `guilds/${guildId}/games`), games);
      }
    }

    console.log("refreshed!");
  } catch (error) {
    console.error("Error while refreshing active games:", error);
  }
};

export { refreshActiveGame };
