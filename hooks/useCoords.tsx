import React, { useEffect, useState } from 'react';

interface ICoords {
  longitude?: number;
  latitude?: number;
}

/**
 * 위치 정보를 가져오는 훅
 * @returns
 */
export default function useCoords() {
  const [coords, setCoords] = useState<ICoords>({ longitude: undefined, latitude: undefined });

  const onSuccess = ({ coords: { latitude, longitude } }: GeolocationPosition) => {
    setCoords({
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
