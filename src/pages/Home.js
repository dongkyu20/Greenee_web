import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { getMarkerColor } from '../globe_on_marker';
import carbonData from '../data/parsed_ecarbon_gdsc_test.weekly_measurements.json';
import './Home.css';

// 세계 지도 토폴로지 데이터 URL - 신뢰할 수 있는 소스 사용
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const Home = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(carbonData);
  }, []);
  const [isDragging, setIsDragging] = useState(false);
  const [url, setUrl] = useState('');
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const globeRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      
      setRotation(([x, y, z]) => [x + dx * 0.5, y - dy * 0.5, z * 0.5]);
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      navigate('/measure', { state: { url } });
    }
  };

  return (
    <div className="home-container">
      <h1>Greenee 웹사이트의 지속가능성을 평가하세요</h1>
      <div className="home-content">
        <div className="split-container">
          <div 
            className="globe-container"
            ref={globeRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <ComposableMap
              projection="geoOrthographic"
              projectionConfig={{
                scale: 250,
                rotate: rotation,
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1B1B1B"
                      stroke="#ffffff"
                      strokeWidth={0.5}
                    />
                  ))
                }
              </Geographies>
              {cities.map((city, index) => (
                <Marker key={index} coordinates={city.coordinates}>
                  <circle 
                    r={4} 
                    fill={getMarkerColor(city.carbonEmission)}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                  <title>{`${city.name} (${city.carbonEmission}g CO2)`}</title>
                </Marker>
              ))}
            </ComposableMap>
          </div>

          <div className="measure-intro" style={{ marginTop: '15rem' }}>
            <h2>웹사이트 탄소 배출량 측정</h2>
            <p className="measure-description">
              웹사이트 URL을 입력하면 해당 페이지의 탄소 배출량을 측정합니다. 
              친환경적인 웹을 만들기 위한 첫 걸음을 시작하세요.
            </p>
            <form onSubmit={handleSubmit} className="url-form">
              <input
                type="url"
                className="url-input"
                placeholder="https://example.com"
                value={url}
                onChange={handleUrlChange}
                required
              />
              <button 
                type="submit" 
                className="measure-btn"
              >
                측정하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
