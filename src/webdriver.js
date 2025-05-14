const { Builder } = require('selenium-webdriver');
const fs = require('fs');

class WebsiteCapture {
  constructor() { 
    this.driver = null;
  }

  async initialize() {
    this.driver = await new Builder().forBrowser('chrome').build();
    
    // 데스크톱 해상도로 설정 (Full HD)
    await this.driver.manage().window().setRect({ width: 1920, height: 1080 });
  }

  async captureWithHighlight(url) {
    if (!this.driver) {
      throw new Error('드라이버가 초기화되지 않았습니다.');
    }

    try {
      // 웹사이트 로드
      await this.driver.get(url);

      // 이미지에 붉은색 오버레이와 테두리 추가
      await this.driver.executeScript(`
        document.querySelectorAll('img').forEach(img => {
          // 원래 이미지의 위치와 크기를 유지하면서 컨테이너 생성
          const container = document.createElement('div');
          container.style.position = 'relative';
          container.style.display = 'inline-block';
          container.style.border = '3px solid red';
          container.style.boxSizing = 'border-box';
          
          // 이미지를 컨테이너로 감싸기
          img.parentNode.insertBefore(container, img);
          container.appendChild(img);
          
          // 붉은색 오버레이 추가
          const overlay = document.createElement('div');
          overlay.style.position = 'absolute';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'red';
          overlay.style.opacity = '0.3';
          overlay.style.pointerEvents = 'none';
          
          container.appendChild(overlay);
        });
      `);

      // 스타일 반영 대기
      await this.driver.sleep(500);

      // 스크린샷 촬영
      const base64 = await this.driver.takeScreenshot();
      const fileName = `capture-${Date.now()}.png`;
      fs.writeFileSync(fileName, Buffer.from(base64, 'base64'));

      return {
        success: true,
        fileName,
        message: `스크린샷 저장 완료: ${fileName}`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async close() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }
}

module.exports = WebsiteCapture;

// 테스트 코드
async function test() {
  const capture = new WebsiteCapture();
  try {
    await capture.initialize();
    const result = await capture.captureWithHighlight('https://www.mois.go.kr/frt/a01/frtMain.do');
    console.log(result);
  } catch (error) {
    console.error('에러 발생:', error);
  } finally {
    await capture.close();
  }
}

// 테스트 실행
if (require.main === module) {
  test();
}