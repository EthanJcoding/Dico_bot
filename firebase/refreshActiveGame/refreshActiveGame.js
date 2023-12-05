import { database } from "../../bot.js";
import { ref, get, set } from "firebase/database";

const serverTime = new Date();
serverTime.setHours(serverTime.getHours()) - 9;

const refreshActiveGame = async () => {
  try {
    let count = 0;
    const guildsRef = ref(database, `guilds/`);
    const snapshot = await get(guildsRef);

    //refresh outdated games
    if (snapshot.exists()) {
      const guildData = snapshot.val();

      for (const guildId in guildData) {
        const guild = guildData[guildId];
        const games = guild.games;

        for (const gameId in games) {
          const game = games[gameId];

          const gameDate = new Date(game.date);

          if (game.isActive === true && gameDate < serverTime) {
            console.log(
              `gamserver time: ${serverTime} game date: ${gameDate} GAME ID: ${gameId} is refreshed`
            );
            game.isActive = false;
            count++;
          }
        }

        await set(ref(database, `guilds/${guildId}/games`), games);
      }
    }

    console.log(`--------------------\n${count} games are refreshed!`);
    count = 0;
  } catch (error) {
    console.error("Error while refreshing active games:", error);
  }
};

export { refreshActiveGame };
