import React from 'react';
import moment from 'moment';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { prompt } from "../funcs/misc";
import notification from "../funcs/notifications";

function Row({ item, inspect }) {

   // IF NAME IS MISSING, FALLBACK TO TYPE
   const header = (item.name === '') ? item.type : item.name;

   // HIGHLIGHT MOVING TRAINS
   const highlight = () => {
      if (item.moving) {
         return {
            backgroundColor: '#DAA5D7',
            borderBottomColor: '#BF85BC',
         }
      }
   }

   // SCHEDULE LOCAL NOTIFICATION
   const schedule = (item) => {

      // NOW + 1H
      const now = Date.now() + 3600000;

      // IF TRAIN HASNT DEPARTED YET
      if (item.time.origin > now) {

         // PROMPT SUCCESS
         prompt('Train #' + item.number + ' reminders scheduled!');

         // SCHEDULE 60m REMINDER
         notification.schedule({
            message: 'Train #' + item.number + ' is scheduled to leave in 60min!',
            timestamp: item.time.origin - 3600000,
            number: item.number,
            origin: item.origin
         });

         // SCHEDULE 30m REMINDER
         notification.schedule({
            message: 'Train #' + item.number + ' is scheduled to leave in 30min!',
            timestamp: item.time.origin - 1800000,
            number: item.number,
            origin: item.origin
         });

         // SCHEDULE 15m REMINDER
         notification.schedule({
            message: 'Train #' + item.number + ' is scheduled to leave in 15min!',
            timestamp: item.time.origin - 900000,
            number: item.number,
            origin: item.origin
         });
         
         // SCHEDULE 5m REMINDER
         notification.schedule({
            message: 'Train #' + item.number + ' is scheduled to leave in 5min!',
            timestamp: item.time.origin - 300000,
            number: item.number,
            origin: item.origin
         });
      
      // OTHERWISE, PROMPT ERROR
      } else { prompt('Train has already departed!') }
   }
   
   return (
      <View style={ styles.container }>
         <TouchableWithoutFeedback onPress={() => { inspect(item) }}>
            <View style={{ ...styles.primary, ...highlight() }}>
               <Text style={ styles.first }>
                  { item.type + ' ' + item.number }
               </Text>
               <Text style={ styles.column }>
                  { header }
               </Text>
               <Text style={ styles.column }>
                  { item.time.duration }m
               </Text>
               <Text style={ styles.column }>
                  { moment(item.time.origin).format('H:mm') }
               </Text>
            </View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback onPress={() => { schedule(item) }}>
            <View style={ styles.subscribe }>
               <Text style={ styles.text }>SUB</Text>
            </View>
         </TouchableWithoutFeedback>
      </View>
   )
}

const styles = {
   container: {
      flex: 1,
      flexDirection: 'row'
   },
   primary: {
      flex: 3,
      padding: 10,
      flexDirection: 'row',
      marginBottom: 3,
      backgroundColor: 'lightgray',
      borderBottomWidth: 1,
      borderBottomColor: '#BCBCBC',
   },
   first: {
      textAlign: 'left',
      flex: 2
   },
   column: {
      flex: 1,
      textAlign: 'right',
      fontSize: 15,
      fontFamily: 'verdana',
   },
   subscribe: {
      backgroundColor: '#9F56D2',
      borderBottomWidth: 1,
      borderBottomColor: '#9147C4',
      padding: 10,
      marginLeft: 3,
      marginBottom: 3,
   },
   text: {
      fontSize: 15,
      fontFamily: 'verdana',
      color: 'white',
   }
}

export default Row;