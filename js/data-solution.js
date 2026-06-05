/**
 * data-solution.js — 方案管理 Database（單一來源）
 *
 * solutionData 同時驅動：
 *   - 首頁 / overview 頁的方案卡片  → renderSolutionCards()
 *   - 各方案 detail 頁              → renderSolutionPage()
 *
 * ── 欄位說明 ──────────────────────────────────────────────────────────────
 * [共用]
 * id               (必填) 'solution1' … 唯一識別碼
 * isPlaceholder    true → 佔位卡片（button 鎖定、detail 頁欄位不填）；省略或 false → 正式方案
 * color            方案主色（十六進位，e.g. '#0d6efd'）；placeholder 不填
 * colorRgb         主色 RGB 分量（e.g. '13, 110, 253'），供 rgba() 透明度衍生使用
 * active           (選填) false → 從所有列表隱藏（預設 true）
 *
 * [卡片層 — renderSolutionCards 使用]
 * tag              卡片 badge 文字
 * name             方案顯示名稱（卡片標題 / detail 頁 h1 / breadcrumb）
 * cardText         卡片短說明（1~2 句）
 * icon             Bootstrap Icon class（e.g. 'bi-display'）
 * link             卡片「了解更多」連結；placeholder 填 '#'
 *
 * [Detail 頁層 — renderSolutionPage 使用，placeholder 不填]
 * heroSubtitle       Hero 區副標文字（可含 HTML，如 <b>、<br>）
 * featuresSubheading Section 2 副標
 * features[]         4 項功能特色，每項含：
 *                      icon  — Bootstrap Icon class（e.g. 'bi-plug'）
 *                      title — 標題文字
 *                      desc  — 說明文字（可含 HTML，如 <b>、<br>、• 條列）
 * processSubheading  Section 3 副標
 * process[]          服務步驟，每項含：
 *                      circle — 圓圈內文字（e.g. '1.評估'）
 *                      title  — 步驟標題
 *                      desc   — 步驟說明
 *                      accent — true 表示最後一步（深色圓圈）
 * storeFeatures[]    Section 4「對店家」tab 左側 bullet 文字列表（可含 HTML）
 * techFlowNodes[]    Section 4「對店家」tab 右側流程圖節點，每項含：
 *                      icon  — Bootstrap Icon class
 *                      label — 節點標籤文字
 *                    （共 3 項，節點間自動加箭頭 →）
 * itFeatures[]       Section 4「對IT人員」tab 左側 bullet 文字列表（可含 HTML）
 *                    有內容時顯示左 bullet + 右架構圖雙欄；空陣列則僅顯示架構圖
 * faqIndex           1/2/3，對應 renderSolutionFaq 的 solutionIdx
 * ──────────────────────────────────────────────────────────────────────────
 */

