import { database } from "../../bot.js";
import { ref, get } from "firebase/database";
import dayjs from "dayjs";

const getActiveGames = async (guildId, gameUsername) => {
  try {
    const gamesRef = ref(database, `guilds/${guildId}/games`);
    const snapshot = await get(gamesRef);

    if (snapshot.exists()) {
      const games = snapshot.val();

      // Filter active games (assuming isActive is a boolean field)
      const activeGames = Object.values(games).filter(game => game.isActive);

      // Map games to options
      const options = activeGames.map(game => ({
        label: game.createdBy,
        value: game.key + "," + gameUsername,
        description: dayjs(game.date).format("YYYY.MM.DD HH:mm"),
      }));

      return options;
    } else {
      return []; // No active games found
    }
  } catch (error) {
    console.error("Error while fetching active games:", error);
    return []; // Handle the error gracefully
  }
};

export { getActiveGames };
