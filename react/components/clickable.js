import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

function Clickable({ label, func }) { return (
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
      padding: 15,
      flex: 1
   },
   text: {
      textAlign: 'center',
      fontSize: 15,
      fontFamily: 'verdana',
      color: 'white',
      textShadowColor: '#0E375C',
      textShadowOffset: {
         width: 1,
         height: 1
      },
      textShadowRadius: 1
   },
}

export default Clickable;