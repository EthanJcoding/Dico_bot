import { config } from "dotenv";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

client.once("ready", () => {
  console.log(`${client.user.tag} 로그인`); // 봇이 온라인이 되었을 때 "(봇이름) 로그인" 메시지가 콘솔에 출력됨
});

client.on("interactionCreate", interaction => {
  if (interaction.isChatInputCommand()) {
    console.log(interaction.options.get("날짜").value);
    interaction.reply({
      content: `> ${interaction.options.get("날짜").value}`,
    });
  }
});

async function main() {
  const commands = [
    {
      name: "내전만들기",
      description: "내전 날짜를 정하는 커맨드 입니다.",
      options: [
        {
          name: "날짜",
          description:
            "날짜를 정해주세요 형식 예 : 2023-10-10 20:00 - 2023-10-11 00:00",
          type: 3,
          required: true,
        },
      ],
    },
  ];

  try {
    console.log("Started refreshing app (/) commands");
    await rest.put(
      Routes.applicationCommands(process.env.ID, process.env.GUILD),
      { body: commands }
    );
    client.login(process.env.TOKEN); // 봇 로그인 요청
  } catch (err) {
    console.log(err);
  }
}

main();
