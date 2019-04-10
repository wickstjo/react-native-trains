import React, { useContext } from 'react';
import { Context } from "../context";
import { on_load } from "../funcs/misc";
import { fetch_stations } from "../funcs/apis";

import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import Clickable from '../components/clickable';
import Table from '../components/table';

function Home({ navigation }) {

   // STATE
   const { state, dispatch } = useContext(Context);

   // ON INIT LOAD
   on_load(() => {
      fetch_stations(dispatch);
   })

   const goto_inspect = () => {
      navigation.navigate('Inspect')
   }

   return (
      <>
         <Header label={ 'Schedules' } />
         <Content>
            <Table data={ state.stations } />
         </Content>
         <Footer>
            <Clickable
               label={ 'Refresh' }
               func={ goto_inspect }
               bg={ '#29A947' }
            />
         </Footer>
      </>
   )
}

export default Home;