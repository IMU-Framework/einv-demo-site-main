/**
 * faq-data.js — FAQ 知識庫資料
 *
 * faqCategories : 類別清單（決定 tile 順序與 section 標題）
 * faqData       : FAQ 項目（每筆含 category 對應 faqCategories[n].id）
 *
 * 渲染邏輯由 js/components.js 的 renderFaqCategories() / renderFaqSections() 負責。
 *
 * ── 欄位說明 ──────────────────────────────────────────────────────────────
 * category     (必填) 對應 faqCategories[n].id；空值或不存在的 id → 歸入「其他」
 * title        (必填) 問題標題；空值 → 不顯示該題
 * body.brief   (選填) 摘要；在 FAQ 總頁 Accordion 以一般段落呈現；
 *                     在獨立頁亦顯示（Callout 樣式）；空值 → 不顯示
 * body.content (選填) 詳細內容；有值 → 顯示「了解更多」按鈕；空值 → 不顯示按鈕
 * image        (選填) 圖片路徑，如 'img/FAQ/placeholder_accordion.svg'；空值 → 不顯示圖片欄
 * video        (選填) YouTube 完整網址，自動轉 embed；video 優先於 image；空值 → 不顯示
 * slug         (選填) 獨立頁 slug；body.content 有值時自動推導 pages/EINV_faq-{slug}.html
 * ctaModal     (選填) true = 觸發 #contactform Modal（須 body.content 有值才顯示按鈕）
 * solutionRelated (選填) 陣列 [s1,s2,s3]，1 = 顯示在對應方案頁的【常見問題】，0 = 不顯示
 *                          index 0=solution1 POS直達車，1=solution2 共享小平台，2=solution3 豪華包車
 * ──────────────────────────────────────────────────────────────────────────
 */

var faqCategories = [
  { id: 'general',     label: '電子發票通則' },
  { id: 'onboarding',  label: '上線與導入' },
  { id: 'compliance',  label: '法規與認證' },
  { id: 'integration', label: 'API 與串接' },
  { id: 'hardware',    label: '硬體設備' },
  { id: 'billing',     label: '費用與方案' },
  { id: 'other',       label: '其他' }
];

