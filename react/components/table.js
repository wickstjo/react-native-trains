import React from 'react';
import moment from 'moment';
import { Text, View, FlatList } from 'react-native';
import Loading from './loading';

function Table({ data }) {
   if (data !== null) {
      return (
         <View style={{ padding: 2 }}>
            <FlatList
               data={ data }
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => <Row item={ item } /> }
            />
         </View>
      )
   } else {
      return <Loading />
   }
}

function Row({ item }) {
   return (
      <View style={ styles.row }>
         <Text style={styles.first }>
            { item.type + ' ' + item.id }
         </Text>
         <Text style={ styles.column }>
            { moment(item.start).format('hh:mm') }
         </Text>
         <Text style={ styles.column }>
            { moment(item.end).format('hh:mm') }
         </Text>
         <Text style={ styles.column }>
            { item.duration }min
         </Text>
      </View>
   )
}

const styles = {
   row: {
      padding: 10,
      flexDirection: 'row',
      backgroundColor: 'lightgray',
      marginBottom: 2
   },
   first: {
      textAlign: 'left',
       flex: 2
   },
   column: {
      flex: 1,
      textAlign: 'right'
   }
}

export default Table;