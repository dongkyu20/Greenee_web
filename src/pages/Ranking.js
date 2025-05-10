import React, { useState } from 'react';
import './Ranking.css';

const Ranking = () => {
  const [rankingType, setRankingType] = useState('overall');
  
  // 예시 데이터 - 실제로는 API에서 가져와야 합니다
  const rankings = {
    overall: [
      { rank: 1, company: '그린테크', score: 95, industry: 'IT' },
      { rank: 2, company: '에코시스템', score: 92, industry: '에너지' },
      { rank: 3, company: '지구지킴이', score: 88, industry: '제조업' },
      { rank: 4, company: '블루오션', score: 85, industry: '서비스업' },
      { rank: 5, company: '그린라이프', score: 82, industry: '소매업' },
      { rank: 6, company: '클린에어', score: 79, industry: '에너지' },
      { rank: 7, company: '친환경건설', score: 76, industry: '건설업' },
      { rank: 8, company: '퓨처테크', score: 73, industry: 'IT' },
      { rank: 9, company: '에코퍼니처', score: 70, industry: '제조업' },
      { rank: 10, company: '그린푸드', score: 68, industry: '식품' }
    ],
    energy: [
      { rank: 1, company: '에코시스템', score: 97, industry: '에너지' },
      { rank: 2, company: '그린테크', score: 94, industry: 'IT' },
      { rank: 3, company: '클린에어', score: 91, industry: '에너지' },
      { rank: 4, company: '지구지킴이', score: 88, industry: '제조업' },
      { rank: 5, company: '그린에너지', score: 85, industry: '에너지' }
    ],
    water: [
      { rank: 1, company: '지구지킴이', score: 96, industry: '제조업' },
      { rank: 2, company: '블루오션', score: 93, industry: '서비스업' },
      { rank: 3, company: '에코시스템', score: 90, industry: '에너지' },
      { rank: 4, company: '워터세이버', score: 87, industry: '제조업' },
      { rank: 5, company: '그린테크', score: 84, industry: 'IT' }
    ],
    waste: [
      { rank: 1, company: '그린테크', score: 98, industry: 'IT' },
      { rank: 2, company: '리사이클킹', score: 95, industry: '제조업' },
      { rank: 3, company: '에코시스템', score: 92, industry: '에너지' },
      { rank: 4, company: '블루오션', score: 89, industry: '서비스업' },
      { rank: 5, company: '그린라이프', score: 86, industry: '소매업' }
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
          <option value="energy">에너지 절약</option>
          <option value="water">물 사용 효율성</option>
          <option value="waste">폐기물 관리</option>
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
              <th>기업명</th>
              <th>산업분야</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {rankings[rankingType].map((item) => (
              <tr key={item.rank}>
                <td>{item.rank}</td>
                <td>{item.company}</td>
                <td>{item.industry}</td>
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
