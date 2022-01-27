const useGetCurrentLocation = () => {
  const getCurrentLocation = setCurrentLocation => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const success = position => {
      const coordinates = position.coords;

      setCurrentLocation({
        success: true,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        accuracy: coordinates.accuracy,
      });
    };

    const error = err => {
      setCurrentLocation({
        success: false,
        error: `ERROR(${err.code}): ${err.message}`,
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return getCurrentLocation;
};

export default useGetCurrentLocation;
