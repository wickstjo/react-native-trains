import PushNotification from 'react-native-push-notification';
import { prompt } from './misc';

class Notifications {

   // ATTACH CONFIG
   constructor() {
      PushNotification.configure({
         onNotification: (notification) => {
            if (notification.action === 'Check') {
               console.log('foo');
               prompt('CHECK IF TRAIN IS LATE');
            } else {
               PushNotification.cancelAllLocalNotifications();
            }
         }
      });
   }

   // SCHEDULE NOTIFICATION
   schedule(msg, seconds) {
      PushNotification.localNotificationSchedule({
         message: msg,
         date: new Date(Date.now() + (seconds * 1000)),
         actions: '["Check", "Dismiss"]'
      });
   }
}

export default new Notifications();