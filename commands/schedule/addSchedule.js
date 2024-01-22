import { SlashCommandBuilder } from "@discordjs/builders";

const addScheduleCommand = new SlashCommandBuilder()
  .setName("내전만들기")
  .setDescription("내전 스케쥴을 잡아요!")
  .addStringOption(option =>
    option
      .setName("유저명")
      .setDescription("발로란트 유저명을 적어주세요 ex)형이 얘기하잖아#kr1")
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName("날짜").setDescription("Date (YYYY-MM-DD)").setRequired(true)
  )
  .addStringOption(option =>
    option.setName("시작시간").setDescription("Time (HH:MM)").setRequired(true)
  );

export { addScheduleCommand };
