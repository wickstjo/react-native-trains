import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

function Footer({ label, func }) { return (
   <TouchableWithoutFeedback onPress={ func }>
      <View style={ styles.container }>
         <Text style={ styles.text }>
            { label }
         </Text>
      </View>
   </TouchableWithoutFeedback>
)}

const styles = {
   container: {
      backgroundColor: 'lightgray',
      padding: 15,
   },
   text: {
      textAlign: 'center'
   }
}

export default Footer;