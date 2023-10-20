import { EmbedBuilder } from "discord.js";
import dayjs from "dayjs";

const embedInteraction = gamesArr => {
  const fields = gamesArr.map(game => ({
    name: `${dayjs(game.date).format("MM월DD일 HH:mm")}시에 시작하는 **${
      game.createdBy
    }의 내전**`,
    value: `현재 멤버: \n${game.members.map(member => member.user).join("\n")}`,
    inline: false,
  }));

  return [
    new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("현재 참여가능한 내전 목록이에요 😉")
      .addFields(fields)
      .setTimestamp(),
  ];
};

export { embedInteraction };
