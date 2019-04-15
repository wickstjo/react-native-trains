import axios from 'axios';
import moment from 'moment';

// FIND STATION ACRONYMS
function fetch_stations(dispatch) {
   axios.get('https://rata.digitraffic.fi/api/v1/metadata/stations').then((response) => {

      // DECLARE HASHMAPS
      const stations = new Map();

      // LOOP THROUGH STATIONS
      response.data.forEach(station => {

         // ADD FULL STATION
         stations.set(
            station.stationName.toLowerCase(),
            {
               code: station.stationShortCode,
               coords: {
                  longitude: station.longitude,
                  latitude: station.latitude
               }
            }
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
function fetch_route(origin, destination, dispatch, stations)  {

   // FETCH STATION PROPS
   origin = stations.get(origin);
   destination = stations.get(destination);

   // GENERATE TODAYS DATE
   const today = moment().format("YYYY-MM-DD");

   // EXECUTE REQUEST
   return axios.get('https://rata.digitraffic.fi/api/v1/live-trains/station/' + origin.code + '/' + destination.code + '?departure_date=' + today).then((response) => {
   
      // DECLARE TRAINS HASHMAP
      const trains = [];

      // FILL THE HASHMAP
      response.data.forEach(train => {
         let start, end;

         // FIND START/END TIMESTAMPS & CONVERT TO UNIX
         train.timeTableRows.forEach(waypoint => {
            if (waypoint.stationShortCode === origin.code) {
               start = Date.parse(waypoint.scheduledTime)
            }
            if (waypoint.stationShortCode === destination.code) {
               end = Date.parse(waypoint.scheduledTime)
            }
         });
         
         // CONSTRUCT TRAIN OBJECT
         trains.push({
            number: train.trainNumber,
            name: train.commuterLineID,
            type: train.trainType,
            moving: train.runningCurrently,
            time: {
               origin: start,
               destination: end,
               duration: ((end - start) / 1000) / 60
            },
            poly: {
               origin: origin.coords,
               destination: destination.coords,
            }
         })
      });

      // UPDATE STATE
      dispatch({
         type: 'route',
         payload: trains
      })
   });
}

// FETCH TRAIN INFO
function fetch_train(number) {
   return axios.get('https://rata.digitraffic.fi/api/v1/train-locations/latest/' + number).then((response) => {
      
      // IF DATA IS FOUND, FILTER GARBAGE & RETURN
      if (response.data.length === 1) {
         return {
            speed: response.data[0].speed,
            position: {
               longitude: response.data[0].location.coordinates[0],
               latitude: response.data[0].location.coordinates[1],
            }
         };

      // OTHERWISE, RESPOND WITH NULL
      } else { return null; }
   });
}

export {
   fetch_stations,
   fetch_route,
   fetch_train
};