const { Client, GatewayIntentBits } = require("discord.js");
const { config } = require("dotenv");
const { initializeApp } = require("firebase/app");
const { getDatabase, set, ref, remove } = require("firebase/database");

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildCreate", guild => {
  const guildId = guild.id;
  set(ref(database, `guilds/${guildId}`), {
    guildId,
    isActive: true,
  })
    .then(() => {
      console.log(guildId + " has joined the bot");
    })
    .catch(error => {
      console.log(error);
    });
});

client.on("guildDelete", guild => {
  const guildId = guild.id;
  remove(ref(database, `guilds/${guildId}`))
    .then(() => {
      console.log(`${guildId} just got kicked out from the channel`);
    })
    .catch(error => {
      console.log(error);
    });
});

async function startBot() {
  try {
    await client.login(process.env.TOKEN);
  } catch (error) {
    console.error("An error occurred while starting the bot:", error);
  }
}

module.exports = { client, startBot };
