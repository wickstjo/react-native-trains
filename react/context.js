import React, { createContext, useReducer } from "react";

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // SET STATION HASHMAP
      case 'stations': {
         return {
            ...state,
            stations: action.payload
         }
      }
      
      // SET ROUTE TRAINS
      case 'route': {
         return {
            ...state,
            route: action.payload
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
function Provider({ children }) {

   // ATTACH THE REDUCER WITH THE INITIAL STATE
   const [state, dispatch] = useReducer(reducer, {
      stations: null,
      route: null
   });

   return (
      <Context.Provider value={{ state, dispatch }}>
         { children }
      </Context.Provider>
   );
}

export {
   Context,
   Provider
};