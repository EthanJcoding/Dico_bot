import { SlashCommandBuilder } from "@discordjs/builders";

const getScheduleCommand = new SlashCommandBuilder()
  .setName("내전확인하기")
  .setDescription("현재 활성화된 내전들을 확인해요!");

export { getScheduleCommand };
