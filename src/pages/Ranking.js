import React, { useState } from 'react';
import './Ranking.css';

const Ranking = () => {
  // 예시 데이터 - 실제로는 API에서 가져와야 합니다
  const [displayCount, setDisplayCount] = useState(5);
  const [websites] = useState([
    { rank: 1, domain: 'New Uzbekistan University', country: 'Uzbekistan', score: 0.01, grade: 'A+' },
    { rank: 2, domain: 'Olabisi Onabanjo University', country: 'Nigeria', score: 0.02, grade: 'A+' },
    { rank: 3, domain: 'Mehran University of Engineering and Technology', country: 'Pakistan', score: 0.04, grade: 'A' },
    { rank: 4, domain: 'University of Michigan', country: 'United States', score: 0.04, grade: 'A' },
    { rank: 5, domain: 'Birzeit University', country: 'Unknown', score: 0.04, grade: 'A' },
    { rank: 6, domain: 'Samsun Universitesi', country: 'Türkiye', score: 0.04, grade: 'A' },
    { rank: 7, domain: 'Sunway University', country: 'Malaysia', score: 0.04, grade: 'A' },
    { rank: 8, domain: 'Adekunle Ajasin University', country: 'Nigeria', score: 0.04, grade: 'A' },
    { rank: 9, domain: 'Monash University Clayton Campus', country: 'Australia', score: 0.04, grade: 'A' },
    { rank: 10, domain: 'Utah Valley University', country: 'United States', score: 0.04, grade: 'A' },
  ]);

  const handleShowMore = () => {
    setDisplayCount(prev => Math.min(prev + 5, websites.length));
  };

  return (
    <div className="ranking-container">
      <h1>Eco-Friendly Website Rankings</h1>
      
      <div className="ranking-description">
        <p>Overall rankings based on website environmental sustainability assessment.</p>
      </div>
      
      <div className="ranking-table-container">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Institution</th>
              <th>Country</th>
              <th>Carbon Emissions (g)</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {websites.slice(0, displayCount).map((item) => (
              <tr key={item.rank}>
                <td>{item.rank}</td>
                <td>{item.domain}</td>
                <td>{item.country}</td>
                <td>{item.score}</td>
                <td>{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="ranking-info">
        <h3>Assessment Criteria</h3>
        <p>
          Greenee's eco-friendly website assessment is based on W3C's WSG guidelines
          and website carbon footprint measurements.
        </p>
        <p>
          For more detailed methodology, click <a href="#">here</a>.
        </p>
      </div>
      {displayCount < websites.length && (
        <div className="show-more-container">
          <button className="show-more-button" onClick={handleShowMore}>
            Show More Rankings
          </button>
        </div>
      )}
    </div>
  );
};

export default Ranking;