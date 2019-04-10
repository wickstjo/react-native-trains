import React from 'react';
import { View } from 'react-native';

function Footer({ children }) { return (
   <View style={ styles.container }>
      { children }
   </View>
)}

const styles = {
   container: {
      flexDirection: 'row'
   }
}

export default Footer;