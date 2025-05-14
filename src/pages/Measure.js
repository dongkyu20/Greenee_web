import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import guidelineData from '../data/parsed_wsg_guidelines.json';
import './Measure.css';
import mockCaptureImage from '../data/img_captured_upgraded.png';
  


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

  const calculateGrade = (co2Grams) => {
    const co2 = parseFloat(co2Grams);
    if (co2 <= 0.095) return 'A+';
    if (co2 <= 0.186) return 'A';
    if (co2 <= 0.341) return 'B';
    if (co2 <= 0.493) return 'C';
    if (co2 <= 0.656) return 'D';
    if (co2 <= 0.846) return 'E';
    return 'F';
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
      console.error('Error during capture:', error);
      setCaptureError(error.message);
    } finally {
      setCaptureLoading(false);
    }
    
    // Website carbon emission measurement simulation
    setTimeout(() => {
      const co2Grams = (Math.random() * 1.5).toFixed(3); // Random CO2 emissions between 0-1.5g
      const carbonScore = calculateGrade(co2Grams);
      
      setResult({
        url: url,
        carbonScore,
        co2Grams,
        cleanerThan: Math.floor(Math.random() * 91) + 10, // Random percentage between 10-100
        tips: [

        ],
        carbonEquivalents: {
          phoneCharges: Math.floor(Math.random() * 1000) + 100,  // Number of phone charges
          carDistance: Math.floor(Math.random() * 1000) + 100,   // Electric car travel distance
          coffeeCups: Math.floor(Math.random() * 1000) + 100,    // Number of coffee cups
          trees: Math.floor(Math.random() * 100) + 10            // Number of trees 수
        }
      });
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="measure-container">
      <h1>Website Carbon Emission Measurement</h1>
      
      {!result ? (
        <div className="carbon-form-container">
          <p className="measure-description">
            Enter a website URL to measure its carbon emissions.
            Take the first step towards creating an eco-friendly web.
          </p>
          
          <form onSubmit={handleSubmit} className="carbon-form">
            <div className="url-input-container">
              <input
                type="text"
                placeholder="https://google.com"
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
                {isLoading ? 'Measuring...' : 'Measure'}
              </button>
            </div>
            
            {isLoading && (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <p>Measuring... Please wait a moment...</p>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="result-container">
          <div className="result-header">
            <h2>Results for {result.url}</h2>
            <button onClick={() => setResult(null)} className="measure-again-btn">
              Measure Again
            </button>
          </div>
          
          <div className="result-score-container">
            <div className="carbon-score">
              <div className="score-info">
                <div className={`score-circle grade-${result.carbonScore.replace('+', '-plus')}`}>
                  <span>{result.carbonScore}</span>
                </div>
                <div className="score-details">
                  <p className="score-rank">This website is in the top {result.cleanerThan}%</p>
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
            <h3 style={{ fontWeight: 'bold', marginTop: '2rem' }}>Annual Carbon Emission Equivalents</h3>
            <p className="subtitle">Based on 10,000 monthly visitors</p>
            
            <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div className="metric-card" style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☕</p>
                <p style={{ fontWeight: 'medium' }}>{result.carbonEquivalents?.coffeeCups?.toLocaleString() ?? '-'} cups of coffee</p>
              </div>
              
              <div className="metric-card" style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</p>
                <p style={{ fontWeight: 'medium' }}>{result.carbonEquivalents?.carDistance?.toLocaleString() ?? '-'}km by electric car</p>
              </div>
              
              <div className="metric-card" style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</p>
                <p style={{ fontWeight: 'medium' }}>{result.carbonEquivalents?.phoneCharges?.toLocaleString() ?? '-'} phone charges</p>
              </div>
              
              <div className="metric-card" style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌲</p>
                <p style={{ fontWeight: 'medium' }}>{result.carbonEquivalents?.trees?.toLocaleString() ?? '-'} trees</p>
              </div>
            </div>
            
            <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: 'white' }}>
              * Carbon savings potential based on 10,000 daily visitors over one year.
            </p>
          </div>
          
          <div className="guidelines-checklist">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>W3C's WSG(Web Sustainability Guidelines) Audit Result</h3>
            
            <div className="guidelines-table">
              <div className="table-header">
                <span>Category</span>
                <span>Guideline</span>
                <span>Compliance</span>
                <span>Importance</span>
                <span></span>
              </div>
              
              {guidelineData.slice(0, 10).map((item, index) => (
                <div key={index} className={`table-row ${index >= 5 ? 'blurred' : ''}`}>
                  <span className="category">{item.categoryName}</span>
                  <span className="guideline">{item.guideline}</span>
                  <div className="compliance">
                    {(() => {
                      const isPass = Math.random() > 0.5;
                      return (
                        <span className={`compliance-icon ${isPass ? 'pass' : 'fail'}`}>
                          {isPass ? '✔' : '✖'}
                        </span>
                      );
                    })()}
                  </div>
                  <span className="importance">
                    {Array(3).fill(0).map((_, i) => (
                      <span key={i} className={`importance-dot ${i < Math.floor(Math.random() * 3 + 1) ? 'active' : ''}`}>⬤</span>
                    ))}
                  </span>
                  <button className="view-more-btn">View More</button>
                </div>
              ))}
              {guidelineData.length > 5 && (
                <div className="premium-overlay">
                  <span>5 guidelines analyzed for carbon reduction. Request more analysis if needed.</span>
                </div>
              )}
            </div>
          </div>

          <div className="capture-result">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Website Image Analysis</h3>
            <p style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>Detection of non-optimized images that can be improved for better sustainability</p>
            <div className="analysis-header">
              <div className="analysis-badge">
                <span className="icon">🔍</span>
                <span className="title">Total Images</span>
                <span className="count">107</span>
              </div>
              <div className="analysis-legend">
                <span className="legend-icon">🔴</span>
                <span className="legend-text">Non-optimized image format detected</span>
              </div>
            </div>
            {captureLoading && <div className="loading-indicator">Capturing image...</div>}
            {captureError && <div className="error-message">Capture error: {captureError}</div>}
            {captureImage && (
              <div className="capture-image-container">
                <img src={captureImage} alt="Captured website" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
};



export default Measure;
