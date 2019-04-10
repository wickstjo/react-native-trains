import React from 'react';
import { View } from 'react-native';

function Content({ children }) { return (
   <View style={ styles.container }>
      { children }
   </View>
)}

const styles = {
   container: {
      flex: 1
   }
}

export default Content;