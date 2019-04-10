import React, { createContext, useReducer } from "react";

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // INCREMENT
      case 'stations': {
         return {
            ...state,
            stations: action.payload
         }
      }

      // FALLBACK
      default: {
         return state;
      }
   }
};

// DECLARE CONTEXT
const Context = createContext();

// CONTEXT PROVIDER
function Provider(props) {

   // ATTACH THE REDUCER WITH THE INITIAL STATE
   const [state, dispatch] = useReducer(reducer, {
      stations: null
   });

   return (
      <Context.Provider value={{ state, dispatch }}>
         { props.children }
      </Context.Provider>
   );
}

export {
   Context,
   Provider
};