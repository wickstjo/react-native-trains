import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { sleep, prompt } from "../funcs/misc";
import { fetch_train } from "../funcs/apis";
import Header from '../components/header';
import Content from '../components/content';

function Inspect({ navigation }) {

   // DECONSTRUCT INITIAL PARAMS
   const { id, speed, coords } = navigation.state.params.data;

   // TRAIN STATE
   const [state, setState] = useState({
      id: id,
      speed: speed,
      coords: coords
   })

   // CHECK FOR UPDATES EVERY 5MS
   const update = () => {
      sleep(15000).then(() => {
         fetch_train(state.id).then((response) => {

            // IF QUERY RESPONDS
            if (response !== null) {

               // UPDATE STATE
               setState(response);

               // PROMPT SUCCESS & START ANOTHER TIMER
               prompt('Updated params!')
               update();
   
            // OTHERWISE, PROMPT ERROR
            } else { prompt('Train has stopped!') }
         })
      });
   }

   return (
      <>
         <Header label={ `#${ state.id } (${ state.speed } km/h)` } />
         <Content>
            <Text>{ JSON.stringify(state.coords) }</Text>
         </Content>
      </>
   )
}

export default Inspect;