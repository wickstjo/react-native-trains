import React from 'react';
import { Text, View } from 'react-native';

function Content() { return (
   <View style={ styles.container }>
      <Text>Content</Text>
   </View>
)}

const styles = {
   container: {
      flex: 1
   }
}

export default Content;