import { SlashCommandBuilder } from "@discordjs/builders";

const deleteScheduleCommand = new SlashCommandBuilder()
  .setName("내전삭제하기")
  .setDescription("등록된 내전을 삭제해요 😢");

export { deleteScheduleCommand };
