# 自然倒背挑戰

適用國小三至六年級自然課的課前專注暖身互動網站。學生依序記住數字、自然詞語或圖卡，再從最後一項開始倒序回答。活動不記名、不排名，也不作智力或診斷評量。

## 目前功能

- 數字倒背：6–12 位數。
- 自然圖卡含 16 種生成插畫，依 279 個課程活動配上對應主題圖和原始文字標題。
- 自然圖卡、自然詞語倒序：完整納入三至六年級康軒、翰林、南一版本 93 組單元／學期／版本題組、279 個教學活動標題。
- 教師自訂 3–12 個詞語。
- 自然活動序列依所選單元自動配合 2–4 個實際活動長度；選擇年級、版本和單元來篩選。
- 可調整序列播放速度，選擇練習或五回合挑戰。
- 答錯時練習模式提供正確順序，挑戰模式保留回想機會。
- 觸控／滑鼠點選作答、撤銷、清除重排；鍵盤可操作按鈕與輸入答案。
- 透明背景倒轉葉片 Logo、16／32／48px favicon、ICO 與 Apple Touch Icon。
- 放大字級與響應式手機／平板版面、大字投影、瀏覽器全螢幕、音效開關、教師使用說明與螢幕閱讀器播報。
- 響應式版面與降低動態效果支援。

## 本機開啟

直接以瀏覽器開啟 `index.html` 即可使用，無需安裝套件或連接網路。網頁字體會嘗試載入 Google Fonts；離線時使用系統字體。

## 題庫與來源

題目資料在 `data.js`，互動邏輯在 `app.js`，樣式在 `styles.css`。題組目前以已核對課程地圖的植物、動物、天氣、水域生物、昆蟲、日月星辰、大地、岩石及生態單元為主，逐題組標示年級、學期、出版社與來源單元。

- [三至六年級課程地圖摘錄](docs/course-map-grades-3-6.md)
- [來源與內容說明](docs/references.md)
- [教師使用說明](docs/teacher-guide.md)
- [測試與建置紀錄](docs/test-report.md)

課程地圖來源：<https://prayer168.github.io/science-course/>。各出版社編排不同，請教師依實際採用版本選題。

## GitHub Pages

網站來源位於獨立的 `website/` 資料夾，影片錄製與剪輯資產不在網站目錄內。GitHub Repo：<https://github.com/prayer168/natural-science-backward-span>。GitHub Pages 公開網址：<https://prayer168.github.io/natural-science-backward-span/>。中英文 Facebook 分享頁：`share/facebook-post.html`；分享縮圖：`assets/images/og-cover.png`。

## 版本

目前版本：`0.4.1`。版本紀錄請參閱 `history.md`。

## 使用手冊

- [HTML 使用手冊](docs/使用手冊.html)
- [PDF 使用手冊](docs/使用手冊.pdf)
- [Word 使用手冊](docs/使用手冊.docx)

手冊依網站 0.4.1 版重新編寫，詳列四種模式、操作流程、課前與課中使用時機、班級帶領建議、操作限制及常見問題。完整課程題庫與單元來源請參閱 [教師使用說明](docs/teacher-guide.md)。
