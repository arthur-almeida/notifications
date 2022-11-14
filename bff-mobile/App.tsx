import { 
  addNotificationResponseReceivedListener,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  removeNotificationSubscription,
  requestPermissionsAsync,
  setNotificationHandler
} from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MyImage } from './components/Image';
import { Title } from './components/Title';

async function registerForPushNotificationsAsync() {
  let token: string;

  const { status: existingStatus } = await getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
  }
  if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
  }
  token = (await getExpoPushTokenAsync()).data;
  console.log(token);

  return token;
}

setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true,
  })
});

type ComponentStructure = {
  name: string;
  props: object;
}

type Notification = {
  title: string;
  body: string;
  data: { [key: string]: unknown; }
}

const components = {
  'Title': Title,
  'Image': MyImage
};

export default function App() {
  const [notification, setNotification] = useState<ComponentStructure[]>([]);
  const responseListener = useRef<
    ReturnType<typeof addNotificationResponseReceivedListener>
  >();

  function renderNotification() {
    return (
      <View>
        {notification.map((component, index) => {
          console.log(component)
          const { name, props } = component;
          console.log({ name, props })
          const Component = components[name];
          return <Component key={name + index} {...props} />

          // return <View />
        })}
      </View>
    );
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
    responseListener.current = addNotificationResponseReceivedListener((response) => {
      const { title, body, data } = response.notification.request.content;
      const notificationContent = data.components;
      console.log(notificationContent)
      setNotification(notificationContent as ComponentStructure[]);
    });

    return () => {
      removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  return (
    <View style={styles.container}>
      {notification.length
        ? renderNotification()
        : <Text>Nenhuma notificação</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
