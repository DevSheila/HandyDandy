import MapView, { Marker } from "react-native-maps";
import React, { useState,useEffect, useRef } from "react";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";

import { GOOGLE_MAPS_API_KEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
import tailwind from "tailwind-react-native-classnames";
import sanityClient from "../sanity";



const Map = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<MapView>(null);

   const [markPoint, setmarkPoint] = useState<any[]>([])

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "user"]
    `
      )
      .then((data) => {
        setmarkPoint(data);
      });
  }, []);


  

  

  // useEffect(() => {
  //   if (!origin || !destination) return;

  //   //zoom and fit to markers
  //   mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
  //     edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
  //   });
  // }, [origin, destination]);


  useEffect(() => {
    if (!destination) return;

    //zoom and fit to markers
    mapRef.current?.fitToSuppliedMarkers(["destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [ destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

 

  return (

    
    <MapView
      ref={mapRef}
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825,
        longitude: origin?.location?.lng || -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      mapType="mutedStandard"
      style={tailwind`flex-1`}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="blue"
          lineDashPattern={[0]}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}


      {markPoint?.map((pointer) => 
          <Marker
          key={pointer.id}
          coordinate={{ latitude: pointer.location.lat, longitude: pointer.location.lng }}
          title={pointer.name}
          description={pointer.name}
          //  image={require("./icon.png")} 
          pinColor="green"
        >
        </Marker >
       )}

    </MapView>
  );
};

export default Map;
