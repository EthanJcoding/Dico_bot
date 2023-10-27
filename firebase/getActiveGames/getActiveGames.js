import { database } from "../../bot.js";
import { ref, get } from "firebase/database";
import dayjs from "dayjs";

const getActiveGames = async (guildId, option, gameUsername) => {
  try {
    const gamesRef = ref(database, `guilds/${guildId}/games`);
    const snapshot = await get(gamesRef);

    if (snapshot.exists()) {
      const games = snapshot.val();

      const activeGames = Object.values(games).filter(game => game.isActive);

      if (option === "participateGame") {
        return activeGames.map(game => ({
          label: game.createdBy,
          value: game.gameId + "," + gameUsername,
          description: dayjs(game.date).format("YYYY.MM.DD HH:mm"),
        }));
      }

      if (option === "deleteGame") {
        return activeGames.map(game => ({
          label: game.createdBy,
          value: game.key,
          description: dayjs(game.date).format("YYYY.MM.DD HH:mm"),
        }));
      }

      if (option === "checkGame") {
        return activeGames;
      }
    } else {
      return []; // No active games found
    }
  } catch (error) {
    console.error("Error while fetching active games:", error);
    return []; // Handle the error gracefully
  }
};

export { getActiveGames };
