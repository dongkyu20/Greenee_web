import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Greenee</h1>
      
      <div className="about-section">
        <div className="about-image">
          <img src="/svg/greenee_logo_big_w.svg" alt="Greenee Logo" />
        </div>
        <div className="about-content">
          <h2>우리의 사명</h2>
          <p>
            Greenee는 기업들이 환경 영향을 측정하고 개선할 수 있도록 돕는 플랫폼입니다. 
            우리는 지속 가능한 비즈니스 관행을 촉진하고, 기업들이 환경 보호에 
            기여할 수 있는 방법을 제시합니다.
          </p>
          <p>
            환경 보호는 우리 모두의 책임입니다. Greenee는 기업들이 이 책임을 다할 수 있도록 
            도구와 인사이트를 제공합니다.
          </p>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Greenee의 특징</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>정확한 측정</h3>
            <p>산업별 특성을 고려한 맞춤형 환경 영향 측정 도구를 제공합니다.</p>
          </div>
          <div className="feature-item">
            <h3>객관적인 순위</h3>
            <p>투명하고 공정한 기준으로 기업들의 친환경 노력을 평가합니다.</p>
          </div>
          <div className="feature-item">
            <h3>맞춤형 솔루션</h3>
            <p>각 기업의 상황에 맞는 환경 개선 방안을 제안합니다.</p>
          </div>
          <div className="feature-item">
            <h3>커뮤니티</h3>
            <p>친환경 기업들의 네트워크를 구축하고 정보 공유를 촉진합니다.</p>
          </div>
        </div>
      </div>
      
      <div className="team-section">
        <h2>Greenee 팀</h2>
        <p className="team-intro">
          환경 전문가, 데이터 과학자, 개발자들로 구성된 우리 팀은 
          지속 가능한 미래를 위해 헌신하고 있습니다.
        </p>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar"></div>
            <h3>김그린</h3>
            <p>CEO & 환경학 박사</p>
          </div>
          <div className="team-member">
            <div className="member-avatar"></div>
            <h3>이에코</h3>
            <p>CTO & 데이터 사이언티스트</p>
          </div>
          <div className="team-member">
            <div className="member-avatar"></div>
            <h3>박지속</h3>
            <p>환경 컨설턴트</p>
          </div>
          <div className="team-member">
            <div className="member-avatar"></div>
            <h3>최미래</h3>
            <p>기업 파트너십 매니저</p>
          </div>
        </div>
      </div>
      
      <div className="contact-section">
        <h2>문의하기</h2>
        <p>
          Greenee에 대해 더 알고 싶거나 협업을 원하시면 언제든지 연락주세요.
        </p>
        <a href="mailto:contact@greenee.kr" className="contact-btn">이메일 보내기</a>
      </div>
    </div>
  );
};

export default About;
