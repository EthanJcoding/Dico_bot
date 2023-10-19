import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "@discordjs/builders";
import { database } from "../bot.js";
import { set, ref, push } from "firebase/database";
import { getActiveGames, saveUserToGame } from "../firebase/index.js";
import { isDateTimeValid } from "../utils/isDateTimeValid.js";

async function handleCommandInteraction(interaction) {
  const { commandName, options } = interaction;
  const guildId = interaction.guildId;

  if (interaction.isCommand()) {
    if (commandName === "내전만들기") {
      const date = options.getString("날짜");
      const time = options.getString("시작시간");
      const gameUsername = options.getString("유저명");

      if (!isDateTimeValid(date, time)) {
        await interaction.reply({
          content:
            "잘못된 날짜 또는 시간 형식입니다. 날짜 형식: YYYY-MM-DD, 시간 형식: HH:MM",
        });
        return; // Exit the command
      }

      try {
        const guildsRef = ref(database, `guilds/${guildId}/games`);
        const newRef = push(guildsRef);

        const gameData = {
          key: newRef.key,
          createdBy: interaction.user.globalName,
          date: new Date(`${date}T${time}:00`).toString(),
          members: [{ user: interaction.user.globalName, gameUsername }],
          isActive: true,
        };

        await set(newRef, gameData);
        await interaction.reply(
          `**${interaction.user.globalName}님께서 ${date} ${time} 날짜로 내전을 만들었어요** 😎`
        );
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

        if (gamesArr.length !== 0) {
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
            content: "**현재 활성화된 내전이에요!**",
            components: [row],
          });
        } else {
          await interaction.reply({
            content: "**현재 참여 가능한 내전이 없어요** 😭",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "selectGame") {
      const [gameId, gameUsername] = interaction.values.join(",").split(",");
      const username = interaction.user.globalName;

      try {
        await interaction.reply({
          content: await saveUserToGame(
            gameId,
            guildId,
            username,
            gameUsername
          ),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
export { handleCommandInteraction };
