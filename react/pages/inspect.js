import React, { useContext } from 'react';
import { Context } from "../context";
import { Text, View } from 'react-native';

function Inspect({ navigation }) {

   // STATE
   const { state, dispatch } = useContext(Context);

   const goto_home = () => {
      navigation.navigate('Home')
   }

   return (
      <View>
         <Text onPress={ goto_home }>Inspect</Text>
      </View>
   )
}

export default Inspect;