import React, { useState } from 'react';
import './UserPage.css';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 예시 데이터 - 실제로는 로그인한 사용자 정보와 데이터를 불러와야 함
  const userData = {
    name: '김환경',
    company: '그린테크',
    email: 'green@greentech.kr',
    joinDate: '2023-09-15',
    measurements: [
      { id: 1, date: '2024-05-01', score: 85, status: '완료' },
      { id: 2, date: '2024-03-12', score: 82, status: '완료' },
      { id: 3, date: '2024-01-25', score: 78, status: '완료' }
    ],
    rankings: {
      current: 1,
      previous: 2,
      industry: 'IT',
      industryRank: 1
    }
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
            <h2>대시보드</h2>
            
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h3>현재 순위</h3>
                <div className="rank-number">{userData.rankings.current}</div>
                <p>이전보다 {userData.rankings.previous - userData.rankings.current > 0 ? '상승' : '하락'}</p>
              </div>
              
              <div className="dashboard-card">
                <h3>산업 내 순위</h3>
                <div className="rank-number">{userData.rankings.industryRank}</div>
                <p>{userData.rankings.industry} 산업</p>
              </div>
              
              <div className="dashboard-card">
                <h3>최근 측정 점수</h3>
                <div className="score-number">{userData.measurements[0].score}</div>
                <p>측정일: {userData.measurements[0].date}</p>
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
