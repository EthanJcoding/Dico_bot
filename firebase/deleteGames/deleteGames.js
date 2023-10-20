import dayjs from "dayjs";
import { database } from "../../bot.js";
import { get, ref, remove } from "firebase/database";

const deleteGames = async (gameId, guildId, username) => {
  try {
    const gameRef = ref(database, `guilds/${guildId}/games/${gameId}`);
    const snapshot = await get(gameRef);
    const gameDate = snapshot.val().date;

    await remove(gameRef);

    return `**${username}님께서 ${dayjs(gameDate).format(
      "MM월DD일 HH:mm"
    )}시에 시작하는 내전을 삭제했습니다!**`;
  } catch (error) {
    console.error("Error while fetching active games:", error);
    return []; // Handle the error gracefully
  }
};

export { deleteGames };
