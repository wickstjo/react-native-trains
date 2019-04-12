import PushNotification from 'react-native-push-notification';

class Notifications {
   constructor() {
      PushNotification.configure({
         onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification);
         }
      });
   }

   schedule(msg, seconds) {
      PushNotification.localNotificationSchedule({
         message: msg,
         date: new Date(Date.now() + (seconds * 1000))
      });
   }
}

export default new Notifications();