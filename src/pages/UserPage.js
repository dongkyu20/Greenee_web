import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import goldMedal from '../assets/gold_medal.png';
import silverMedal from '../assets/silver_medal.png';
import starMedal from '../assets/star_medal.png';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 예시 데이터 - 실제로는 로그인한 사용자 정보와 데이터를 불러와야 함
  const userData = {
    name: 'Byeongsu Ko',
    company: 'Greenee',
    email: 'green@greenee.co.kr',
    joinDate: '2025-05-10',
    measurements: [
      { id: 1, date: '2025-05-10', score: 85, status: 'Completed' },
      { id: 2, date: '2025-05-09', score: 82, status: 'Completed' },
      { id: 3, date: '2025-05-08', score: 78, status: 'Completed' }
    ],
    rankings: {
      current: 1,
      previous: 2,
      industry: 'IT',
      industryRank: 1
    },
    // Webp 변환 횟수 데이터
    contributionData: [
      { date: '2025-05-04', count: 10 },
      { date: '2025-05-05', count: 12 },
      { date: '2025-05-06', count: 9 },
      { date: '2025-05-07', count: 15 },
      { date: '2025-05-08', count: 5 },
      { date: '2025-05-09', count: 7 },
      { date: '2025-05-10', count: 7 }
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
            Dashboard
          </button>
          <button 
            className={activeTab === 'measurements' ? 'active' : ''} 
            onClick={() => setActiveTab('measurements')}
          >
            Measurements
          </button>
          <button 
            className={activeTab === 'profile' ? 'active' : ''} 
            onClick={() => setActiveTab('profile')}
          >
            Profile Settings
          </button>
        </div>
      </div>
      
      <div className="user-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <h2>Webp Conversion and CO2 Reduction Statistics</h2>
            <div className="graph-container">
              <div className="graph-card">
                <h3>Webp Conversion Count</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={userData.contributionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: -5, fill: 'white' }} />
                    <YAxis label={{ value: 'Conversions', angle: -90, position: 'insideLeft', fill: 'white' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', border: 'none' }} />
                    <Legend wrapperStyle={{ color: 'white' }} />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      name="Webp Conversions" 
                      stroke="#6dd47e" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="graph-card">
                <h3>CO2 Reduction Graph (g)</h3>
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
                      name="CO2 Reduction" 
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
                <h3>Webp Conversions</h3>
                <div className="stats-container">
                  <div className="stats-data">
                    <div className="stats-value">
                      {userData.contributionData.reduce((sum, item) => sum + item.count, 0)}
                    </div>
                    <p>Total Webp Conversions</p>
                  </div>
                  
                  <div className="stats-rank">
                    <div className="rank-value">
                      3<span className="rank-suffix">rd</span>
                    </div>
                    <p>Conversion Rank</p>
                  </div>
                </div>
              </div>
              
              <div className="stats-card reduction-card">
                <h3>Reduction</h3>
                <div className="stats-container">
                  <div className="stats-data">
                    <div className="stats-value">
                      {userData.reductionData.reduce((sum, item) => sum + item.co2, 0).toFixed(1)} g
                    </div>
                    <p>Total Carbon Reduction</p>
                  </div>
                  
                  <div className="stats-rank">
                    <div className="rank-value">
                      {userData.rankings.current}<span className="rank-suffix">{userData.rankings.current === 1 ? 'st' : userData.rankings.current === 2 ? 'nd' : userData.rankings.current === 3 ? 'rd' : 'th'}</span>
                    </div>
                    <p>Reduction Rank</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="recent-activities">
              <h3>Recent Activities</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-date">2025-05-10</span>
                  <span className="activity-description">Recognized as top 10% carbon reducer</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">2025-04-28</span>
                  <span className="activity-description">Recognized as top 20% carbon reducer</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">2025-04-27</span>
                  <span className="activity-description">Installed UseWebp software.</span>
                </div>
              </div>
            </div>

            <div className="medals-section">
              <div className="medal-item">
                <img src={goldMedal} alt="First Carbon Reducer" className="medal-image" />
                <p className="medal-title">First Carbon Reducer</p>
                <p className="medal-desc">First Website Carbon Reducer</p>
              </div>
              <div className="medal-item">
                <img src={silverMedal} alt="Monthly Reducer" className="medal-image" />
                <p className="medal-title">Monthly Reducer</p>
                <p className="medal-desc">5+ Reductions in a Month</p>
              </div>
              <div className="medal-item">
                <img src={starMedal} alt="Carbon Master" className="medal-image" />
                <p className="medal-title">Carbon Master</p>
                <p className="medal-desc">100g+ Carbon Reducer</p>
              </div>
            </div>
              
            </div>
        )}
        
        {activeTab === 'measurements' && (
          <div className="measurements-tab">
            <h2>Measurement History</h2>
            
            <table className="measurements-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {userData.measurements.map(measurement => (
                  <tr key={measurement.id}>
                    <td>{measurement.id}</td>
                    <td>{measurement.date}</td>
                    <td>{measurement.score}</td>
                    <td>{measurement.status}</td>
                    <td><button className="view-btn">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="new-measurement">
              <button className="new-measurement-btn">Start New Measurement</button>
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h2>Profile Settings</h2>
            
            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" defaultValue={userData.name} />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" defaultValue={userData.company} />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" defaultValue={userData.email} />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Change Password</label>
                <input type="password" id="password" placeholder="New Password" />
              </div>
              
              <div className="form-group">
                <label htmlFor="password-confirm">Confirm Password</label>
                <input type="password" id="password-confirm" placeholder="Confirm Password" />
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;