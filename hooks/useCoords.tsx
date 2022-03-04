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

  /**
   * ? Next는 가본적으로 pre-rendering 하기 때문에 서버의 기본값이 초기값으로 설정되어 랜더링된다.
   * ? 즉 클라이언트에서 이 Hook을 사용해도 처음에는 기본값인 undefinded가 출력된다..
   */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
