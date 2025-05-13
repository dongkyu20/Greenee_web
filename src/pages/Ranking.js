import React, { useState } from 'react';
import './Ranking.css';

const Ranking = () => {
  const [rankingType, setRankingType] = useState('overall');
  
  // 예시 데이터 - 실제로는 API에서 가져와야 합니다
  const gradeColors = {
    'A+': '#ff5252',
    'A': '#4caf50',
    'B+': '#2196f3',
    'B': '#9c27b0',
    'C+': '#ff9800',
    'C': '#795548'
  };

  const rankings = {
    overall: [
      { rank: 1, name: 'Universitas Brawijaya', country: 'Indonesia', grade: 'A+', lastUpdate: '2025-05-05' },
      { rank: 2, name: 'German Jordanian University', country: 'Jordan', grade: 'A+', lastUpdate: '2025-05-05' },
      { rank: 3, name: 'Osaka Gakugei University', country: 'Japan', grade: 'A+', lastUpdate: '2025-05-05' },
      { rank: 4, name: 'Chung Shan Medical University', country: 'Taiwan', grade: 'A+', lastUpdate: '2025-05-05' },
      { rank: 5, name: 'University of Michigan', country: 'USA', grade: 'A', lastUpdate: '2025-05-05' },
      { rank: 6, name: 'Birzet University', country: 'Palestine', grade: 'A', lastUpdate: '2025-05-05' },
      { rank: 7, name: 'Lahore Garrison University', country: 'Pakistan', grade: 'A', lastUpdate: '2025-05-05' },
      { rank: 8, name: 'Sunway University', country: 'Malaysia', grade: 'A', lastUpdate: '2025-05-05' },
      { rank: 9, name: 'Mehran University of Engineering and Technology', country: 'Pakistan', grade: 'A', lastUpdate: '2025-05-05' },
      { rank: 10, name: 'Universitas Gunadarma Kampus D', country: 'Indonesia', grade: 'A', lastUpdate: '2025-05-05' }
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
      <div className="ranking-description">
        <p>마지막 업데이트: 2025-05-05</p>
      </div>
      
      <div className="ranking-table-container">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>기관명</th>
              <th>국가</th>
              <th>탄소 배출량</th>
              <th>등급</th>
            </tr>
          </thead>
          <tbody>
            {rankings[rankingType].map((item) => (
              <tr key={item.rank}>
                <td>{item.rank}</td>
                <td>{item.name}</td>
                <td>{item.country}</td>
                <td>20.5g</td>
                <td>
                  <span className="grade" style={{ backgroundColor: gradeColors[item.grade] }}>
                    {item.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="ranking-info">
        <h3>등급 기준</h3>
        <ul className="grade-list">
          <li><span className="grade-dot" style={{ backgroundColor: gradeColors['A+'] }}>A+</span> 우수한 탄소 배출 관리</li>
          <li><span className="grade-dot" style={{ backgroundColor: gradeColors['A'] }}>A</span> 일반적인 탄소 배출 관리</li>
          <li><span className="grade-dot" style={{ backgroundColor: gradeColors['B+'] }}>B+</span> 보통의 탄소 배출 관리</li>
          <li><span className="grade-dot" style={{ backgroundColor: gradeColors['B'] }}>B</span> 개선이 필요한 탄소 배출 관리</li>
          <li><span className="grade-dot" style={{ backgroundColor: gradeColors['C+'] }}>C+</span> 시급한 개선이 필요한 탄소 배출 관리</li>
          <li><span className="grade-dot" style={{ backgroundColor: gradeColors['C'] }}>C</span> 매우 시급한 개선이 필요한 탄소 배출 관리</li>
        </ul>
      </div>
    </div>
  );
};

export default Ranking;
