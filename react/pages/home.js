import React, { useContext, useState } from 'react';
import { Context } from "../context";
import { on_load, prompt } from "../funcs/misc";
import { fetch_stations, fetch_route, fetch_train } from "../funcs/apis";

import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import Clickable from '../components/clickable';
import Table from '../components/table';
import Find from '../components/find';

function Home({ navigation }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // INPUT STATE
   const [input_state, set_input_state] = useState({
      origin: {
         value: '',
         status: false,
      },
      destination: {
         value: '',
         status: false,
      }
   });

   // ON INIT LOAD, DO
   on_load(() => {
      fetch_stations(dispatch);
      fetch_route('KKN', 'HKI', dispatch);
   })

   // INSPECT TRAIN
   const goto_inspect = (number) => {
      fetch_train(number).then((response) => {

         // IF QUERY RESPONDS WITH COORDS
         if (response !== null) {

            // OPEN MAP INSPECTOR
            navigation.navigate(
               'Inspect',
               { data: response }
            );

         // OTHERWISE, PROMPT ERROR
         } else { prompt('Train is not in movement!') }
      })
   }

   // REFRESH QUERY
   const refresh = () => {

      // CHECK DESTINATION
      if (input_state.origin.status && input_state.destination.status) {

         // CHECK IF THEY ARE THE SAME
         if (input_state.origin.value !== input_state.destination.value) {

            // UPDATE STATE ROUTE
            fetch_route(
               state.stations.get(input_state.origin.value),
               state.stations.get(input_state.destination.value),
               dispatch

            // AFTERWARDS, PROMPT SUCCESS
            ).then(() => { prompt('Schedule Updated!') });

         } else { prompt('Stations cannot be the same!') }
      } else { prompt('One or both of the stations are invalid!') }
   }

   return (
      <>
         <Header label={ 'Schedule' } />
         <Find
            input_state={ input_state }
            set_input_state={ set_input_state }
            stations={ state.stations }
         />
         <Content>
            <Table
               data={ state.route }
               inspect={ goto_inspect }
            />
         </Content>
         <Footer>
            <Clickable
               label={ 'Refresh' }
               func={ refresh }
            />
         </Footer>
      </>
   )
}

export default Home;