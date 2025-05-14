const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/send", async (req, res) => {
  const { photo, location } = req.body;
  const chatId = process.env.CHAT_ID;
  const token = process.env.BOT_TOKEN;

  try {
    if (photo) {
      await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          photo: photo
        })
      });
    }

    if (location) {
      await fetch(`https://api.telegram.org/bot${token}/sendLocation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          latitude: location.latitude,
          longitude: location.longitude
        })
      });
    }

    res.status(200).send("Sent to Telegram");
  } catch (err) {
    console.error("Error sending to Telegram:", err.message);
    res.status(500).send("Failed to send to Telegram");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
