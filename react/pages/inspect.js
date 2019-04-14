import React from 'react';
import { Text, View } from 'react-native';
import Header from '../components/header';
import Content from '../components/content';

function Inspect({ navigation }) {

   // DECONSTRUCT RELEVANT PARAMS & GENERATE HEADER
   const { id, speed, coords } = navigation.state.params.data;
   const header = '#' + id + ' (' + speed + ' km/h)';

   return (
      <>
         <Header label={ header } />
         <Content>
            <Text>{ JSON.stringify(coords) }</Text>
         </Content>
      </>
   )
}

export default Inspect;