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

      // 이미지에 붉은 테두리 추가
      await this.driver.executeScript(`
        document.querySelectorAll('img').forEach(img => {
          img.style.border = '3px solid red';
          img.style.boxSizing = 'border-box';
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