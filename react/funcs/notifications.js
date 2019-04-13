import PushNotification from 'react-native-push-notification';

class Notifications {

   // ATTACH CONFIG
   constructor() {
      PushNotification.configure({
         onNotification: (notification) => {
            console.log('NOTIFICATION:', notification);
         }
      })
   }

   // SCHEDULE NOTIFICATION
   schedule(msg, seconds) {
      PushNotification.localNotificationSchedule({
         message: msg,
         date: new Date(Date.now() + (seconds * 1000)),
      });
   }
}

export default new Notifications();