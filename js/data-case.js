/**
 * case-data.js — 成功案例資料庫
 *
 * caseData : 案例項目
 *
 * 渲染邏輯由 js/components.js 及各頁面行內 script 負責。
 *
 * ── 欄位說明 ──────────────────────────────────────────────────────────────
 * id            (必填) 唯一識別碼；對應 HTML 檔名慣例 EINV_{id}.html
 * industry      (必填) 業種標籤（顯示於卡片）
 * solution      (必填) 方案名稱（顯示於卡片）
 * solutionLink  (必填) 對應方案獨立頁 URL
 * title         (必填) 案例標題
 * desc          (必填) 卡片摘要
 * link          (必填) 案例獨立頁 URL
 * img           (必填) 卡片縮圖路徑
 * featured      (選填) true = 列入首頁精選；空值 fallback 為 true
 * ──────────────────────────────────────────────────────────────────────────
 */

var caseData = [
  {
    id           : 'case1',
    industry     : '餐飲',
    solution     : 'POS直達車',
    solutionLink : 'pages/EINV_solution1.html',
    logo         : 'img/clients/logo/HWC.png',
    title        : '黑沃咖啡',
    desc         : '連鎖咖啡品牌導入 VENUS 餐飲 POS，實現跨門市一致化管理，大幅降低新進人員教育訓練時間。',
    link         : 'pages/EINV_case1.html',
    img          : 'img/cases/case1.jpg',
    featured     : true,
    quote        : '連鎖咖啡品牌，打造穩定又有彈性的門市營運流程',
    body         : '作為近年快速成長的連鎖咖啡品牌，黑沃咖啡在門市營運上高度重視出杯效率、收銀穩定度與跨門市管理一致性。隨著門市數量增加，若各店使用不同作業流程，容易造成管理負擔，也影響顧客消費體驗。<br><br>導入 VENUS 餐飲 POS 後，黑沃咖啡能以一致的收銀與點餐流程，快速複製至各地門市。從櫃檯點單、加料選項，到交易完成與發票處理，門市人員都能直覺操作，大幅降低教育訓練時間，即使是新進人員也能快速上手。<br><br>在營運端，總部可更輕鬆掌握各門市的銷售狀況與營運表現，讓管理更有依據。對消費者而言，點餐流程順暢，等待時間縮短，也提升整體品牌好感度。VENUS POS 成為黑沃咖啡在拓展門市與維持營運品質上的重要後盾。'
  },
  {
    id           : 'case2',
    industry     : '餐飲',
    solution     : 'POS直達車',
    solutionLink : 'pages/EINV_solution1.html',
    logo         : 'img/clients/logo/nagata.png',
    title        : '長田本庄軒',
    desc         : '日式餐飲品牌透過 VENUS POS 讓點餐與收銀流程更順暢，即使尖峰時段也能維持穩定出餐節奏。',
    link         : 'pages/EINV_case2.html',
    img          : 'img/cases/case2.jpg',
    featured     : true,
    quote        : '日式餐飲品牌，用系統撐起尖峰時段的出餐效率',
    body         : '以現點現做的日式料理為特色，長田本庄軒在用餐尖峰時段常面臨大量訂單同時湧入的狀況。若點餐與收銀流程不夠順暢，容易影響出餐節奏，也會拉長顧客等待時間。<br><br>導入 VENUS 餐飲 POS 後，門市可透過清楚的點餐介面快速完成訂單處理，減少人工記錄與溝通錯誤，讓前台與後場銜接更加順暢。即使在高峰時段，門市仍能維持穩定節奏，確保餐點品質。<br><br>同時，系統協助門市累積營運數據，讓管理者更清楚了解熱銷品項與營運狀況，作為後續調整菜單或人力配置的參考。VENUS POS 協助長田本庄軒在忙碌的營運現場中，兼顧效率、品質與顧客滿意度。'
  },
  {
    id           : 'case3',
    industry     : '零售',
    solution     : 'POS直達車',
    solutionLink : 'pages/EINV_solution1.html',
    logo         : 'img/clients/logo/matsumoto.png',
    title        : '松本清',
    desc         : '大型連鎖藥妝通路導入 SMEPOS，在高來客量環境下穩定維持收銀品質與跨門市作業一致性。',
    link         : 'pages/EINV_case3.html',
    img          : 'img/cases/case3.jpg',
    featured     : true,
    quote        : '連鎖藥妝零售，穩定支撐高頻交易與門市一致性',
    body         : '松本清作為大型連鎖藥妝通路，門市商品數量龐大、交易頻率高，對收銀效率與系統穩定性有極高要求。在尖峰時段，若結帳流程不夠順暢，將直接影響顧客體驗與門市營運效率。<br><br>導入 SMEPOS 零售 POS 後，門市收銀流程更加順暢，商品結帳、促銷折扣與交易處理皆能穩定執行。系統介面設計清楚，讓門市人員能快速完成作業，減少人為操作錯誤，即使在高來客量時段也能維持穩定服務品質。<br><br>對管理端而言，各門市能以一致的作業流程營運，總部更容易掌握整體銷售概況。SMEPOS 協助松本清在追求營運效率與顧客滿意度之間，取得良好的平衡。'
  },
  {
    id           : 'case4',
    industry     : '零售',
    solution     : 'POS直達車',
    solutionLink : 'pages/EINV_solution1.html',
    logo         : 'img/clients/logo/new9ta.png',
    title        : '久大文具',
    desc         : '文具零售門市透過 SMEPOS 輕鬆管理多元商品品項，收銀直覺快速，讓日常營運管理回歸簡單。',
    link         : 'pages/EINV_case4.html',
    img          : 'img/cases/case4.jpg',
    featured     : true,
    quote        : '商品種類多樣，讓收銀與管理回歸簡單',
    body         : '文具零售門市商品品項眾多、價格帶差異大，從單支文具到套裝商品皆需快速且正確地完成結帳。久大文具希望透過穩定好用的 POS 系統，降低門市人員操作負擔，同時提升整體營運效率。<br><br>透過 SMEPOS 零售 POS，久大文具能有效管理大量商品資料，收銀人員在結帳時操作直覺，縮短顧客等待時間。日常營運中，無論補貨、調整商品或門市管理，都能在清楚的系統架構下進行。<br><br>系統的穩定性讓門市作業更安心，管理者也能更容易掌握銷售狀況，作為進貨與營運決策的參考。SMEPOS 成為久大文具在日常營運中不可或缺的重要工具。'
  },
  {
    id           : 'case5',
    industry     : '餐飲',
    solution     : '共享小平台',
    solutionLink : 'pages/EINV_solution2.html',
    logo         : 'img/clients/logo/case5-logo.jpg',
    title        : '中型餐飲門市',
    desc         : '餐飲門市無需建置 POS 系統，透過共享小平台以最低門檻快速完成電子發票合規，順利上線。',
    link         : 'pages/EINV_case5.html',
    img          : 'img/cases/case5.jpg',
    featured     : true,
    quote        : '免 POS 輕鬆合規，餐飲門市順利完成電子發票上線',
    body         : '一間中型餐飲門市在未導入 POS 系統的情況下，面臨電子發票開立的法規要求。由於日常作業以人工記錄為主，店家希望能以最低成本、最短時間完成合規，避免額外的系統建置負擔。<br><br>透過共享小平台方案，門市只需登入平台網站，即可手動逐筆開立電子發票，亦支援以 Excel 檔案批次匯入，搭配一台發票列印機即可滿足日常開票需求，無需自行建置 POS 系統或串接 API。<br><br>導入後，門市作業流程更清晰，電子發票管理集中於平台，查詢、作廢皆十分便利，後續合規維護也大幅簡化。共享小平台協助這間餐飲門市在有限資源下，順利完成電子發票上線，安心迎接法規要求。'
  },
  {
    id           : 'case6',
    industry     : '零售',
    solution     : '豪華包車',
    solutionLink : 'pages/EINV_solution3.html',
    title        : '客製案例一',
    desc         : '既有 POS 系統免更換，透過批次取號彈性整合，快速完成電子發票導入，不影響現場收銀流程。',
    link         : 'pages/EINV_case6.html',
    img          : 'img/cases/case6.jpg',
    featured     : true,
    quote        : '他牌 POS 系統，快速導入電子發票不中斷營運',
    body         : '某連鎖零售門市原本使用第三方 POS 系統進行日常收銀作業，系統本身並未內建完整的電子發票功能。隨著法規要求與營運需求提升，店家希望能在不更換既有 POS、不影響現場作業流程的前提下，快速導入電子發票服務。<br><br>透過群豐方案的彈性整合，協助該客戶採「批次取號」的電子發票模式。系統可一次向平台取得固定數量的發票號碼，POS 端只需依照原本交易流程逐筆使用配號開立發票即可，後續由前置系統統一完成資料轉換與上傳。<br><br>導入後，門市人員無須改變收銀操作習慣，IT 團隊也不必自行處理複雜的財政部介接規格，大幅降低開發與維運負擔。客戶成功於短時間內完成電子發票上線，兼顧營運穩定與法規合規，為後續系統升級與擴充保留彈性空間。'
  },
  {
    id           : 'case7',
    industry     : '零售',
    solution     : '豪華包車',
    solutionLink : 'pages/EINV_solution3.html',
    title        : '客製案例二',
    desc         : '多業態門市採分段配號解決方案，有效區分各業務發票來源，提升內部控管與對帳效率。',
    link         : 'pages/EINV_case7.html',
    img          : 'img/cases/case7.jpg',
    featured     : true,
    quote        : '多業務型態門市，發票配號清楚又好管理',
    body         : '一家同時經營「一般交易」與「固定月租服務」的業者，原本在發票管理上面臨配號混用、對帳困難的問題。由於不同業務類型開立頻率與模式差異大，若以單一發票配號方式處理，容易增加管理風險，也不利後續查核。<br><br>透過群豐的客製化整合，該客戶導入「分段配號」的電子發票解決方案。平台可依實際業務需求，將發票號碼依用途切割為不同區段，各系統僅能使用所屬的發票號碼範圍，清楚又直覺。<br><br>此模式讓客戶在不改動原有 POS 與後端系統架構的情況下，即可有效區分不同業務的發票來源，提升內部控管效率。發票開立、查詢與對帳流程也更加清楚，減少人工作業與錯誤風險，讓多元營運模式能在同一套電子發票架構下順利運作。'
  },
  {
    id           : 'case8',
    industry     : '零售',
    solution     : '豪華包車',
    solutionLink : 'pages/EINV_solution3.html',
    title        : '客製案例三',
    desc         : '高即時性交易場景採即時單張取號模式，POS 每完成一筆交易即開立發票，無需重新開發系統。',
    link         : 'pages/EINV_case8.html',
    img          : 'img/cases/case8.jpg',
    featured     : true,
    quote        : '即時取號開立，滿足高即時性交易需求',
    body         : '某特殊交易場景的門市系統，交易流程高度即時，但 POS 並不具備發票配號與資料轉換能力。若重新開發電子發票功能，不僅成本高，也可能影響既有系統穩定度，導入難度相對較高。<br><br>經評估後，群豐協助客戶採用「即時單張取號」的解決方案。POS 在每筆交易完成時，透過平台即時取得一張發票號碼完成開立，其餘電子發票相關處理（如格式轉換、上傳財政部）皆由前置系統代為處理，無需更動前台收銀流程。<br><br>此方案讓客戶在不修改既有系統架構的前提下，實現交易即時對應發票開立，完整符合法規要求，也大幅降低技術門檻與開發維護成本。'
  }
];
