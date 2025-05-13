import React, { useState } from 'react';
import './Ranking.css';

const Ranking = () => {
  const [rankingType, setRankingType] = useState('overall');
  
  // 예시 데이터 - 실제로는 API에서 가져와야 합니다
  const rankings = {
    overall: [
      { rank: 1, domain: 'donga.ac.kr', score: 95, country: 'South Korea' },
      { rank: 2, domain: 'korea.ac.kr', score: 92, country: 'South Korea' },
      { rank: 3, domain: 'yonsei.ac.kr', score: 88, country: 'South Korea' },
      { rank: 4, domain: 'snu.ac.kr', score: 85, country: 'South Korea' },
      { rank: 5, domain: 'inha.ac.kr', score: 82, country: 'South Korea' },
      { rank: 6, domain: 'chungbuk.ac.kr', score: 79, country: 'South Korea' },
      { rank: 7, domain: 'chungnam.ac.kr', score: 76, country: 'South Korea' },
      { rank: 8, domain: 'yonsei.ac.kr', score: 73, country: 'South Korea' },
      { rank: 9, domain: 'inha.ac.kr', score: 70, country: 'South Korea' },
      { rank: 10, domain: 'inha.ac.kr', score: 68, country: 'South Korea' }
    ],
    sustainability: [
      { rank: 1, domain: 'inha.ac.kr', score: 97, country: 'South Korea' },
      { rank: 2, domain: 'donga.ac.kr', score: 94, country: 'South Korea' },
      { rank: 3, domain: 'korea.ac.kr', score: 91, country: 'South Korea' },
      { rank: 4, domain: 'chungbuk.ac.kr', score: 88, country: 'South Korea' },
      { rank: 5, domain: 'chungnam.ac.kr', score: 85, country: 'South Korea' }
    ]
  };

  const handleFilterChange = (e) => {
    setRankingType(e.target.value);
  };

  return (
    <div className="ranking-container">
      <h1>친환경 기업 순위</h1>
      
      <div className="filter-container">
        <select value={rankingType} onChange={handleFilterChange}>
          <option value="overall">종합 순위</option>
          <option value="sustainability">Sustainability</option>
        </select>
      </div>

      <div className="ranking-description">
        {rankingType === 'overall' && <p>모든 환경 지표를 종합한 기업별 순위입니다.</p>}
        {rankingType === 'energy' && <p>에너지 사용 효율성 및 재생 에너지 사용률을 기준으로 한 순위입니다.</p>}
        {rankingType === 'water' && <p>물 사용량 절감 및 수자원 관리를 기준으로 한 순위입니다.</p>}
        {rankingType === 'waste' && <p>폐기물 발생량 감소 및 재활용률을 기준으로 한 순위입니다.</p>}
      </div>
      
      <div className="ranking-table-container">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>도메인</th>
              <th>국가</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {rankings[rankingType].map((item) => (
              <tr key={item.rank}>
                <td>{item.rank}</td>
                <td>{item.domain}</td>
                <td>{item.country}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="ranking-info">
        <h3>평가 기준</h3>
        <p>
          Greenee의 친환경 기업 평가는 에너지 사용, 물 사용, 폐기물 관리, 탄소 배출량 등 
          다양한 환경 지표를 분석하여 산출됩니다. 모든 평가는 검증된 데이터를 기반으로 
          공정하게 이루어집니다.
        </p>
        <p>
          더 자세한 평가 방법론은 <a href="#">여기</a>에서 확인하실 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Ranking;