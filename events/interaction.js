import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "@discordjs/builders";
import { database } from "../bot.js";
import { set, ref, push } from "firebase/database";
import { getActiveGames, saveUserToGame } from "../firebase/index.js";

async function handleCommandInteraction(interaction) {
  const { commandName, options } = interaction;
  const guildId = interaction.guildId;

  if (interaction.isCommand()) {
    if (commandName === "내전만들기") {
      const date = options.getString("날짜");
      const time = options.getString("시작시간");
      const gameUsername = options.getString("유저명");
      const scheduledTime = new Date(`${date}T${time}:00`).toString();

      try {
        const guildsRef = ref(database, `guilds/${guildId}/games`);
        const newRef = push(guildsRef);

        const gameData = {
          key: newRef.key,
          createdBy: interaction.user.globalName,
          date: scheduledTime,
          member: [{ user: interaction.user.username, gameUsername }],
          isActive: true,
        };

        await set(newRef, gameData);
        await interaction.reply(`Scheduling is complete for ${date} ${time}`);
      } catch (error) {
        console.error(error);
        await interaction.reply(
          "An error occurred while scheduling. Please try again later."
        );
      }
    }

    if (commandName === "내전참여하기") {
      const gameUsername = options.getString("유저명");

      try {
        const gamesArr = await getActiveGames(guildId, gameUsername);
        const selectMenu = new StringSelectMenuBuilder()
          .setCustomId("selectGame")
          .setPlaceholder("참여를 원하는 내전을 선택해주세요")
          .addOptions(
            gamesArr.map(game => {
              return new StringSelectMenuOptionBuilder()
                .setLabel(game.label)
                .setDescription(game.description)
                .setValue(game.value);
            })
          );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
          content: "현재 활성화된 내전이에요!",
          components: [row],
        });
      } catch (err) {
        console.error(err);
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "selectGame") {
      const [gameId, gameUsername] = interaction.values.join(",").split(",");
      const username = interaction.user.username;

      try {
        const gameDay = await saveUserToGame(
          gameId,
          guildId,
          username,
          gameUsername
        );
        await interaction.reply({
          content: `${interaction.user.globalName}님께서 ${gameDay} 에 시작하는 내전에 참여했습니다!`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
export { handleCommandInteraction };