var solutionData = [

  /* ── Solution 1：POS直達車 ──────────────────────────────────────────────── */
  {
    id            : 'solution1',
    color         : '#0E4E96',
    colorRgb      : '14, 78, 150', //always update when color hex changes//
    active        : true,

    tag           : '群豐用戶',
    name          : 'POS 直達車',
    cardText      : '已使用群豐POS的店家，最快速的電子發票上線選擇',
    icon          : 'bi-bus-front-fill',
    image         : 'img/home/solution-01.png',
    heroImage     : 'img/solutions/solution-01-hero.png',
    link          : 'pages/EINV_solution1.html',

    heroSubtitle  : '適合已是群豐POS的用戶，快速開立電子發票',

    featuresSubheading: '讓開立發票變簡單，營運更順暢',
    features: [
      { icon: 'bi-graph-up',    title: '提升效率', desc: '自動上傳及整合，減少人工作業' },
      { icon: 'bi-wallet2',     title: '降低成本', desc: '免額外設備與開發，減少支出' },
      { icon: 'bi-shield-check',title: '合法合規', desc: '符合國稅局規範，安心使用' },
      { icon: 'bi-lightning',   title: '快速開立', desc: '結帳完成立即開立，省時又省力' }
    ],

    processSubheading: '只要 4 個步驟，輕鬆上線',
    process: [
      { circle: '1.評估', title: '確認需求', desc: '專人為您需求訪談，為店家規劃最適方案' },
      { circle: '2.申請', title: '前置作業', desc: '協助準備文件，向國稅局提出字軌申請' },
      { circle: '3.串接', title: '建置、測試', desc: '系統環境建置、硬體確認及API測試' },
      { circle: '4.上線', title: '維運支援', desc: '正式開立發票，持續提供支援確保穩定運行', accent: true }
    ],

    storeFeatures: [
      '結帳時一鍵開立電子發票',
      '自動上傳至國稅局，不需手動匯出',
      '支援載具（手機條碼／自然人憑證）',
      '發票查詢與重傳',
      '與群豐POS完美整合'
    ],

    techFlowNodes: [
      { icon: 'bi-display', label: '群豐POS' },
      { icon: 'bi-cloud-fog2-fill',   label: '電子發票平台' },
      { icon: 'bi-bank2',    label: '財政部國稅局' }
    ],

    itFeatures: [
      // 'IT特點1',
      // 'IT特點2',
      // 'IT特點3'
    ],

    faqIndex: 1,

    compareRows: [
      { key: 'infra',    value: '限群豐POS' },
      { key: 'itLevel',  value: '零開發' },
      { key: 'target',   value: '群豐POS用戶',   highlight: true },
      { key: 'pricing',  value: '系統綁定' },
      { key: 'lottery',  value: '支援' }
    ]
  },

  /* ── Solution 2：共享小平台 ─────────────────────────────────────────────── */
  {
    id            : 'solution2',
    color         : '#17A6E8',
    colorRgb      : '23, 166, 232', //always update when color hex changes//
    active        : true,

    tag           : '最低門檻',
    name          : '共享小平台',
    cardText      : '免 POS 也能快速開立電子發票，適合零售與餐飲實體門市的最低門檻合規選擇',
    icon          : 'bi-cart4',
    image         : 'img/home/solution-02.png',
    heroImage     : 'img/solutions/solution-02-hero.png',
    link          : 'pages/EINV_solution2.html',

    heroSubtitle  : '適合尚未導入 POS、交易量不高，或需要以最低成本合法開立電子發票的零售與餐飲實體門市。<br><br>只要完成電子發票資格申請，即可透過平台網站直接開立、管理與列印電子發票。',

    featuresSubheading: '讓電子發票開立更簡單，營運更彈性',
    features: [
      { icon: 'bi-graph-up',     title: '提升效率', desc: '免系統開發、免串接 API，登入平台即可開立與管理電子發票，縮短導入時程。' },
      { icon: 'bi-wallet2',      title: '降低成本', desc: '不需建置 POS 系統、只需一台發票列印機，系統以共享平台模式，降低初期與維運成本' },
      { icon: 'bi-shield-check', title: '合法合規', desc: '符合財政部電子發票相關規範，與財政部大平台串接，安心使用' },
      { icon: 'bi-pencil-square',title: '彈性開立', desc: '人工開立或檔案匯入皆可，依作業習慣選擇最適合的開票方式' }
    ],

    processSubheading: '只要 4 個步驟，輕鬆上線',
    process: [
      { circle: '1.評估', title: '確認需求', desc: '了解您的交易型態、發票開立頻率與使用情境，評估是否適合共享小平台方案。' },
      { circle: '2.申請', title: '前置作業', desc: '選定方案後，群豐協助準備電子發票資格文件，向國稅局申請開立資格。' },
      { circle: '3.建置', title: '設定、測試', desc: '建立帳號、發票取號、設定發票機與商品資料，即可開立發票。' },
      { circle: '4.上線', title: '維運支援', desc: '正式上線開立電子發票，提供平台操作與後續支援服務。', accent: true }
    ],

    storeFeatures: [
      '網頁版平台操作，免安裝系統',
      '支援<b>人工逐筆開立電子發票</b>',
      '支援 <b>Excel／TXT 檔案匯入批次開立</b>',
      '可搭配發票機即時列印發票',
      '發票資料集中管理，查詢、作廢更便利'
    ],

    techFlowNodes: [
      { icon: 'bi-pc-display',  label: '你的電腦' },
      { icon: 'bi-cloud-fog2-fill', label: '電子發票平台' },
      { icon: 'bi-bank2',  label: '財政部國稅局' }
    ],

    itFeatures: [
      '由共享小平台作為<b>第三方前置系統</b>',
      '平台統一處理：發票配號、MIG 資料轉換、與財政部電子發票大平台串接',
      '店家端<b>無需</b>具備：MIG 格式產生能力、API 串接與系統開發'
    ],

    faqIndex: 2,

    compareRows: [
      { key: 'infra',    value: '無需POS' },
      { key: 'itLevel',  value: '零開發' },
      { key: 'target',   value: '小型商家、無POS店家',   highlight: true },
      { key: 'pricing',  value: '彈性月租' },
      { key: 'lottery',  value: '支援' }
    ]
  },

  /* ── Solution 3：豪華包車 ───────────────────────────────────────────────── */
  {
    id            : 'solution3',
    color         : '#C67315',
    colorRgb      : '198, 115, 21', //always update when color hex changes//
    active        : true,

    tag           : '全客製化',
    name          : '豪華包車',
    cardText      : '具備技術能力的系統首選，量身打造的電子發票整合解決方案',
    icon          : 'bi-cpu-fill',
    image         : 'img/home/solution-03.png',
    heroImage     : 'img/solutions/solution-03-hero.png',
    link          : 'pages/EINV_solution3.html',

    heroSubtitle  : '適合使用他牌<b>POS、ERP、後台系統</b>，且企業內部具備 IT 人員或配合開發廠商的客戶。不受既有架構限制，依實際需求與可配合程度，規劃最合適的電子發票整合模式。<br><br>不只是一個產品，而是一套可共同設計的解決方案。',

    featuresSubheading: '依據你的系統現況與營運需求，彈性組合服務內容',
    features: [
      { icon: 'bi-plug',            title: '系統串接', desc: '<strong>多元方式整合既有系統</strong><br>• 與 POS／ERP 透過<b>API串接交易資料</b><br>• 或以<b>檔案交換（批次上傳）</b><br>• 配合既有交易流程，不影響前台收銀作業' },
      { icon: 'bi-code-slash',      title: '協助開發', desc: '<strong>降低客戶端開發與整合風險</strong><br>• 提供<b>發票列印外掛</b>或列印流程建議<br>• 協助電子發票整合<b>功能規劃與技術諮詢</b><br>• 依不同系統能力，調整最適實作方式' },
      { icon: 'bi-arrow-left-right',title: '整合服務', desc: '<strong>依需求選擇不同發票處理機制</strong><br>• 協助向財政部<b>取得發票配號</b><br>• 支援POS端自行配號、批次取號、即時逐張取號<br>• 可依情境提供<b>代開電子發票</b>解決方案' },
      { icon: 'bi-box-seam',        title: '擴充加值', desc: '<strong>為未來營運預留彈性</strong><br>• 會員載具整合<br>• 代開、代印發票<br>• Email／簡訊發票開立通知<br>• 配合專案需求規劃加值模組' }
    ],

    processSubheading: '依需求調整，不限固定流程',
    process: [
      { circle: '1.需求', title: '需求盤點',     desc: '深入了解既有 POS／ERP 架構與交易流程。' },
      { circle: '2.設計', title: '方案設計',     desc: '確認串接方式（API／檔案）、配號模式與作業角色分工。' },
      { circle: '3.整合', title: '技術整合與測試', desc: '協助測試資料格式、列印流程與發票上傳狀態。' },
      { circle: '4.上線', title: '正式上線與優化', desc: '上線後依實際營運狀況調整與擴充功能。', accent: true }
    ],

    storeFeatures: [
      '不需更換既有 POS／ERP',
      '電子發票流程可完全貼近原本作業模式',
      '適合連鎖、多系統、或特殊交易情境'
    ],

    techFlowNodes: [
      { icon: 'bi-pc-display-horizontal', label: '既有ERP/POS系統' },
      { icon: 'bi-cloud-fog2-fill',   label: '電子發票平台' },
      { icon: 'bi-bank2',    label: '財政部國稅局' }
    ],

    itFeatures: [
      '提供完整 API、技術文件與測試環境',
      '小平台作為第三方前置系統（Turnkey）',
      '將複雜的 MIG 格式介接、發票狀態回傳，集中由平台處理'
    ],

    faqIndex: 3,

    compareRows: [
      { key: 'infra',    value: '既有非群豐系統 / ERP' },
      { key: 'itLevel',  value: '需API串接 / 客製開發' },
      { key: 'target',   value: '系統商、大型連鎖、自有POS',   highlight: true },
      { key: 'pricing',  value: '專案報價' },
      { key: 'lottery',  value: '支援' }
    ]
  },

  /* ── Solution 4：Placeholder ─────────────────────────────────────────────
     示意客戶未來可依格式新增自訂方案；detail 頁欄位暫不填寫              */
  {
    id            : 'solution4',
    isPlaceholder : true,
    active        : true,

    tag           : '即將推出',
    name          : '自訂方案 4',
    cardText      : '（預留位置）此欄位由客戶依需求自行設定方案名稱與內容說明',
    icon          : 'bi-plus-circle',
    link          : '#',

    faqIndex: 4,

    compareRows: [
      { key: 'infra',    value: 'Lorem ipsum' },
      { key: 'itLevel',  value: 'Lorem ipsum' },
      { key: 'target',   value: 'Lorem ipsum',   highlight: true },
      { key: 'pricing',  value: '專案報價' },
      { key: 'lottery',  value: 'Lorem ipsum' }
    ]
  },

  /* ── Solution 5：Placeholder ─────────────────────────────────────────────
     示意客戶未來可依格式新增自訂方案；detail 頁欄位暫不填寫              */
  {
    id            : 'solution5',
    isPlaceholder : true,
    active        : true,

    tag           : '即將推出',
    name          : '自訂方案 5',
    cardText      : '（預留位置）此欄位由客戶依需求自行設定方案名稱與內容說明',
    icon          : 'bi-plus-circle',
    link          : '#',
 
    faqIndex: 5,

    compareRows: [
      { key: 'infra',    value: 'Lorem ipsum' },
      { key: 'itLevel',  value: 'Lorem ipsum' },
      { key: 'target',   value: 'Lorem ipsum',   highlight: true },
      { key: 'pricing',  value: '專案報價' },
      { key: 'lottery',  value: 'Lorem ipsum' }
    ]
  }

];
