import React from 'react';
import moment from 'moment';
import { Text, View, FlatList } from 'react-native';
import Loading from './loading';

function Table({ data }) {
   if (data !== null) {
      return (
         <View style={ styles.container }>
            <FlatList
               data={ data }
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => <Row item={ item } /> }
            />
         </View>
      )

   // RENDER SPINNER WHILE REQUEST IS PENDING
   } else { return <Loading /> }
}

function Row({ item }) {

   // IF NAME IS MISSING, FALLBACK TO TYPE
   const header = (item.name === '') ? item.type : item.name;

   return (
      <View style={ styles.row }>
         <Text style={ styles.first }>
            { item.type + ' ' + item.id }
         </Text>
         <Text style={ styles.column }>
            { header }
         </Text>
         <Text style={ styles.column }>
            { moment(item.start).format('H:mm') }
         </Text>
         <Text style={ styles.column }>
            { item.duration }min
         </Text>
      </View>
   )
}

const styles = {
   container: {
      padding: 5,
      paddingBottom: 2
   },
   row: {
      padding: 10,
      flexDirection: 'row',
      backgroundColor: 'lightgray',
      marginBottom: 3,
      borderBottomWidth: 1,
      borderBottomColor: '#BCBCBC',
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