var faqData = [

  /* ── 電子發票通則 ──────────────────────────────────────────────────────── */
  {
    category : 'general',
    title    : '什麼是電子發票？',
    body     : {
      brief  : '電子發票是由政府認可的數位憑證，取代傳統紙本發票，透過加值中心上傳至財政部平台，具完整法律效力，可節省紙本儲存成本並簡化對帳流程。',
      content: '<h5>電子發票的運作流程</h5><p>電子發票的開立流程分為三個主要步驟：首先，商家透過財政部認可的加值中心（如群豐）建立系統串接；其次，每筆交易完成後，系統即時產生符合規範的電子發票並上傳至財政部「電子發票整合服務平台（EINV）」；最後，平台將發票資訊回傳至買受人指定的載具（手機條碼、自然人憑證等）或紙本列印。</p><h5>電子發票 vs. 傳統紙本發票</h5><ul><li><strong>成本</strong>：省去紙張、印表機耗材及人工歸檔成本，年節省金額視交易量而定。</li><li><strong>效率</strong>：開立、作廢、折讓全程線上完成，無需補印紙本；對帳作業自動化。</li><li><strong>合規</strong>：所有發票即時上傳財政部平台，隨時可查驗，大幅降低稽查風險。</li><li><strong>環保</strong>：減少紙本耗用，符合 ESG 永續經營目標。</li></ul><p>根據財政部統計，全台電子發票開立率已逾 95%，趨勢明確，建議尚未導入的企業儘早規劃。</p>'
    },
    image    : 'img/FAQ/placeholder_accordion.svg',
    video    : '',
    slug     : 'what-is-einvoice',
    ctaModal : false,
    solutionRelated: [1, 1, 1]
  },
  {
    category : 'general',
    title    : '電子發票適用哪些業種？',
    body     : {
      brief  : '零售、餐飲、服務業、電商均適用。依財政部規定，年營業額超過一定門檻須強制使用電子發票，建議提早導入以利合規。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : false,
    solutionRelated: [1, 1, 1]
  },

  /* ── 上線與導入 ────────────────────────────────────────────────────────── */
  {
    category : 'onboarding',
    title    : '上線需要多久時間？',
    body     : {
      brief  : '一般而言，從申請到系統正式上線約需 5–10 個工作天，視貴公司既有系統複雜度而定。群豐提供專人輔導，協助您快速完成環境設定與測試。',
      content: ''
    },
    image    : 'img/FAQ/placeholder_accordion.svg',
    video    : '',
    slug     : '',
    ctaModal : false,
    solutionRelated: [1, 1, 1]
  },
  {
    category : 'onboarding',
    title    : '需要準備哪些文件？',
    body     : {
      brief  : '需備妥營業登記資料、統一編號、負責人身分證明，以及現有收銀或 ERP 系統的串接規格文件。群豐業務窗口將協助您逐步確認所需資料。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : false,
    solutionRelated: [1, 1, 1]
  },

  /* ── 法規與認證 ────────────────────────────────────────────────────────── */
  {
    category : 'compliance',
    title    : '是否符合國稅局規範？',
    body     : {
      brief  : '群豐為財政部認可之電子發票加值中心合作夥伴，所有開立流程完全符合財政部電子發票整合服務平台（EINV）規範，確保每張發票均可即時上傳查驗。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : false,
    solutionRelated: [1, 1, 1]
  },
  {
    category : 'compliance',
    title    : '發票作廢或折讓如何處理？',
    body     : {
      brief  : '系統支援線上作廢與折讓單開立，作廢記錄即時回傳財政部平台，符合電子發票作業辦法相關規定，無需另行補印紙本。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : false,
    solutionRelated: [1, 1, 1]
  },

  /* ── API 與串接 ────────────────────────────────────────────────────────── */
  {
    category : 'integration',
    title    : '支援哪些串接方式？',
    body     : {
      brief  : '提供 REST API、SOAP Web Service 及代理程式三種串接方式，並附完整 Sandbox 測試環境。無論是現有的 POS、ERP 或自建系統，均可靈活整合。',
      content: ''
    },
    image    : '',
    video    : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',  /* TODO: 替換為正式說明影片連結 */
    slug     : '',
    ctaModal : true,
    solutionRelated: [1, 1, 0]
  },
  {
    category : 'integration',
    title    : '是否提供測試環境？',
    body     : {
      brief  : '是的。群豐提供與正式環境規格完全相同的 Sandbox 測試環境，方便開發人員在正式上線前完整驗證串接流程，降低上線風險。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : false,
    solutionRelated: [1, 1, 0]
  },

  /* ── 硬體設備 ──────────────────────────────────────────────────────────── */
  {
    category : 'hardware',
    title    : '適合連鎖門市使用嗎？',
    body     : {
      brief  : '適合。系統支援多店集中管理，每台 POS 獨立授權開立，總部可即時查閱各門市發票開立狀況，並統一管理載具對獎、捐贈碼設定等作業。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : false,
    solutionRelated: [1, 0, 0]
  },
  {
    category : 'hardware',
    title    : '需要更換現有 POS 機嗎？',
    body     : {
      brief  : '不需要。群豐採用軟體串接方式，只需在現有設備安裝代理程式或透過 API 串接，無須更換硬體，大幅降低導入成本。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : false,
    solutionRelated: [1, 0, 0]
  },

  /* ── 費用與方案 ────────────────────────────────────────────────────────── */
  {
    category : 'billing',
    title    : '費用如何計算？',
    body     : {
      brief  : '依月開立張數分級計費，提供輕量版（≤500 張／月）、標準版（≤5,000 張／月）、企業版（無限制）三種方案，各方案均含基本技術支援。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : true,
    solutionRelated: [0, 0, 0]
  },
  {
    category : 'billing',
    title    : '是否有免費試用期？',
    body     : {
      brief  : '首次導入客戶可享 30 天免費試用，期間功能與正式版完全相同，協助您在無風險前提下評估是否符合業務需求。',
      content: ''
    },
    image    : '',
    video    : '',
    slug     : '',
    ctaModal : true,
    solutionRelated: [0, 0, 0]
  }

];
