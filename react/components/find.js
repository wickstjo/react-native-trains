import React from 'react';
import { View } from 'react-native';
import Input from './input';

function Find({ input_state, set_input_state, stations }) {

   // UPDATE ORIGIN
   const update_origin = (text) => {
      set_input_state({
         ...input_state,
         origin: {
            value: text,
            status: exists(text)
         }
      })
   }

   // UPDATE DESTINATION
   const update_destination = (text) => {
      set_input_state({
         ...input_state,
         destination: {
            value: text,
            status: exists(text)
         }
      })
   }

   // CHECK IF QUERY EXISTS IN ACRONYM HASHMAP -- FORCE LOWERCASE
   const exists = (text) => {
      return stations.has(text.toLowerCase()) ? true : false
   }

   return (
      <View style={ styles.container }>
         <View style={ styles.column }>
            <Input
               placeholder='Origin'
               block={ input_state.origin }
               update={ update_origin }
            />
         </View>
         <View style={{ ...styles.column, ...styles.spacing }}>
            <Input
               placeholder='Destination'
               block={ input_state.destination }
               update={ update_destination }
            />
         </View>
      </View>
   )
}

const styles = {
   container: {
      flexDirection: 'row',
      padding: 5,
      paddingBottom: 0
   },
   column: {
      flex: 1,
   },
   inner: {
      borderBottomWidth: 1,
      padding: 10,
      color: 'white',
      textShadowOffset: {
         width: 1,
         height: 1
      },
      textShadowRadius: 1
   },
   spacing: {
      marginLeft: 5
   },
   error: {
      backgroundColor: '#D37B7B',
      borderBottomColor: '#A86262',
      textShadowColor: '#905656',
   },
   success: {
      backgroundColor: '#61B869',
      borderBottomColor: '#4C9D54',
      textShadowColor: '#215E27',
   }
}

export default Find;