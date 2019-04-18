import PushNotification from 'react-native-push-notification';
import { check_delay } from './apis';
import { prompt } from './misc';

class Notifications {

   // ATTACH CONFIG
   constructor() {
      PushNotification.configure({
         onNotification: (notification) => {
            switch (notification.action) {

               // WHEN CHECK IS PRESSED
               case 'Check':
                  check_delay(notification).then((message) => {
                     prompt(message);
                  });
               break;

               // WHEN SOMETHING ELSE IS PRESSED
               default:
                  PushNotification.cancelAllLocalNotifications();
               break;
            }
         }
      });
   }

   // SCHEDULE NOTIFICATION
   schedule({ message, timestamp, number, origin }) {
      PushNotification.localNotificationSchedule({
         message: message,
         date: new Date(timestamp),
         ticker: number + '-' + origin,
         actions: '["Check", "Dismiss"]'
      });
   }
}

export default new Notifications();