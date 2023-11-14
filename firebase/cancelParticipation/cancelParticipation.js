import { database } from "../../bot.js";
import { ref, get, update } from "firebase/database";

const cancelParticipation = async (gameId, guildId, username) => {
  try {
    const gameRef = ref(database, `guilds/${guildId}/games/${gameId}`);
    const snapshot = await get(gameRef);

    if (snapshot.exists()) {
      const game = snapshot.val();

      const updatedMembers = game.members.filter(
        member => member.user !== username
      );

      await update(gameRef, { members: updatedMembers });
      return "취소 성공 😎";
    }
  } catch (error) {
    console.error("Error while cancel participation:", error);
    return [];
  }
};

export { cancelParticipation };
