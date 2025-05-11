const fs = require('fs');
const { parseWeeklyMeasurements, filterDataByDate } = require('../src/globe_on_marker');

// JSON 파일 읽기
const rawData = fs.readFileSync('./public/ecarbon_gdsc_test.weekly_measurements.json');
const jsonData = JSON.parse(rawData);

// 2025-04-14 데이터 필터링
const filteredData = filterDataByDate(jsonData, '2025-04-14');

// 데이터 파싱
const parsedData = parseWeeklyMeasurements(filteredData);

// 파싱된 데이터 저장
fs.writeFileSync(
  './public/parsed_ecarbon_gdsc_test.weekly_measurements.json',
  JSON.stringify(parsedData, null, 2)
);

console.log('데이터 파싱 완료!');
