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
  { 
    code: "SDN", 
    name: "Sudan",
    description: "Sudan faces severe droughts and desertification, threatening food security and water resources. Rising temperatures intensify these challenges, affecting millions of people."
  },
  { 
    code: "BGD", 
    name: "Bangladesh",
    description: "Bangladesh is highly susceptible to flooding and cyclones. Sea level rise threatens coastal areas, impacting agriculture and forcing climate migration."
  },
  { 
    code: "NER", 
    name: "Niger",
    description: "Niger struggles with extreme heat and drought. The Sahel region's expanding desertification severely impacts agriculture and livestock farming."
  },
  { 
    code: "TCD", 
    name: "Chad",
    description: "Chad's Lake Chad is shrinking dramatically due to climate change, affecting millions who depend on it for livelihood and sustenance."
  },
  { 
    code: "PAK", 
    name: "Pakistan",
    description: "Pakistan experiences intense flooding and heat waves. Glacier melting in the north and coastal threats in the south pose significant risks."
  },
  { 
    code: "ITA", 
    name: "Italy",
    description: "Italy faces rising sea levels threatening Venice and coastal regions. Increasing heat waves and droughts affect agriculture and tourism."
  },
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
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [hoveredVulnerableCountry, setHoveredVulnerableCountry] = useState(null);
  const globeRef = useRef(null);
  useEffect(() => {
    setCities(carbonData);
  }, []);
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = () => {};
  const handleMouseUp = () => setIsDragging(false);

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      navigate('/measure', { state: { url } });
    }
  };
  // 고탄소 웹사이트 필터링 함수 (3g CO2 이상)
  const getHighCarbonWebsites = () => {
    return cities.filter(city => city.carbonEmission > 3);
  };
  return (
    <div className="home-container">
      <h1>Evaluate the Sustainability of Your Website with Greenee</h1>
      <div className="home-content">
        <div className="split-container">
          <div className="measure-intro">
            <div>
              <h2>Measure Website Carbon Emissions</h2>
              <p className="measure-description">
                Enter a website URL to measure its carbon emissions.
                <p></p>
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
                <button type="submit" className="measure-btn">
                  Measure
                </button>
              </form>
            </div>
          </div>
          <div
            className="globe-container"
            style={{ position: 'relative' }}
            ref={globeRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 150,
                center: [0, 35],
                clipAngle: 180,
                clipExtent: [[0, 0], [1800, 1000]],
              }}
              style={{
                background: "#1E3320",
                clipPath: "inset(15% 0 0 0)"
              }}
            >

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
                            setHoveredVulnerableCountry(country);
                          }
                        }}
                        onMouseLeave={() => setHoveredVulnerableCountry(null)}
                        stroke="#1E3320"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            fill: isVulnerable ? '#729ed0' : '#F0FADA',
                            opacity: 0.9
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

                .map((country, index) => (
                  <Marker key={`vulnerable-${index}`} coordinates={[country.longitude, country.latitude]}>
                    <g
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // setSelectedMarker({
                        //   name: country.country,
                        //   type: '취약 국가',
                        // });
                      }}
                      onMouseEnter={(e) => {
                        setHoveredMarker({ name: country.country });
                        // setTooltipPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => setHoveredMarker(null)}
                    >
                      <circle
                        r={6}
                        fill="#729ed0"
                        stroke="#fff"
                        strokeWidth={2}
                        style={{
                          transition: 'all 0.2s ease',
                          transform: hoveredMarker?.name === country.country ? 'scale(1.3)' : 'scale(1)',
                          cursor: 'pointer'
                        }}
                      />
                    </g>
                  </Marker>
                ))}
              {/* 도시별 탄소 배출량 마커 */}
              {cities.map((city, index) => {
                  // 취약국가에 호버 시 고탄소 웹사이트만 표시
                  const isHighCarbon = city.carbonEmission > 3;
                  const shouldShow = !hoveredVulnerableCountry || (hoveredVulnerableCountry && isHighCarbon);
                  
                  return (
                    <Marker key={index} coordinates={city.coordinates}>
                      <g
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(e) => {
                          setHoveredMarker({
                            name: city.name,
                            type: '웹사이트',
                            carbonEmission: city.carbonEmission,
                            url: city.url
                          });
                        }}
                        onMouseLeave={() => setHoveredMarker(null)}
                      >
                        <circle
                          r={4}
                          fill={getMarkerColor(city.carbonEmission)}
                          stroke="#fff"
                          strokeWidth={2}
                          style={{
                            transition: 'all 0.3s ease',
                            transform: hoveredMarker?.url === city.url ? 'scale(1.3)' : 'scale(1)',
                            cursor: 'pointer',
                            opacity: shouldShow ? 1 : 0,
                            filter: hoveredVulnerableCountry && isHighCarbon ? 'drop-shadow(0 0 8px rgba(255, 82, 82, 0.8))' : 'none'
                          }}
                        />
                      </g>
                    </Marker>
                  );
                })}
            </ComposableMap>
            <div className="tips-text">
              💡 Tip: Drag the globe to explore Google Solution Challenge Participation University's Carbon Footprints
            </div>
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
            {hoveredMarker && (
              <div className="marker-info">
                <div className="marker-info-title">
                  {hoveredMarker.type === '웹사이트' ? 'Website Information' : 'Vulnerable Country'}
                </div>
                <div className="marker-info-content">
                  <div>
                    <span className="marker-info-label">Name</span>
                    <span className="marker-info-value">{hoveredMarker.name}</span>
                  </div>
                  
                  {hoveredMarker.type === '웹사이트' && (
                    <>
                      <div className="marker-info-emission">
                        <span>Carbon Emissions: {hoveredMarker.carbonEmission}g CO2</span>
                        <span className="marker-info-grade">
                          {hoveredMarker.carbonEmission > 3 ? (
                            <span className="grade-high">High Impact</span>
                          ) : hoveredMarker.carbonEmission > 1 ? (
                            <span className="grade-medium">Medium Impact</span>
                          ) : (
                            <span className="grade-low">Low Impact</span>
                          )}
                        </span>
                      </div>
                      
                      <div>
                        <span className="marker-info-label">Website URL</span>
                        <a
                          href={hoveredMarker.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="marker-info-url"
                        >
                          {hoveredMarker.url}
                        </a>
                      </div>
                    </>
                  )}
                  
                  {hoveredMarker.type === '취약 국가' && (
                    <div className="vulnerability-info">
                      This country is particularly vulnerable to climate change impacts.
                      Digital sustainability efforts can help reduce environmental stress
                      on vulnerable regions.
                    </div>
                  )}
                </div>
              </div>
            )}
            {hoveredVulnerableCountry && (
              <div className="vulnerability-message">
                <div className="country-name">{hoveredVulnerableCountry.name}</div>
                <div className="country-description">{hoveredVulnerableCountry.description}</div>
                <div className="impact-note">High-carbon websites contribute to global emissions affecting vulnerable regions like this.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;