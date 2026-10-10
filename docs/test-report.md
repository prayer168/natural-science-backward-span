# 測試與建置紀錄

## 2026-10-10｜版本 0.2.0 初次實作與瀏覽器驗證

### 已完成

- 建立原生 HTML/CSS/JavaScript 單頁網站與獨立自然科題庫。
- 完成數字 6–12 位、自然圖卡、自然詞語、自訂 3–12 個詞語四模式。
- 加入呈現速度、年級／學期／出版社／單元篩選、練習模式與五回合挑戰。
- 加入序列播放暫停／續播、倒序作答、清除與撤銷、再試、下一回合及教師說明。
- 加入大字投影、音效開關、鍵盤輸入、觸控點選、ARIA 播報與降低動畫偏好。

### 檢查結果

- `node --check app.js`、`node --check data.js`：通過。
- Playwright Chromium 桌機 1440×1000：初始畫面、數字倒序完整正確答案、挑戰五回合第二回合可開始、教師說明對話框、六詞自訂題組及空白答案提示已操作。
- Playwright Chromium 手機 390×844：初始畫面與自然圖卡播放畫面已截圖；`document.documentElement.scrollWidth` 為 390，沒有水平溢出；六張卡片均位於畫面範圍內。
- 上述瀏覽器流程未發現未處理 JavaScript 錯誤。
- 畫面截圖在專案旁的 `video-assets/screenshots/`，刻意不納入網站 Repo。

### 尚未完成

- 尚未逐一驗證平板 768×1024 與鍵盤全流程。
- 尚未確認所有自然題庫詞語的外部科學事實來源；目前它們主要是課程地圖單元摘出的記憶詞彙，簡化圖示不是形態教學圖。
- GitHub Repo 未建立，尚未部署公開網站。

### 限制

- 自然題庫目前共 20 組，涵蓋三、四、六年級以及五年級大地主題；五年級題組仍待擴充。
- 每個課程題組最多 6 個內容詞語，因此圖卡／詞語模式雖保留 12 上限控制，現有來源題組的實際長度仍由題組項目數限制。
- 影片正式錄製檔需拍攝時另外存入 `video-assets/recordings/`；截圖不能替代正式錄影。

## 2026-10-10｜Facebook 分享頁與 GitHub Pages 0.2.2

- `share/facebook-post.html`：中英文貼文、中文／英文／全文複製按鈕，含 Open Graph 與 Twitter Card metadata。
- `assets/images/og-cover.png`：1200×630 PNG，255,270 bytes。
- GitHub Pages：`https://prayer168.github.io/natural-science-backward-span/`。
- 公開首頁、分享頁及縮圖：HTTP 200。
- Playwright HTTPS 檢查：縮圖載入 1200×630；中、英、全文剪貼簿文字可讀回且有分隔符；無瀏覽器 page error。
- 分享頁手機寬度 390px 無水平溢出；桌機與手機畫面保存在專案根目錄 `video-assets/screenshots/`，不納入網站 Repo。
