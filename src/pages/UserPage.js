import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 예시 데이터 - 실제로는 로그인한 사용자 정보와 데이터를 불러와야 함
  const userData = {
    name: 'ChoRokee',
    company: 'Greenee',
    email: 'green@greenee.co.kr',
    joinDate: '2025-05-10',
    measurements: [
      { id: 1, date: '2025-05-10', score: 85, status: '완료' },
      { id: 2, date: '2025-05-09', score: 82, status: '완료' },
      { id: 3, date: '2025-05-08', score: 78, status: '완료' }
    ],
    rankings: {
      current: 1,
      previous: 2,
      industry: 'IT',
      industryRank: 1
    },
    // CO2 기여량 데이터
    contributionData: [
      { date: '2025-05-04', co2: 22.8 },
      { date: '2025-05-05', co2: 15.7 },
      { date: '2025-05-06', co2: 27.2 },
      { date: '2025-05-07', co2: 32.2 },
      { date: '2025-05-08', co2: 25.8 },
      { date: '2025-05-09', co2: 15.2 },
      { date: '2025-05-10', co2: 20.1 }
    ],
    // CO2 절감량 데이터
    reductionData: [
      { date: '2025-05-04', co2: 12.1 },
      { date: '2025-05-05', co2: 10.7 },
      { date: '2025-05-06', co2: 18.3 },
      { date: '2025-05-07', co2: 52.2 },
      { date: '2025-05-08', co2: 16.2 },
      { date: '2025-05-09', co2: 34.2 },
      { date: '2025-05-10', co2: 44.2 }
    ]
  };
  
  return (
    <div className="user-page-container">
      <div className="user-sidebar">
        <div className="user-profile">
          <div className="user-avatar"></div>
          <h3>{userData.name}</h3>
          <p>{userData.company}</p>
        </div>
        
        <div className="sidebar-menu">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            대시보드
          </button>
          <button 
            className={activeTab === 'measurements' ? 'active' : ''} 
            onClick={() => setActiveTab('measurements')}
          >
            측정 기록
          </button>
          <button 
            className={activeTab === 'profile' ? 'active' : ''} 
            onClick={() => setActiveTab('profile')}
          >
            프로필 설정
          </button>
        </div>
      </div>
      
      <div className="user-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <h2>CO2 기여 및 절감 통계</h2>
            <div className="graph-container">
              <div className="graph-card">
                <h3>CO2 기여량 그래프 (g)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={userData.contributionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" label={{ value: '날짜', position: 'insideBottomRight', offset: -5, fill: 'white' }} />
                    <YAxis label={{ value: 'CO2 (g)', angle: -90, position: 'insideLeft', fill: 'white' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', border: 'none' ,}} />
                    <Legend wrapperStyle={{ color: 'white' }} />
                    <Line 
                      type="monotone" 
                      dataKey="co2" 
                      name="CO2 기여량" 
                      stroke="#6dd47e" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="graph-card">
                <h3>CO2 절감량 그래프 (g)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={userData.reductionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" label={{ value: '날짜', position: 'insideBottomRight', offset: -5, fill: 'white' }} />
                    <YAxis label={{ value: 'CO2 (g)', angle: -90, position: 'insideLeft', fill: 'white' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', border: 'none' }} />
                    <Legend wrapperStyle={{ color: 'white' }} />
                    <Line 
                      type="monotone" 
                      dataKey="co2" 
                      name="CO2 절감량" 
                      stroke="#4ecdc4" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="stats-summary">
              <div className="stats-card contribution-card">
                <h3>기여량</h3>
                <div className="stats-container">
                  <div className="stats-data">
                    <div className="stats-value">
                      {userData.contributionData.reduce((sum, item) => sum + item.co2, 0).toFixed(1)} g
                    </div>
                    <p>총 탄소 기여량</p>
                  </div>
                  
                  <div className="stats-rank">
                    <div className="rank-value">
                      3<span className="rank-suffix">위</span>
                    </div>
                    <p>기여량 순위</p>
                  </div>
                </div>
              </div>
              
              <div className="stats-card reduction-card">
                <h3>절감량</h3>
                <div className="stats-container">
                  <div className="stats-data">
                    <div className="stats-value">
                      {userData.reductionData.reduce((sum, item) => sum + item.co2, 0).toFixed(1)} g
                    </div>
                    <p>총 탄소 절감량</p>
                  </div>
                  
                  <div className="stats-rank">
                    <div className="rank-value">
                      {userData.rankings.current}<span className="rank-suffix">위</span>
                    </div>
                    <p>절감량 순위</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="recent-activities">
              <h3>최근 활동</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-date">2024-05-01</span>
                  <span className="activity-description">환경 영향 측정을 완료했습니다.</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">2024-04-15</span>
                  <span className="activity-description">에너지 절약 목표를 설정했습니다.</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">2024-03-12</span>
                  <span className="activity-description">환경 영향 측정을 완료했습니다.</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'measurements' && (
          <div className="measurements-tab">
            <h2>측정 기록</h2>
            
            <table className="measurements-table">
              <thead>
                <tr>
                  <th>측정 ID</th>
                  <th>날짜</th>
                  <th>점수</th>
                  <th>상태</th>
                  <th>상세보기</th>
                </tr>
              </thead>
              <tbody>
                {userData.measurements.map(measurement => (
                  <tr key={measurement.id}>
                    <td>{measurement.id}</td>
                    <td>{measurement.date}</td>
                    <td>{measurement.score}</td>
                    <td>{measurement.status}</td>
                    <td><button className="view-btn">보기</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="new-measurement">
              <button className="new-measurement-btn">새 측정 시작</button>
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h2>프로필 설정</h2>
            
            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input type="text" id="name" defaultValue={userData.name} />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">회사명</label>
                <input type="text" id="company" defaultValue={userData.company} />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" defaultValue={userData.email} />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">비밀번호 변경</label>
                <input type="password" id="password" placeholder="새 비밀번호" />
              </div>
              
              <div className="form-group">
                <label htmlFor="password-confirm">비밀번호 확인</label>
                <input type="password" id="password-confirm" placeholder="비밀번호 확인" />
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="save-btn">저장</button>
                <button type="button" className="cancel-btn">취소</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
