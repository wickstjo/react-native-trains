import React, { useContext } from 'react';
import { Context } from "../context";
import { Text, View } from 'react-native';

import apis from "../funcs/apis";

function Home({ navigation }) {

   // STATE
   const { state, dispatch } = useContext(Context);

   const goto_inspect = () => {
      navigation.navigate('Inspect')
   }

   return (
      <View>
         <Text onPress={ goto_inspect }>Home</Text>
      </View>
   )
}

export default Home;