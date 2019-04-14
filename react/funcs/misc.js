import { ToastAndroid } from 'react-native';
import { useEffect, useRef } from 'react';

// PROMPT TOAST MESSAGE
function prompt(message) {
   ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
   )
}

// EXECUTE SOMETHING ONCE
function on_load(callback) {
   const did_run = useRef(false);

   useEffect(() => {
      if (!did_run.current) {
         callback();
         did_run.current = true;
      }
   })
}

// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

export {
   prompt,
   on_load,
   sleep
};