import { database } from "../../bot.js";
import { ref, get, update } from "firebase/database";
// import { firestore } from "../../bot.js";
// import { setDoc, getDoc, doc } from "firebase/firestore";
import dayjs from "dayjs";

const serverTime = new Date();
serverTime.setHours(serverTime.getHours()) - 9;

const saveUserToGame = async (
  gameId,
  guildId,
  username,
  gameUsername,
  avatar
) => {
  try {
    const gameRef = ref(database, `guilds/${guildId}/games/${gameId}`);
    const gameSnapshot = await get(gameRef);
    // const userRef = doc(firestore, `guilds/${guildId}/users/${gameUsername}`);
    // const userSnapshot = await getDoc(userRef);

    // if (!userSnapshot.exists()) {
    //   await setDoc(userRef, {
    //     acs: "",
    //     tier: "",
    //     gameUsername,
    //     username,
    //     avatar,
    //     joinedAt: serverTime,
    //   });
    // }

    if (gameSnapshot.exists()) {
      const game = gameSnapshot.val();

      if (game.members.length >= 10) {
        return "자리가 꽉 찼어요 😭";
      }

      for (const member of game.members) {
        if (member.gameUsername === gameUsername || member.user === username) {
          return "이미 등록을 완료했어요 😅";
        }
      }

      game.members.push({
        user: username,
        gameUsername,
        joinedAt: serverTime,
        avatar,
        acs: 0,
        tier: "",
      });

      await update(gameRef, { members: game.members });

      return `**${username}님께서 ${dayjs(game.date).format(
        "MM월DD일 HH:mm"
      )} 에 시작하는 내전에 참여했습니다!**\n> 현재 잔여석 ${
        10 - game.members.length
      }`;
    }
  } catch (error) {
    console.error("Error while saving user to active games:", error);
    return [];
  }
};

export { saveUserToGame };
