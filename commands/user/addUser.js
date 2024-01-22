import { SlashCommandBuilder } from "@discordjs/builders";

const addUserCommand = new SlashCommandBuilder()
  .setName("내전참여하기")
  .setDescription("내전에 참여해요")
  .addStringOption(option =>
    option
      .setName("유저명")
      .setDescription("발로란트 유저명을 적어주세요 ex)형이 얘기하잖아#kr1")
      .setRequired(true)
  );

export { addUserCommand };
