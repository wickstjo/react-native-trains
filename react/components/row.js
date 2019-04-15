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

   // SCHEDULE A NOTIFICATION
   const schedule = (number) => {
      prompt('Train #' + number + ' scheduled!');
      notification.schedule('Train #' + number + ' is about to leave!', 3);
   }
   
   return (
      <TouchableWithoutFeedback onPress={() => { inspect(item.id, item.stations) }}>
         <View style={{ ...styles.container, ...highlight() }}>
            <Text style={ styles.first }>
               { item.type + ' ' + item.id }
            </Text>
            <Text style={ styles.column }>
               { header }
            </Text>
            <Text style={ styles.column }>
               { item.duration }m
            </Text>
            <Text style={ styles.column }>
               { moment(item.start).format('H:mm') }
            </Text>
         </View>
      </TouchableWithoutFeedback>
   )
}

const styles = {
   container: {
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
   }
}

export default Row;