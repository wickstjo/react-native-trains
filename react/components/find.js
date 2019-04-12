import React from 'react';
import { View, Text } from 'react-native';
import Input from './input';

function Find() { return (
   <View style={ styles.container }>
      <View style={ styles.column }>
         <Input placeholder='Origin' />
      </View>
      <View style={{ ...styles.column, ...styles.spacing }}>
         <Input placeholder='Destination' />
      </View>
   </View>
)}

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