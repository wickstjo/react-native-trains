import React from 'react';
import { ActivityIndicator } from 'react-native';

function Loading() { return (
   <ActivityIndicator
      size={ 70 }
      color={ 'gray' }
      style={ styles.loading }
   />
)}

const styles = {
   loading: {
      flex: 1,
   }
}

export default Loading;