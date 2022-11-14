import Expo from "expo-server-sdk";
import express from 'express';
import cors from 'cors';
import { sendPushNotification } from "./utilities/pushNotification";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post("/send-notification", async (req, res) => {
  const { expoPushToken, message, content } = req.body;
  console.log({ expoPushToken, message, content });

  if (Expo.isExpoPushToken(expoPushToken))
    await sendPushNotification(expoPushToken, message, content);

  res.status(201).send();
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})