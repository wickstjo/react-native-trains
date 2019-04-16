import React from 'react';
import { View, FlatList, Text } from 'react-native';
import Loading from './loading';
import Row from './row';

function Table({ data, inspect }) {
  switch(data) {

      // WHEN LOADING
      case 'loading':
         return <Loading />

      // IN API ERROR
      case 'error':
         return (
            <View style={ styles.null_container }>
               <Text style={ styles.null_inner }>
                  API Error. Try again!
               </Text>
            </View>
         )
      
      // WHEN NOTHING HAS BEEN SEARCHED FOR
      case null:
         return (
            <View style={ styles.null_container }>
               <Text style={ styles.null_inner }>
                  Search For Something
               </Text>
            </View>
         )

      // FALLBACK
      default:
         return (
            <View style={ styles.container }>
               <FlatList
                  data={ data }
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => <Row item={ item } inspect={ inspect } /> }
               />
            </View>
         )
  }
}

const styles = {
   container: {
      padding: 5,
      paddingBottom: 2
   },
   null_container: {
      flex: 1,
      justifyContent: 'center'
   },
   null_inner: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'verdana',
   }
}

export default Table;