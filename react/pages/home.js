import React, { useContext, useState } from 'react';
import { Context } from "../context";
import { on_load } from "../funcs/misc";
import { fetch_stations, fetch_route } from "../funcs/apis";

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

   // GOTO INSPECT SCREEN
   const goto_inspect = () => {
      navigation.navigate('Inspect');
      //notification.schedule('foo-bar-biz', 5);
   }

   const refresh = () => {
      fetch_route('KKN', 'HKI', dispatch);
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
            <Table data={ state.route } />
         </Content>
         <Footer>
            <Clickable
               label={ 'Refresh' }
               func={ goto_inspect }
            />
         </Footer>
      </>
   )
}

export default Home;