// JSON 데이터를 파싱하는 함수
export const parseWeeklyMeasurements = (jsonData) => {
  return jsonData.map(measurement => ({
    name: measurement.placeInfo.name,
    coordinates: [measurement.placeInfo.longitude, measurement.placeInfo.latitude],
    carbonEmission: measurement.carbonEmission,
    city: measurement.placeInfo.city,
    country: measurement.placeInfo.country
  }));
};

// 마커 색상 결정 함수
export const getMarkerColor = (emission) => {
  if (emission <= 1.5) return '#4CAF50'; // 초록색
  if (emission <= 2.5) return '#FFC107'; // 노란색
  return '#FF5252'; // 빨간색
};

// 파일에서 일자별 데이터 추출 함수
export const filterDataByDate = (jsonData, targetDate) => {
  return jsonData.filter(item => item.weekStartDate === targetDate);
};
