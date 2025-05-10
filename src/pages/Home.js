import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './Home.css';

// 세계 지도 토폴로지 데이터 URL - 신뢰할 수 있는 소스 사용
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const Home = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const rotationRef = useRef(rotation);
  const [isRotating, setIsRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const globeRef = useRef(null);
  
  // // 자동 회전 기능
  // useEffect(() => {
  //   rotationRef.current = rotation;
  //   let frameId;

  //   const rotate = () => {
  //     if (isRotating && !isDragging) {
  //       setRotation(([x, y, z]) => [x, y + 0.5, z]);
  //     }
  //     frameId = requestAnimationFrame(rotate);
  //   };

  //   rotate();
  //   return () => cancelAnimationFrame(frameId);
  // }, [isRotating, isDragging]);

  // 마우스 드래그로 회전 제어
  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      
      // x축 회전(latitude): 상하 드래그에 의해 변경 (dy)
      // y축 회전(longitude): 좌우 드래그에 의해 변경 (dx)
      // 좌우로 드래그하면 좌우로 회전, 상하로 드래그하면 상하로 회전

      // setRotation(([x, y, z]) => [x + dx * 0.5, y + dy * 0.5, z* 0.5]);
      setRotation(([x, y, z]) => [x + dx * 0.5, y - dy * 0.5, z * 0.5]);
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      console.log(rotation);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="home-container">
      <h1>Greenee - 친환경 기업</h1>
      <div className="home-content">
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
              scale: 150,
              rotate: rotation,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#4a7c4d"
                    stroke="#2d482f"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#5cad60', outline: 'none' },
                      pressed: { fill: '#3d6a3f', outline: 'none' }
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
        <p>환경을 생각하는 기업들과 함께 지속 가능한 미래를 만들어갑니다.</p>
        <div className="home-buttons">
          <button className="test1-btn">테스트 1</button>
          <button className="test2-btn">테스트 2</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
