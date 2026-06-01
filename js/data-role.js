/**
 * data-role.js - 角色資料（單一來源）
 *
 * roleData 同時驅動：
 *   - 首頁 / 內頁角色卡片  → renderRoleCards()
 *   - 解決方案一覽頁 Wizard → renderRoleWizard()
 *
 * ── 欄位說明 ──────────────────────────────────────────────────
 * [共用]
 * id           (必填) 'retail' | 'system' | … 唯一識別碼
 * title        角色顯示名稱（卡片標題 & Wizard 側欄標籤）
 * color        角色主色（HEX）；未填 → fallback dark
 * icon         角色圖示路徑（供 renderRoleCards 使用）
 * description  角色一句說明（供 renderRoleCards 使用）
 * btnText      卡片按鈕文字（供 renderRoleCards 使用）
 * link         卡片按鈕連結（供 renderRoleCards 使用）
 *
 * [Wizard 層 — renderRoleWizard 使用]
 * label        Wizard 角色選擇卡的字母（e.g. 'A'）
 * panelTitle   展開 Panel 的大標題（e.g. '選擇您的狀況'）
 * multiSelect  true → 情境清單改為 checkbox 複選；預設 false（radio 單選）
 * scenarios[]  情境選項，每項含：
 *                label — 選項標題
 *                desc  — 選項說明文字
 *                link  — (選填) 方案頁連結；若有 link，系統自動從 data-solution.js 查詢 name & color
 * ctaButtons[] Wizard Panel 底部 CTA 按鈕，每項含：
 *                text   — 按鈕文字
 *                link   — 連結
 *                style  — (選填) Bootstrap 按鈕 variant（e.g. 'outline-dark'）；若無 link 對應方案時使用
 *              若 link 對應 data-solution.js 中的方案，系統自動取 name & color
 * ─────────────────────────────────────────────────────────────
 */

// ── 角色資料（客戶只需編輯這裡）────────────────────────────
var roleData = [
  {
    // ── 共用 ──
    id          : 'retail',
    title       : '我是店家，想快速上線',
    color       : '#09648f',
    icon        : 'img/icons/role-store.svg',
    description : '適合零售、餐飲門市，合法快速開立電子發票，系統無痛串接。',
    btnText     : '看店家方案',
    link        : 'pages/EINV_solution_overview.html',

    // ── Wizard ──
    label       : 'A',
    panelTitle  : '選擇您的狀況',
    multiSelect : false,
    scenarios   : [
      {
        label: '我使用群豐 POS',
        desc : '已有群豐POS系統，希望快速整合電子發票開立',
        link : 'pages/EINV_solution1.html'
      },
      {
        label: '我沒有POS，想用平台開立',
        desc : '無POS系統，想透過網頁平台手動或匯入開立發票',
        link : 'pages/EINV_solution2.html'
      },
      {
        label: '我有POS，但不是群豐',
        desc : '使用他牌POS，需要整合或客製化電子發票解決方案',
        link : 'pages/EINV_solution3.html'
      }
    ],
    ctaButtons  : []
  },

  {
    // ── 共用 ──
    id          : 'system',
    title       : '我是系統商／IT人員',
    color       : '#181a36',
    icon        : 'img/icons/role-system.svg',
    description : '需要API串接與客製整合服務，支援各類POS、ERP系統。',
    btnText     : '看技術方案',
    link        : 'pages/EINV_solution_overview.html',

    // ── Wizard ──
    label       : 'B',
    panelTitle  : '您需要什麼？',
    multiSelect : true,
    scenarios   : [
      {
        label: 'API串接',
        desc : '需要透過API將既有系統與電子發票平台串接'
      },
      {
        label: '電子發票代理開立',
        desc : '需要協助代為開立、管理電子發票'
      },
      {
        label: '客製專案整合',
        desc : '需要依業務流程設計專屬的電子發票整合方案'
      }
    ],
    ctaButtons  : [
      { text: '豪華包車', link: 'pages/EINV_solution3.html' },
      { text: '技術支援', link: 'pages/EINV_tech_support.html', style: 'outline-dark' }
    ]
  }
];
// ─────────────────────────────────────────────────────────────
