import React from 'react';
import { Text, FlatList } from 'react-native';
import Loading from './loading';

function Table({ data }) {
   if (data !== null) {
      return (
         <FlatList
            data={ Array.from(data) }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <Text>{ item[0] }</Text> }
            style={ styles.table }
         />
      )
   } else {
      return <Loading />
   }
}

const styles = {
   table: {
      padding: 5,
   },
   row: {
      padding: 10,
      flexDirection: 'row',
      backgroundColor: 'lightgray',
      marginBottom: 2
   }
}

export default Table;