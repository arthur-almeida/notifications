import Expo from "expo-server-sdk";

export async function sendPushNotification(
  targetExpoPushToken: string,
  title: string,
  content: []
) {
  const expo = new Expo();
  await expo.sendPushNotificationsAsync([
    {
      to: targetExpoPushToken,
      body: 'This is a test notification',
      title,
      data: {
        components: content
      }
    }
  ]);
}
