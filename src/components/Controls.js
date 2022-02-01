import useCentreMap from '../hooks/use-centre-map';
import Button from './ui/Button';

const Controls = props => {
  const centreMap = useCentreMap();

  return (
    <div>
      <Button
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
      </Button>
    </div>
  );
};

export default Controls;
