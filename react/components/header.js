import React from 'react';
import { Text, View } from 'react-native';

function Header({ label }) { return (
   <View style={ styles.container }>
      <View>
         <Text style={ styles.font }>React Trains</Text>
      </View>
      <View style={{ flex: 1 }}>
         <Text style={{ ...styles.font, ...styles.alignment }}>
            { label }
         </Text>
      </View>
   </View>
)}

const styles = {
   container: {
      backgroundColor: '#6A94E1',
      padding: 15,
      flexDirection: 'row'
   },
   alignment: {
      textAlign: 'right',
      textTransform: 'capitalize'
   },
   font: {
      fontSize: 15,
      fontFamily: 'verdana',
      color: 'white',
      textShadowColor: '#0E375C',
      textShadowOffset: {
         width: 1,
         height: 1
      },
      textShadowRadius: 1
   }
}

export default Header;