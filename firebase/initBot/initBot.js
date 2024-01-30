// import { database } from "../../bot.js";
// import { ref, get, set } from "firebase/database";

// const serverTime = new Date();
// serverTime.setHours(serverTime.getHours()) - 9;

// const initBot = async guilds => {
//   try {
//     const guildsRef = ref(database, `guilds/`);
//     const snapshot = await get(guildsRef);

//     //refresh outdated games
//     if (snapshot.exists()) {
//       const guildData = snapshot.val();

//       for (let i = 0; i < guilds.length; i++) {
//         const guildId = guilds[i];
//         console.log(guildData[guildId].id);
//       }
//     }
//   } catch (error) {
//     console.error("Error while initiating the bot:", error);
//   }
// };

// export { initBot };
