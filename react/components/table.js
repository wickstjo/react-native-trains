import React from 'react';
import { View, FlatList } from 'react-native';
import Loading from './loading';
import Row from './row';

function Table({ data, inspect }) {
   if (data !== null) {
      return (
         <View style={ styles.container }>
            <FlatList
               data={ data }
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => <Row item={ item } inspect={ inspect } /> }
            />
         </View>
      )

   // RENDER SPINNER WHILE REQUEST IS PENDING
   } else { return <Loading /> }
}

const styles = {
   container: {
      padding: 5,
      paddingBottom: 2
   }
}

export default Table;