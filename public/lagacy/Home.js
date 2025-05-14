// 파란색 배경 지구본
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker, Graticule } from "react-simple-maps";
import { getMarkerColor } from '../globe_on_marker';
import carbonData from '../data/parsed_ecarbon_gdsc_test.weekly_measurements.json';
import './Home.css';
// 세계 지도 토폴로지 데이터 URL
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
// 기후변화 취약 국가 목록
const vulnerableCountries = [
  { code: "KIR", name: "Kiribati" }, // 이거 표현 안 됨 X (섬이라서)
  { code: "MDV", name: "Maldives" },  // X
  { code: "TUV", name: "Tuvalu" }, // X
  { code: "SDN", name: "Sudan" },
  { code: "BGD", name: "Bangladesh" },
  { code: "NER", name: "Niger" },
  { code: "TCD", name: "Chad" },
  { code: "CAF", name: "Central African Republic" }, // 표현 안 됨
  { code: "PAK", name: "Pakistan" },
  { code: "ITA", name: "Italy" },
];
const vulnerableCountries_exception_lat_lon =
[
  {
    "country": "Kiribati",
    "latitude": 1.87,
    "longitude": -157.36
  },
  {
    "country": "Maldives",
    "latitude": 3.25,
    "longitude": 73.00
  },
  {
    "country": "Tuvalu",
    "latitude": -8.15,
    "longitude": 177.95
  },
  {
    "country": "Central African Republic",
    "latitude": 6.61,
    "longitude": 20.94
  },
];
const vulnerableCountryNames = vulnerableCountries.map(c => c.name);
const Home = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [cities, setCities] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [url, setUrl] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const globeRef = useRef(null);
  useEffect(() => {
    setCities(carbonData);
  }, []);
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
  // 지구본 배경 클릭 시 팝업 닫기
  const handleGlobeClick = () => {
    setSelectedMarker(null);
  };
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      navigate('/measure', { state: { url } });
    }
  };
  return (
    <div className="home-container">
      <h1>Evaluate the Sustainability of Your Website with Greenee</h1>
      <div className="home-content">
        <div className="split-container">
          <div
            className="globe-container"
            style={{ position: 'relative' }}
            ref={globeRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleGlobeClick}
          >
            <ComposableMap
              projection="geoOrthographic"
              projectionConfig={{
                scale: 250,
                rotate: rotation,
              }}
              style={{
                background: "radial-gradient(circle at center, #004B5E 0%, #002B36 100%)",
                borderRadius: "50%",
              }}
            >
              <Graticule stroke="rgba(255, 255, 255, 0.2)" strokeWidth={0.5} step={[12, 12]} />
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const name = geo.properties.name;
                    const isVulnerable = vulnerableCountryNames.includes(name);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          const name = geo.properties.name;
                          const country = vulnerableCountries.find(c => c.name === name);
                          if (country) {
                            console.log(`:흰색_확인_표시: Vulnerable Country: ${name}`);
                          }
                        }}
                        stroke="#4a564b"
                        strokeWidth={0.2}
                        style={{
                          default: {
                            fill: isVulnerable ? '#729ed0' : '#F0FADA',
                            opacity: 1
                          },
                          hover: {
                            fill: isVulnerable ? '#1976D2' : '#BDBDBD',
                            opacity: 1
                          },
                          pressed: {
                            fill: isVulnerable ? '#1565C0' : '#9E9E9E',
                            opacity: 1
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {/* 지도에 표시되지 않는 취약 국가들을 마커로 표시 */}
              {vulnerableCountries_exception_lat_lon
                .filter((country) => {
                  const [rotateX] = rotation;
                  const relativeLongitude = (country.longitude + rotateX + 180) % 360 - 180;
                  return Math.abs(relativeLongitude) <= 90;
                })
                .map((country, index) => (
                  <Marker key={`vulnerable-${index}`} coordinates={[country.longitude, country.latitude]}>
                    <g
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarker({
                          name: country.country,
                          type: '취약 국가',
                        });
                      }}
                    >
                      <circle
                        r={5}
                        fill="#729ed0"
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    </g>
                  </Marker>
                ))}
              {/* 도시별 탄소 배출량 마커 */}
              {cities
                .filter((city) => {
                  const [longitude, latitude] = city.coordinates;
                  const [rotateX] = rotation;
                  const relativeLongitude = (longitude + rotateX + 180) % 360 - 180;
                  return Math.abs(relativeLongitude) <= 90;
                })
                .map((city, index) => (
                  <Marker key={index} coordinates={city.coordinates}>
                    <g
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarker({
                          name: city.name,
                          type: '웹사이트',
                          carbonEmission: city.carbonEmission,
                          url: city.url
                        });
                      }}
                    >
                      <circle
                        r={4}
                        fill={getMarkerColor(city.carbonEmission)}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    </g>
                  </Marker>
                ))}
            </ComposableMap>
            {/* 마커 정보 표시 영역 */}
            {/* 마커 색상 설명 범례 */}
            <div className="legend-container">
              <div className="legend-title">Marker Color Guide</div>
              <div className="legend-item">
                <div className="legend-marker" style={{ backgroundColor: '#2196F3' }} />
                <span>Climate Vulnerable Countries</span>
              </div>
              <div className="legend-item">
                <div className="legend-marker" style={{ backgroundColor: '#FF5252' }} />
                <span>High Carbon Websites</span>
              </div>
              <div className="legend-item">
                <div className="legend-marker" style={{ backgroundColor: '#FFD740' }} />
                <span>Medium Carbon Websites</span>
              </div>
              <div className="legend-item">
                <div className="legend-marker" style={{ backgroundColor: '#4CAF50' }} />
                <span>Low Carbon Websites</span>
              </div>
            </div>
          </div>
          <div className="measure-intro">
            <div style={{ marginTop: '2rem' }}>
              
              <h2>Measure Website Carbon Emissions</h2>
              <p className="measure-description">
                Enter a website URL to measure its carbon emissions.
                Take the first step towards creating an eco-friendly web.
              </p>
              <form onSubmit={handleSubmit} className="url-form">
                <input
                  type="url"
                  className="url-input"
                  placeholder="https://google.com"
                  value={url}
                  onChange={handleUrlChange}
                  required
                />
                <button
                  type="submit"
                  className="measure-btn"
                >
                  Measure
                </button>
              </form>
            </div>
            <div className="challenge-info">
                <h3>Do you think digital technology is environmentally friendly?</h3>
                <p>
                  In reality, the digital sector emits <strong>1.6 billion tons</strong> of greenhouse gases annually, accounting for <strong>5% of total emissions</strong>.
                  Sustainability is <strong>no longer a choice, but a necessity</strong> for the web industry.
                </p>
                <p>
                  Greenee provides a <strong>comprehensive assessment</strong> of website sustainability, based on the <strong>W3C's Web Sustainability Guidelines</strong>, 
                  that goes beyond simple carbon emission measurement.
                </p>
                <p>
                  The <strong>blue markers</strong> on the map indicate countries most vulnerable to climate change.
                  Check how your website affects these vulnerable regions and join the journey to create a more <strong>sustainable digital future</strong>.
                </p>
              </div>
            {selectedMarker && (
              <div className="marker-info">
                <div className="marker-info-title">
                  {selectedMarker.type === '웹사이트' ? 'Website Information' : 'Vulnerable Country Information'}
                </div>
                <div className="marker-info-content">
                  <span className="marker-info-label">Name:</span>
                  <span className="marker-info-value">{selectedMarker.name}</span>
                  {selectedMarker.url && (
                    <>
                      <span className="marker-info-label">URL:</span>
                      <a
                        href={selectedMarker.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="marker-info-url"
                      >
                        {selectedMarker.url}
                      </a>
                    </>
                  )}
                </div>
                {selectedMarker.type === '웹사이트' && (
                  <>
                    <div className="marker-info-emission">
                      Carbon Emissions: {selectedMarker.carbonEmission}g CO2
                    </div>
                    <div className="marker-info-grade">
                      {selectedMarker.carbonEmission > 3 ? (
                        <span className="grade-high">High Carbon</span>
                      ) : selectedMarker.carbonEmission > 1 ? (
                        <span className="grade-medium">Medium Carbon</span>
                      ) : (
                        <span className="grade-low">Low Carbon</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;