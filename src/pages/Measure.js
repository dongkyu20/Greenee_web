import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Measure.css';

const Measure = () => {
  const location = useLocation();
  const [url, setUrl] = useState(location.state?.url || '');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (location.state?.url) {
      handleMeasurement(location.state.url);
    }
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMeasurement(url);
  };

  const handleMeasurement = (targetUrl) => {
    setIsLoading(true);
    setUrl(targetUrl);
    
    // 웹사이트 탄소 배출량 측정 시뮬레이션
    setTimeout(() => {
      const carbonScore = Math.floor(Math.random() * 91) + 10; // 10-100 사이 임의의 점수
      const co2Grams = (Math.random() * 5).toFixed(2); // 0-5g 사이 임의의 CO2 배출량
      
      setResult({
        url: url,
        carbonScore,
        co2Grams,
        cleanerThan: Math.floor(Math.random() * 91) + 10, // 10-100 사이 임의의 퍼센트
        tips: [
          "이미지 최적화로 페이지 크기 줄이기",
          "서버 위치를 사용자에게 가깝게 설정",
          "화면 크기에 맞게 이미지 제공",
          "불필요한 JavaScript 제거",
          "지속 가능한 호스팅 서비스 사용"
        ]
      });
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="measure-container">
      <h1>웹사이트 탄소 배출량 측정</h1>
      
      {!result ? (
        <div className="carbon-form-container">
          <p className="measure-description">
            웹사이트 URL을 입력하면 해당 페이지의 탄소 배출량을 측정합니다. 
            친환경적인 웹을 만들기 위한 첫 걸음을 시작하세요.
          </p>
          
          <form onSubmit={handleSubmit} className="carbon-form">
            <div className="url-input-container">
              <input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={handleUrlChange}
                required
                className="url-input"
              />
              <button 
                type="submit" 
                className="measure-btn"
                disabled={isLoading}
              >
                {isLoading ? '측정 중...' : '측정하기'}
              </button>
            </div>
            
            {isLoading && (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <p>측정 중입니다. 잠시만 기다려 주세요...</p>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="result-container">
          <div className="result-header">
            <h2>{result.url} 측정 결과</h2>
            <button onClick={() => setResult(null)} className="measure-again-btn">
              다시 측정하기
            </button>
          </div>
          
          <div className="result-score-container">
            <div className="carbon-score">
              <div className="score-circle" style={{
                background: `conic-gradient(#ffffff ${result.carbonScore}%, transparent 0)`
              }}>
                <span>{result.carbonScore}</span>
              </div>
              <p>탄소 점수</p>
            </div>
            
            <div className="carbon-details">
              <div className="detail-item">
                <h3>{result.co2Grams}g</h3>
                <p>CO₂ 배출량</p>
              </div>
              
              <div className="detail-item">
                <h3>{result.cleanerThan}%</h3>
                <p>다른 웹사이트보다 깨끗함</p>
              </div>
            </div>
          </div>
          
          <div className="improvement-tips">
            <h3>개선 방안</h3>
            <ul>
              {result.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          
          <div className="share-result">
            <p>이 결과를 공유하고 웹사이트를 개선하세요!</p>
            <div className="share-buttons">
              <button className="share-btn twitter">Twitter</button>
              <button className="share-btn facebook">Facebook</button>
              <button className="share-btn linkedin">LinkedIn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Measure;
