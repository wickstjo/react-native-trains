import axios from 'axios';

function fetch_stations(dispatch) {
   return axios.get('https://rata.digitraffic.fi/api/v1/metadata/stations').then((response) => {

      // DECLARE STATIONS HASHMAP
      const stations = new Map();

      // FILL THE HASHMAP
      response.data.forEach(station => {
         stations.set(
            station.stationName.toLowerCase(),
            station.stationShortCode
         );
      });

      // UPDATE STATE
      dispatch({
         type: 'stations',
         payload: stations
      })
   });
}

function fetch_route(origin, destination)  {
   console.log('route query');
}

function fetch_train(id) {
   console.log('train query');
}

export {
   fetch_stations,
   fetch_route,
   fetch_train
};