import React, { useContext } from 'react';
import { Context } from "../context";
import { Text, View } from 'react-native';
import { prompt, on_load } from "../funcs/misc";
import { fetch_stations, fetch_route, fetch_train } from "../funcs/apis";

import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';

function Home({ navigation }) {

   // STATE
   const { state, dispatch } = useContext(Context);

   // ON INIT LOAD
   /* on_load(() => {
      fetch_stations(dispatch);
   }) */

   const goto_inspect = () => {
      navigation.navigate('Inspect')
   }

   // RENDER STATIONS
   stations = () => {
      if (state.stations != null) {
         return Array.from(state.stations).map((item, index) =>
            <Text key={ index }>{ item[0] }</Text>
         )
      }
   }

   return (
      <>
         <Header
            label={ 'Schedules' }
         />
         <Content />
         <Footer
            label={ 'Refresh' }
            func={ goto_inspect }
         />
      </>
   )
}

export default Home;