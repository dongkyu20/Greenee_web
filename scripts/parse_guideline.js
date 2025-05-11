const fs = require('fs');

// JSON 파일 읽기
const rawData = fs.readFileSync('./scripts/wsg_guideline.json');
const wsgData = JSON.parse(rawData);

// 필요한 데이터만 추출
const parsedGuidelines = [];

// 모든 카테고리를 순회
wsgData.category.forEach(category => {
  // guidelines가 있는 경우만 처리
  if (category.guidelines) {
    category.guidelines.forEach(guide => {
      parsedGuidelines.push({
        categoryId: category.id,
        categoryName: category.name,
        guidelineId: guide.id,
        guideline: guide.guideline,
        // criteria: guide.criteria.map(crit => ({
        //   title: crit.title,
        //   description: crit.description
        // }))
      });
    });
  }
});

// 파싱된 데이터 저장
fs.writeFileSync(
  './public/second_parsed_wsg_guidelines.json',
  JSON.stringify(parsedGuidelines, null, 2)
);

console.log('가이드라인 파싱 완료!');