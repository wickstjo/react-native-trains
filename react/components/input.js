import React, { useContext, useState } from 'react';
import { Context } from "../context";
import { TextInput } from 'react-native';

function Input({ placeholder }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local_state, set_local_state] = useState({
      value: '',
      found: false
   });

   // FILL IN CORRECT COLOR
   const colorize = () => {
      if (local_state.found) {
         return {
            ...styles.shared,
            ...styles.success
         }
      } else {
         return {
            ...styles.shared,
            ...styles.error
         }
      }
   }

   // CHECK IF THE STATION EXISTS IN HASHMAP
   const check = (text) => {
      set_local_state({
         value: text,
         found: state.stations.has(text.toLowerCase()) ? true : false
      });
   }

   return (
      <TextInput
         placeholder={ placeholder }
         style={ colorize() }
         placeholderTextColor='white'
         onChangeText={ check }
         value={ local_state.value }
      />
   )
}

const styles = {
   shared: {
      borderBottomWidth: 1,
      padding: 5,
      paddingLeft: 10,
      color: 'white',
      textShadowOffset: {
         width: 1,
         height: 1
      },
      textShadowRadius: 1,
      fontSize: 15,
      fontFamily: 'verdana',
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

export default Input;