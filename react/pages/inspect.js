import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';
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
   });

   // CURRENTLY MOUNTED STATE
   const mounted = useRef(true);

   // COMPONENT MOUNT/UNMOUNT EFFECTS
   useEffect(() => {

      // ON MOUNT, START TIMER
      mounted.current = true;
      update();

      // ON UNMOUNT, STOP TIMER
      return () => {
         mounted.current = false;
      }

   }, []);

   // CHECK FOR UPDATES EVERY 15s
   const update = () => {
      sleep(15000).then(() => {
         if (mounted.current) {
            fetch_train(state.id).then((response) => {

               // IF QUERY RESPONDS, UPDATE STATE
               if (response !== null) {
                  setState(response);
            
                  // PROMPT SUCCESS & START ANOTHER TIMER
                  prompt('Updated params!')
                  update();
            
               // OTHERWISE, PROMPT ERROR & STOP CHECKING
               } else {
                  prompt('Train has stopped!');
                  mounted.current = false;
               }
            })
         }
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