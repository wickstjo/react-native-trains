import React from 'react';
import { Text, View } from 'react-native';

function Header({ label }) { return (
   <View style={ styles.container }>
      <View>
         <Text>React Trains</Text>
      </View>
      <View style={{ flex: 1 }}>
         <Text style={ styles.alignment }>
            { label }
         </Text>
      </View>
   </View>
)}

const styles = {
   container: {
      backgroundColor: 'lightgray',
      padding: 15,
      flexDirection: 'row'
   },
   alignment: {
      textAlign: 'right',
      textTransform: 'capitalize'
   }
}

export default Header;