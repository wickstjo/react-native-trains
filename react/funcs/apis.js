import axios from 'axios';
import moment from 'moment';

// FIND STATION ACRONYMS
function fetch_stations(dispatch) {
   axios.get('https://rata.digitraffic.fi/api/v1/metadata/stations').then((response) => {

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

// FIND TRAINS GOING FROM X TO Y
function fetch_route(origin, destination, dispatch)  {

   // GENERATE DATE
   const today = moment().format("YYYY-MM-DD");

   // EXECUTE REQUEST
   axios.get('https://rata.digitraffic.fi/api/v1/live-trains/station/' + origin + '/' + destination + '?departure_date=' + today).then((response) => {
   
      // DECLARE TRAINS HASHMAP
      const trains = [];

      // FILL THE HASHMAP
      response.data.forEach(train => {
         let start, end;

         // FIND START/END TIMESTAMPS & CONVERT TO UNIX
         train.timeTableRows.forEach(waypoint => {
            if (waypoint.stationShortCode === origin) {
               start = Date.parse(waypoint.scheduledTime)
            }
            if (waypoint.stationShortCode === destination) {
               end = Date.parse(waypoint.scheduledTime)
            }
         });
         
         // CONSTRUCT TRAIN OBJECT
         trains.push({
            status: train.cancelled,
            name: train.commuterLineID,
            type: train.trainType,
            moving: train.runningCurrently,
            id: train.trainNumber,
            start: start,
            end: end,
            duration: ((end - start) / 1000) / 60
         })
      });

      // UPDATE STATE
      dispatch({
         type: 'route',
         payload: trains
      })
   });
}

function fetch_train(id) {
   console.log('train query');
}

export {
   fetch_stations,
   fetch_route,
   fetch_train
};