import React from 'react';
import { TextInput } from 'react-native';

function Input({ placeholder, block, update }) {

   // FILL IN CORRECT COLOR
   const colorize = () => {
      if (block.status) {
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

   return (
      <TextInput
         placeholder={ placeholder }
         style={ colorize() }
         placeholderTextColor='white'
         onChangeText={ update }
         value={ block.value }
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