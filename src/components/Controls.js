import useCentreMap from '../hooks/use-centre-map';

const Controls = props => {
  const centreMap = useCentreMap();

  return (
    <div>
      <button
        onClick={() =>
          centreMap(
            props.checkInLocations,
            props.setSelectedMarker,
            props.viewport,
            props.setViewport
          )
        }
      >
        Centre map
      </button>
    </div>
  );
};

export default Controls;
