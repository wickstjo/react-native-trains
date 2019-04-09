import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from "./context";

import Home from './pages/home';
import Inspect from './pages/inspect';

function App() { return (
   <Provider>
      <AppContainer />
   </Provider>
)}

const MainNavigator = createStackNavigator({
   Home: {
      screen: Home,
      navigationOptions: {
         header: null,
      },
   },
   Inspect: {
      screen: Inspect,
      navigationOptions: {
         header: null
      }
   },
});

const AppContainer = createAppContainer(MainNavigator);
export default App;