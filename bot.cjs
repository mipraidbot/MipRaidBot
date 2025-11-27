const express = require("express");
const tmi = require("tmi.js");

const app = express();

// Webserver für Render/UptimeRobot
app.get("/", (req, res) => {
  res.send("Mip-Raid-Bot läuft ✅");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Webserver gestartet auf Port " + (process.env.PORT || 3000));
});

// Twitch Bot
const client = new tmi.Client({
  options: { debug: true },
  connection: { reconnect: true, secure: true },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_OAUTH
  },
  channels: [process.env.TWITCH_CHANNEL]
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (self) return;
  if (message.toLowerCase() === "!ping") {
    client.say(channel, "Pong!");
  }
});
