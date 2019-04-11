import React from 'react';
import { View } from 'react-native';

function Footer({ children }) { return (
   <View style={ styles.container }>
      { children }
   </View>
)}

const styles = {
   container: {
      flexDirection: 'row',
      backgroundColor: '#6A94E1',
   }
}

export default Footer;