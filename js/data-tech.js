/**
 * data-tech.js — 技術支援頁面資料
 *
 * techServicesData      : 我們提供的技術服務（Accordion）
 * techDocsData          : 技術文件入口（文件連結清單）
 * techServiceCenterData : 線上服務中心（快捷按鈕）
 *
 * 渲染邏輯由 js/components.js 的 renderPageAccordion() /
 * renderTechDocsList() / renderServiceCenterButtons() 負責。
 *
 * ── 欄位說明（techServicesData）────────────────────────────
 * title    (必填) 服務項目名稱
 * body     (必填) 說明文字
 * image    (選填) 圖片路徑，如 'img/tech/placeholder_accordion.svg'；空值 → 不顯示圖片欄
 * ctaModal     (必填) true = 觸發 #contactform Modal；false = 使用 ctaLink
 * ctaLink      (選填) ctaModal 為 false 時的目標網址
 * techRelated  (選填) 陣列 [s1,s2,s3]，1 = 顯示在對應方案頁的【技術服務】，0 = 不顯示
 *                       index 0=solution1 POS直達車，1=solution2 共享小平台，2=solution3 豪華包車
 * ────────────────────────────────────────────────────────────
 *
 * ── 欄位說明（techDocsData）─────────────────────────────────
 * icon  Bootstrap icon class，如 'bi-file-earmark-pdf'
 * label 顯示文字
 * href  連結網址；空字串 = 尚未提供（連結呈現但不可跳轉）
 * ────────────────────────────────────────────────────────────
 *
 * ── 欄位說明（techServiceCenterData）────────────────────────
 * label 按鈕文字
 * href  目標網址
 * ────────────────────────────────────────────────────────────
 */

/* ── 我們提供的技術服務 ──────────────────────────────────────── */
var techServicesData = [
  {
    title        : 'API串接',
    body         : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
    image        : 'img/tech/placeholder_accordion.svg',
    ctaModal     : true,
    ctaLink      : '#',   /* 填入 API 串接說明頁網址後，將上方 ctaModal 改為 false */
    techRelated  : [0, 0, 1]
  },
  {
    title        : '發票代理程式',
    body         : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    image        : '',
    ctaModal     : true,
    ctaLink      : '#',   /* 填入說明頁網址後，將上方 ctaModal 改為 false */
    techRelated  : [0, 0, 1]
  },
  {
    title        : '測試環境、正式環境',
    body         : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    image        : '',
    ctaModal     : false,
    ctaLink      : '#',
    techRelated  : [0, 0, 1]
  }
];

/* ── 技術文件入口 ─────────────────────────────────────────────── */
var techDocsData = [
  { icon: 'bi-file-earmark-pdf', label: 'API 功能列表 (PDF)', href: '' },
  { icon: 'bi-file-earmark-pdf', label: '串接流程 (PDF)',     href: '' },
  { icon: 'bi-file-earmark-pdf', label: '申請方式 (PDF)',     href: '' }
];

/* ── 線上服務中心 ─────────────────────────────────────────────── */
var techServiceCenterData = [
  { label: '發票查詢',       href: '#' },
  { label: '載具查詢',       href: '#' },
  { label: '線上報修',       href: '#' },
  { label: '申請服務 / API', href: '#' }
];
