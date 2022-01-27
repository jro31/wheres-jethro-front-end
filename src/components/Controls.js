import useCentreMap from '../hooks/use-centre-map';

const Controls = props => {
  const centreMap = useCentreMap();

  return (
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
  );
};

export default Controls;
