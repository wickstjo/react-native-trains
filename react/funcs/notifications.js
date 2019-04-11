import PushNotification from 'react-native-push-notification';

class Notifications {
   constructor() {
      PushNotification.configure({
         onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification);
         }
      });
   }

   schedule() {
      PushNotification.localNotificationSchedule({
         message: "My Notification Message",
         date: new Date(Date.now() + 5000)
      });
   }
}

export default new Notifications();