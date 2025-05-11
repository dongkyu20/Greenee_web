import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import guidelineData from '../data/parsed_wsg_guidelines.json';
import './Measure.css';
import mockCaptureImage from '../data/img_captured.png';
  


const Measure = () => {
  const location = useLocation();
  const [url, setUrl] = useState(location.state?.url || '');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [inefficientImages, setInefficientImages] = useState([]);
  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureError, setCaptureError] = useState(null);
  const [captureImage, setCaptureImage] = useState(null);
  const pageRef = useRef(null);

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

  const handleMeasurement = async (targetUrl) => {
    setIsLoading(true);
    setUrl(targetUrl);
    setCaptureLoading(true);
    setCaptureError(null);

    try {
      // Mock 이미지 사용
      setCaptureImage(mockCaptureImage);
    } catch (error) {
      console.error('캡처 중 오류:', error);
      setCaptureError(error.message);
    } finally {
      setCaptureLoading(false);
    }
    
    // 웹사이트 탄소 배출량 측정 시뮬레이션
    setTimeout(() => {
      // 탄소 점수를 알파벳으로 생성 (A, B, C, D, E, F)
      const scores = ['A', 'B', 'C', 'D', 'E', 'F'];
      const carbonScore = scores[Math.floor(Math.random() * scores.length)];
      const co2Grams = (Math.random() * 5).toFixed(2); // 0-5g 사이 임의의 CO2 배출량
      
      setResult({
        url: url,
        carbonScore,
        co2Grams,
        cleanerThan: Math.floor(Math.random() * 91) + 10, // 10-100 사이 임의의 퍼센트
        tips: [

        ],
        carbonEquivalents: {
          phoneCharges: Math.floor(Math.random() * 1000) + 100,  // 휴대폰 충전 횟수
          carDistance: Math.floor(Math.random() * 1000) + 100,   // 전기차 주행거리
          coffeeCups: Math.floor(Math.random() * 1000) + 100,    // 커피 잔 수
          trees: Math.floor(Math.random() * 100) + 10            // 나무 그루 수
        }
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
              <div className="score-info">
                <div className="score-circle" style={{
                  background: `conic-gradient(#ffffff ${result.carbonScore}%, transparent 0)`
                }}>
                  <span>{result.carbonScore}</span>
                </div>
                <div className="score-details">
                  <p className="score-rank">해당 웹사이트는 상위 {result.cleanerThan}% 입니다.</p>
                  <p className="score-emissions">{result.co2Grams} CO₂/page gram</p>
                </div>
              </div>
            </div>
            <ul>
              {result.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="carbon-equivalents">
            <h3 style={{ fontWeight: 'bold', marginTop: '2rem' }}>연간 탄소 배출량 환산</h3>
            <p className="subtitle">월 10,000명 방문 기준</p>
            
            <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div className="metric-card" style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☕</p>
                <p style={{ fontWeight: 'medium' }}>커피 {result.carbonEquivalents?.coffeeCups?.toLocaleString() ?? '-'}잔</p>
              </div>
              
              <div className="metric-card" style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</p>
                <p style={{ fontWeight: 'medium' }}>전기차 {result.carbonEquivalents?.carDistance?.toLocaleString() ?? '-'}km</p>
              </div>
              
              <div className="metric-card" style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</p>
                <p style={{ fontWeight: 'medium' }}>휴대폰 {result.carbonEquivalents?.phoneCharges?.toLocaleString() ?? '-'}회 충전</p>
              </div>
              
              <div className="metric-card" style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌲</p>
                <p style={{ fontWeight: 'medium' }}>나무 {result.carbonEquivalents?.trees?.toLocaleString() ?? '-'}그루</p>
              </div>
            </div>
            
            <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#666' }}>
              ※ 하루 10,000명 방문 기준, 1년 동안 절감할 수 있는 탄소량입니다.
            </p>
          </div>
          
          <div className="guidelines-checklist">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>지속 가능한 웹 가이드라인</h3>
            
            <div className="guidelines-table">
              <div className="table-header">
                <span>카테고리</span>
                <span>가이드라인</span>
                <span>준수여부</span>
                <span>중요도</span>
                <span></span>
              </div>
              
              {guidelineData.slice(0, 10).map((item, index) => (
                <div key={index} className={`table-row ${index >= 5 ? 'blurred' : ''}`}>
                  <span className="category">{item.categoryName}</span>
                  <span className="guideline">{item.guideline}</span>
                  <span className="compliance">
                    <span className={`compliance-icon ${Math.random() > 0.5 ? 'pass' : 'fail'}`}>
                      {Math.random() > 0.5 ? '✔' : '✖'}
                    </span>
                  </span>
                  <span className="importance">
                    {Array(3).fill(0).map((_, i) => (
                      <span key={i} className={`importance-dot ${i < Math.floor(Math.random() * 3 + 1) ? 'active' : ''}`}>⬤</span>
                    ))}
                  </span>
                  <button className="view-more-btn">더보기</button>
                </div>
              ))}
              {guidelineData.length > 5 && (
                <div className="premium-overlay">
                  <span>탄소 절감을 위한 회원전용 가이드라인</span>
                </div>
              )}
            </div>
          </div>

          <div className="share-result">
            <p>이 결과를 공유하고 웹사이트를 개선하세요!</p>
            <div className="share-buttons">
              <button className="share-btn twitter">Twitter</button>
              <button className="share-btn facebook">Facebook</button>
              <button className="share-btn linkedin">LinkedIn</button>
            </div>
          </div>

          <div className="capture-result">
            <h3>웹사이트 이미지 분석 결과</h3>
            {captureLoading && <div className="loading-indicator">이미지 캡처 중...</div>}
            {captureError && <div className="error-message">캡처 오류: {captureError}</div>}
            {captureImage && (
              <div className="capture-image-container">
                <img src={captureImage} alt="캡처된 웹사이트" style={{ maxWidth: '100%', height: 'auto' }} />
                <p className="capture-description">붉은색 테두리로 표시된 부분이 이미지 요소입니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
};



export default Measure;
