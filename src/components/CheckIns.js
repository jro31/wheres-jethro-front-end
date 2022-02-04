import { Fragment } from 'react';
import LocationCard from './LocationCard';

const CheckIns = props => {
  return (
    <Fragment>
      {props.checkInLocations &&
        props.checkInLocations.map((location, index) => (
          <LocationCard
            key={location.id}
            location={location}
            index={index}
            selected={props.selectedMarker && props.selectedMarker.id === location.id}
            setSelectedMarker={props.setSelectedMarker}
            viewport={props.viewport}
            setViewport={props.setViewport}
            setDisplayCheckIns={props.setDisplayCheckIns}
          />
        ))}
    </Fragment>
  );
};

export default CheckIns;
