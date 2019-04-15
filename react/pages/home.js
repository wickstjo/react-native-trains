import React, { useContext, useState } from 'react';
import { Context } from "../context";
import { on_load, prompt, sleep } from "../funcs/misc";
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

   // ON INIT LOAD, FETCH STATION SHORTCODES
   on_load(() => {
      fetch_stations(dispatch);
   })

   // INSPECT TRAIN
   const goto_inspect = (train) => {
      fetch_train(train.number).then((response) => {

         // IF QUERY RESPONDS WITH COORDS
         if (response !== null) {

            // OPEN MAP INSPECTOR
            navigation.navigate(
               'Inspect',
               {
                  details: train,
                  _query: response
               }
            );

         // OTHERWISE, PROMPT ERROR
         } else { prompt('Train is not in movement!') }
      })
   }

   // SEARCH FOR ROUTE
   const search = () => {

      // CHECK INPUT STATUS
      if (input_state.origin.status && input_state.destination.status) {

         // CHECK IF VALUES ARE THE SAME
         if (input_state.origin.value !== input_state.destination.value) {
            
            // PROMPT LOADING SPINNER
            dispatch({
               type: 'route',
               payload: 'loading'
            })

            // UPDATE STATE ROUTE
            fetch_route(
               input_state.origin.value,
               input_state.destination.value,
               dispatch,
               state.stations

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
               label={ 'Search' }
               func={ search }
            />
         </Footer>
      </>
   )
}

export default Home;