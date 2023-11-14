import { SlashCommandBuilder } from "@discordjs/builders";

const cancelParticipationCommand = new SlashCommandBuilder()
  .setName("참여취소하기")
  .setDescription("내전 참여를 취소해요 😢");

export { cancelParticipationCommand };
