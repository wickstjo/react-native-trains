import PushNotification from 'react-native-push-notification';
import { check_delay } from './apis';
import { prompt } from './misc';

class Notifications {

   // ATTACH CONFIG
   constructor() {
      PushNotification.configure({
         onNotification: (notification) => {
            if (notification.action === 'Check') {
               prompt(check_delay());
            } else {
               PushNotification.cancelAllLocalNotifications();
            }
         }
      });
   }

   // SCHEDULE NOTIFICATION
   schedule({ message, timestamp, id }) {
      PushNotification.localNotificationSchedule({
         message: message,
         date: new Date(timestamp),
         number: id,
         actions: '["Check", "Dismiss"]'
      });
   }
}

export default new Notifications();