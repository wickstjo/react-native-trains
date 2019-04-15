import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { sleep, prompt } from "../funcs/misc";
import { fetch_train } from "../funcs/apis";
import Header from '../components/header';
import Content from '../components/content';

function Inspect({ navigation }) {

   // DECONSTRUCT INITIAL DATA & STATION PARAMS
   const { id, speed, coords } = navigation.state.params.data;
   const { start, end } = navigation.state.params.stations;

   // TRAIN STATE
   const [train, setTrain] = useState({
      id: id,
      speed: speed,
      coords: coords
   });

   // REGION STATE
   const [region, setRegion] = useState({
      latitude: train.coords.latitude,
      longitude: train.coords.longitude,
      latitudeDelta: 1,
      longitudeDelta: 1,
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
            fetch_train(train.id).then((response) => {

               // IF QUERY RESPONDS, UPDATE STATE
               if (response !== null) {
                  setTrain(response);
            
                  // PROMPT SUCCESS & START ANOTHER TIMER
                  prompt('Updated params!');
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
         <Header label={ `#${ train.id } (${ train.speed } km/h)` } />
         <Content>
            <MapView provider={ PROVIDER_GOOGLE } style={ styles.container } initialRegion={ region }>
               <Marker
                  coordinate={ train.coords }
                  title={ '#' + train.id }
               />
               <MapViewDirections
                  origin={ start }
                  destination={ end }
                  apikey={ 'AIzaSyBcbkfxWDiiWg6sjnkWHdsrsW7-bT7tfE8' }
                  mode={ 'transit' }
                  strokeWidth={ 3 }
                  strokeColor={ 'hotpink' }
               />
            </MapView>
         </Content>
      </>
   )
}

const styles = {
   container: {
      flex: 1,
      backgroundColor: '#84DD84'
   }
}

export default Inspect;