import { database } from "../../bot.js";
import { ref, get, update } from "firebase/database";
import dayjs from "dayjs";

const saveUserToGame = async (gameId, guildId, username, gameUsername) => {
  try {
    const gameRef = ref(database, `guilds/${guildId}/games/${gameId}`);
    const snapshot = await get(gameRef);

    if (snapshot.exists()) {
      const game = snapshot.val();
      game.member.push({ user: username, gameUsername });

      await update(gameRef, { member: game.member });
      return dayjs(game.date).format("MM월DD일 HH:mm");
    }
  } catch (error) {
    console.error("Error while fetching active games:", error);
    return []; // Handle the error gracefully
  }
};

export { saveUserToGame };
