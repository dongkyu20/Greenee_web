import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import silverMedal from '../assets/silver_medal.png';
import goldMedal from '../assets/gold_medal.png';
import starMedal from '../assets/star_medal.png';
const UserPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 예시 데이터 - 실제로는 로그인한 사용자 정보와 데이터를 불러와야 함
  const userData = {
    name: 'ChoRokee',
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
    // CO2 contribution data
    contributionData: [
      { date: '2025-05-04', co2: 22.8 },
      { date: '2025-05-05', co2: 15.7 },
      { date: '2025-05-06', co2: 27.2 },
      { date: '2025-05-07', co2: 32.2 },
      { date: '2025-05-08', co2: 25.8 },
      { date: '2025-05-09', co2: 15.2 },
      { date: '2025-05-10', co2: 20.1 }
    ],
    // CO2 reduction data
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
            <h2>CO2 Contribution and Reduction Statistics</h2>
            <div className="graph-container">
              <div className="graph-card">
                <h3>CO2 Contribution Graph (g)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={userData.contributionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: -5, fill: 'white' }} />
                    <YAxis label={{ value: 'CO2 (g)', angle: -90, position: 'insideLeft', fill: 'white' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', border: 'none' ,}} />
                    <Legend wrapperStyle={{ color: 'white' }} />
                    <Line 
                      type="monotone" 
                      dataKey="co2" 
                      name="CO2 Contribution" 
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
                    <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: -5, fill: 'white' }} />
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
                <h3>Contribution</h3>
                <div className="stats-container">
                  <div className="stats-data">
                    <div className="stats-value">
                      {userData.contributionData.reduce((sum, item) => sum + item.co2, 0).toFixed(1)} g
                    </div>
                    <p>Total Carbon Contribution</p>
                  </div>
                  
                  <div className="stats-rank">
                    <div className="rank-value">
                      3<span className="rank-suffix">th</span>
                    </div>
                    <p>Contribution Rank</p>
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
                      {userData.rankings.current}<span className="rank-suffix">th</span>
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
                  <span className="activity-date">2024-05-01</span>
                  <span className="activity-description">Completed environmental impact measurement.</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">2024-04-15</span>
                  <span className="activity-description">Set energy saving goals.</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">2024-03-12</span>
                  <span className="activity-description">Completed environmental impact measurement.</span>
                </div>
              </div>
            </div>

            <div className="user-achievement">
              <h3>My Achievements</h3>
              <div className="achievement-grid">
                <div className="achievement-item">
                  <img src={silverMedal} alt="Silver Medal" />
                  <div className="achievement-info">
                    <h4>Dedicated Contributor</h4>
                    <p>Achieved 10 contributions</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <img src={goldMedal} alt="Gold Medal" />
                  <div className="achievement-info">
                    <h4>Pioneer</h4>
                    <p>First Contributor</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <img src={starMedal} alt="Star Medal" />
                  <div className="achievement-info">
                    <h4>Reduction Achievement</h4>
                    <p>Achieved 1g carbon reduction</p>
                  </div>
                </div>
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
                  <th>Measurement ID</th>
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