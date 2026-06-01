/**
 * components.js - EMIS 共用組件 render 函式庫
 * 所有可重用組件的渲染邏輯，供所有頁面引用
 *
 * 使用方式：在 role-cards.js 之前載入，然後於頁面 $(function(){}) 中呼叫。
 */

/* ============================================================
   Section 標題
   elId  : 掛載容器的 id（不含 #）
   data  : { title, subtitle?, badge?, description?, decorated? }
   ============================================================ */
function renderSectionTitle(elId, data) {
  var el = document.getElementById(elId);
  if (!el) return;

  var badgeHTML = data.badge
    ? '<div class="section-title__badge">' + data.badge + '</div>'
    : '';

  var subtitleHTML = data.subtitle
    ? '<p class="section-title__sub">' + data.subtitle + '</p>'
    : '';

  var descHTML = data.description
    ? '<p class="section-title__desc">' + data.description + '</p>'
    : '';

  var decoratedClass = data.decorated ? ' section-title--decorated' : '';
  var marginClass    = (data.subtitle || data.description) ? 'mb-5' : 'mb-4';

  var trailingPunct  = /[？！。、，；：]$/.test(data.title);
  var punctClass     = trailingPunct ? ' section-title__main--punct-end' : '';

  el.innerHTML =
    '<div class="text-center section-title' + decoratedClass + ' ' + marginClass + '">' +
      badgeHTML +
      subtitleHTML +
      '<h2 class="section-title__main' + punctClass + '"><span>' + data.title + '</span></h2>' +
      descHTML +
    '</div>';
}

/* ============================================================
   Hero 特色圖示列（含桌面箭頭連接器）
   elId : 掛載容器的 id
   data : [{ icon: 'bi-shield-check', label: '符合國稅局規範' }, ...]
   ============================================================ */
function _hfsIconHTML(icon) {
  if (/[\/\\]/.test(icon) || /\.(svg|png|jpg|webp)$/i.test(icon)) {
    return '<img src="' + icon + '" alt="" class="hfs__icon-img">';
  }
  if (icon.indexOf('fa-') === 0) {
    var d = icon.indexOf('-', 3);
    return '<i class="' + icon.substring(0, d) + ' fa-' + icon.substring(d + 1) + '"></i>';
  }
  if (icon.indexOf('material:') === 0) {
    return '<span class="material-symbols-outlined">' + icon.slice(9) + '</span>';
  }
  if (icon.indexOf('material-') === 0) {
    return '<span class="material-symbols-outlined">' + icon.substring(9).replace(/-/g, '_') + '</span>';
  }
  return '<i class="bi ' + icon + '"></i>';
}

function renderHeroFeatures(elId, data) {
  var el = document.getElementById(elId);
  if (!el) return;

  var items = data.map(function(item) {
    return (
      '<div class="hfs__item">' +
        '<div class="hero-feature__icon">' +
          _hfsIconHTML(item.icon) +
        '</div>' +
        '<p class="hero-feature__label">' + item.label + '</p>' +
      '</div>'
    );
  }).join('');

  el.innerHTML = '<div class="hfs">' + items + '</div>';
}

/* ============================================================
   角色分流卡片
   elId : 掛載容器的 id
   data : roleData（來自 data-role.js）
   cfg  : { showCta?, ctaText?, ctaLink?, wizardPanels? }
         showCta     = true → 顯示底部導引按鈕
         wizardPanels= true → btn 點擊後展開 wizard panel（同解決方案一覽頁行為）
   ============================================================ */
function renderRoleCards(elId, data, cfg) {
  var el = document.getElementById(elId);
  if (!el) return;
  cfg = cfg || {};

  var cards = data.map(function(role) {
    var hex = role.color || '';
    var cardStyle = hex ? 'style="--role-card-color:' + hex + '"' : '';
    var flagStyle = hex ? ' style="color:' + hex + '"' : '';
    var btnHref = cfg.wizardPanels ? 'javascript:void(0)' : role.link;
    return (
      '<div class="col-12 col-md-4 mb-4" id="role_card_' + role.id + '" data-role-id="' + role.id + '">' +
        '<div class="role-card h-100" ' + cardStyle + '>' +
          '<div class="role-card__head">' +
            '<svg class="role-card__head-flag"' + flagStyle + ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 20" aria-hidden="true">' +
              '<path d="M0,0 L35,0 L17.5,20 Z" fill="currentColor"/>' +
            '</svg>' +
          '</div>' +
          '<div class="role-card__body">' +
            '<div class="role-card__icon">' +
              '<img src="' + role.icon + '" alt="' + role.title + '">' +
            '</div>' +
            '<h4 class="role-card__title">' + role.title + '</h4>' +
            '<p class="role-card__description">' + role.description + '</p>' +
            '<a href="' + btnHref + '" class="btn btn-role-outline rounded-pill px-4">' +
              role.btnText +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  var ctaHTML = cfg.showCta
    ? '<div class="col-12 text-center mt-2">' +
        '<a href="' + (cfg.ctaLink || '#') + '" ' +
           'class="btn btn-outline-secondary rounded-pill px-5">' +
          (cfg.ctaText || '了解更多') +
        '</a>' +
      '</div>'
    : '';

  var $el = $(el);
  var $row = $('<div class="row justify-content-center role-cards-row"></div>');
  $row.html(cards + ctaHTML);
  $el.empty().append($row);

  if (!cfg.wizardPanels) return;

  /* ── Wizard panels（點擊 btn 展開，行為同 renderRoleWizard）── */
  var $panels = $('<div class="role-wizard-panels" style="display:none"></div>');
  data.forEach(function(role) {
    var isIT    = role.ctaButtons && role.ctaButtons.length > 0;
    var isMulti = !!role.multiSelect;

    var scenariosHtml = role.scenarios.map(function(s) {
      var matchedSolution = getSolutionForScenario(s);
      var solutionName = matchedSolution ? matchedSolution.name : (s.solutionName || '');
      var solutionColor = matchedSolution ? (matchedSolution.colorRgb ? 'rgb(' + matchedSolution.colorRgb + ')' : matchedSolution.color) : (s.color || '');
      var linkHtml = s.link
        ? '<a href="' + s.link + '" class="role-wizard-scenario__link" style="color:' + solutionColor + '">' +
            '<i class="bi bi-arrow-right-circle-fill me-1"></i>' + solutionName +
          '</a>'
        : '';
      var iconHtml = isMulti
        ? '<div class="role-wizard-scenario__checkbox"><i class="bi bi-check-lg"></i></div>'
        : '<div class="role-wizard-scenario__radio"><span></span></div>';
      return '<div class="role-wizard-scenario" data-has-link="' + (s.link ? '1' : '0') + '">' +
        iconHtml +
        '<div class="role-wizard-scenario__body">' +
          '<div class="role-wizard-scenario__label">' + s.label + '</div>' +
          '<div class="role-wizard-scenario__desc">' + s.desc + '</div>' +
        '</div>' +
        '<div class="role-wizard-scenario__link-wrap">' + linkHtml + '</div>' +
      '</div>';
    }).join('');

    var ctaHtml = '';
    if (isIT) {
      ctaHtml = '<div class="role-wizard-panel__cta d-flex gap-3 flex-wrap justify-content-center mt-4">';
      role.ctaButtons.forEach(function(btn) {
        var matchedSolution = getSolutionForScenario(btn);
        var btnText = matchedSolution ? matchedSolution.name : btn.text;
        var btnColor = matchedSolution ? (matchedSolution.colorRgb ? 'rgb(' + matchedSolution.colorRgb + ')' : matchedSolution.color) : btn.color;

        if (matchedSolution || btn.color) {
          ctaHtml += '<a href="' + btn.link + '" class="btn btn-solution rounded-pill px-4"' +
                     ' style="--_solution-color:' + btnColor + '">' + btnText + '</a>';
        } else {
          ctaHtml += '<a href="' + btn.link + '" class="btn btn-' + btn.style + ' rounded-pill px-4">' + btn.text + '</a>';
        }
      });
      ctaHtml += '</div>';
    }

    var $panel = $(
      '<div class="role-wizard-panel" data-role-id="' + role.id + '" style="display:none;--_wiz-color:' + role.color + '">' +
        '<div class="role-wizard-panel__inner">' +
          '<div class="role-wizard-panel__sidelabel" style="background:' + role.color + '">' +
            '<span>' + role.label + '&nbsp;|&nbsp;' + role.title + '</span>' +
          '</div>' +
          '<div class="role-wizard-panel__content">' +
            '<button class="role-wizard-close" aria-label="關閉"><i class="bi bi-x-lg"></i></button>' +
            '<h3 class="role-wizard-panel__title">' + role.panelTitle + '</h3>' +
            '<div class="role-wizard-scenario-list' + (isIT ? ' is-it' : '') + (isMulti ? ' is-multi' : '') + '">' +
              scenariosHtml +
            '</div>' +
            ctaHtml +
          '</div>' +
        '</div>' +
      '</div>'
    );
    $panels.append($panel);
  });

  $el.append($panels);

  $el.on('click', '.btn-role-outline', function(e) {
    e.preventDefault();
    var id = $(this).closest('[data-role-id]').data('role-id');
    $row.hide();
    $panels.show();
    $panels.find('.role-wizard-panel').hide();
    $panels.find('.role-wizard-panel[data-role-id="' + id + '"]').show();
  });

  $el.on('click', '.role-wizard-close', function() {
    $panels.hide();
    $panels.find('.role-wizard-panel').hide();
    $panels.find('.role-wizard-scenario').removeClass('active');
    $row.show();
  });

  $el.on('click', '.role-wizard-scenario', function() {
    var $list = $(this).closest('.role-wizard-scenario-list');
    if ($list.hasClass('is-multi')) {
      $(this).toggleClass('active');
    } else {
      $list.find('.role-wizard-scenario').removeClass('active');
      $(this).addClass('active');
    }
  });
}

/* ============================================================
   Navbar 初始化
   在使用 $('#included_navbar').load(...) 插入 navbar 之後呼叫
   主要負責：渲染 solutionData 的選單項目、啟用 bootstrap tooltip、綁定簡單按鈕事件
   ============================================================ */
function initNavbar() {
  try {
    if (typeof solutionData !== 'undefined') {
      var solHtml = '';
      solutionData.forEach(function(s) {
        if (s.active === false) return;
        var isPlaceholder = !!s.isPlaceholder;
        var href = isPlaceholder ? '#' : ('/' + s.link);
        if (isPlaceholder) {
          solHtml += '<li><span data-bs-toggle="tooltip" data-bs-placement="right" title="' + (s.tag||'') + '"><a class="dropdown-item disabled" href="' + href + '">' + s.name + '</a></span></li>';
        } else {
          solHtml += '<li><a class="dropdown-item" href="' + href + '" data-bs-toggle="tooltip" data-bs-placement="right" title="' + (s.tag||'') + '">' + s.name + '</a></li>';
        }
      });
      $('#navbar-solution-items').html(solHtml);
    }

    // 啟用 tooltip（如果有）
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function(el) {
      try { new bootstrap.Tooltip(el); } catch(e) { /* ignore */ }
    });

    // 綁定聯絡表單的清空按鈕（若存在）
    var clearBtn = document.getElementById('btnClear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        var ids = ['InputCompanyName','InputContactName','InputEmail','InputCompanyPhone','InputMobilePhone','InputIndustry','InputArea','InputStoreType','InputStoreNum','InputRemark'];
        ids.forEach(function(id){ var el = document.getElementById(id); if (el) el.value = ''; });
        var checks = document.getElementsByName('InputItems');
        if (checks && checks.length) for (var i=0;i<checks.length;i++) checks[i].checked = false;
      });
    }

    // 綁定送出按鈕（如果原始 template 沒執行 script，則呼叫 submitForm 時有定義問題；這邊確保點擊不會拋錯）
    if (window.jQuery) {
      try {
        $('#btnOK').off('click');
        $('#btnOK').on('click', function(e){ if (typeof submitForm === 'function') { submitForm(); } else { /* no-op */ } return false; });
      } catch(e) {}
    }
  } catch (e) {
    console.error('initNavbar error', e);
  }
}

/* ============================================================
   Footer 初始化
   被載入的 footer 片段可能不會執行內嵌 script，故在此提供防護式初始化
   包含：渲染聯絡資訊與綁定回到頂端按鈕
   ============================================================ */
function initFooter() {
  try {
    var fd = window.footerData || {
      companyName: "群豐資訊科技股份有限公司",
      copyrightSuffix: "All rights reserved.",
      contacts: [
        { id: "tp", label: "台北總公司", tel: "+886-2-2783-9488" },
        { id: "tc", label: "台中事業部", tel: "+886-4-2233-6916" },
        { id: "ks", label: "高雄分公司", tel: "+886-7-556-2998" }
      ]
    };

    var deskContactArea = document.getElementById('footer-contact-info');
    if (deskContactArea) {
      deskContactArea.innerHTML = fd.contacts.map(function(item){
        return '<div class="small" id="footer-contact-info-' + item.id + '">' + item.label + ' ' + item.tel + '</div>';
      }).join('');
    }
    var fc = document.getElementById('footer-copyright');
    if (fc) fc.innerHTML = 'Copyright &copy; ' + fd.companyName + ' ' + fd.copyrightSuffix;

    var mobContactArea = document.getElementById('footer-contact-info-sm-container');
    if (mobContactArea) {
      mobContactArea.innerHTML = fd.contacts.map(function(item){
        return '<div class="small text-muted" id="footer-contact-info-' + item.id + '-sm">' + item.label + ' ' + item.tel + '</div>';
      }).join('');
    }
    var fcsm = document.getElementById('footer-copyright-sm');
    if (fcsm) fcsm.innerHTML = 'Copyright &copy; ' + fd.companyName + '<br class="d-block d-sm-none"> ' + fd.copyrightSuffix;

    // 綁定 footer 與全域的回到頂端按鈕
    function bindScrollTop(selector) {
      var el = document.querySelector(selector);
      if (!el) return;
      el.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    bindScrollTop('.footer-scroll-top');
    bindScrollTop('.scroll-top-btn');
  } catch (e) {
    console.error('initFooter error', e);
  }
}

/* ============================================================
   痛點卡片
   elId : 掛載容器的 id
   data : [{ icon?, image?, title, text }]
         icon  → Bootstrap Icons class（優先）
         image → 圖片路徑
         兩者皆無 → 顯示佔位圖示
   ============================================================ */
function renderProblemCards(elId, data) {
  var el = document.getElementById(elId);
  if (!el) return;
  el.className = 'problem-cards-row';

  el.innerHTML = data.map(function(item) {
    var iconContent;
    if (item.icon && item.icon.indexOf('material:') === 0) {
      iconContent = '<span class="material-symbols-outlined">' + item.icon.slice(9) + '</span>';
    } else if (item.icon) {
      iconContent = '<i class="' + item.icon + '"></i>';
    } else if (item.image) {
      iconContent = '<img src="' + item.image + '" alt="' + item.title + '">';
    } else {
      iconContent = '<i class="bi bi-image"></i>';
    }
    return (
      '<div class="problem-card-col">' +
        '<div class="problem-card">' +
          '<div class="problem-card__image-wrap">' +
            '<div class="problem-card__image">' + iconContent + '</div>' +
          '</div>' +
          '<div class="problem-card__body">' +
            '<h5>' + item.title + '</h5>' +
            '<p>' + item.text + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

/* ============================================================
   方案卡片（自動 Grid / Carousel）
   elId : 掛載容器的 id
   data : [{ tag, tagStyle?, icon?, title, text, link, active? }]
          tagStyle: 'premium' → 金色豪華包車樣式
          active: false → 隱藏該卡（不顯示）
   邏輯 : 啟用筆數 ≤ 3 → Bootstrap Grid；> 3 → Slick Carousel
   ============================================================ */
function renderSolutionCards(elId, data) {
  var el = document.getElementById(elId);
  if (!el) return;

  var active = data.filter(function(d) { return d.active !== false; });
  var useCarousel = active.length > 3;

  function buildCardHTML(item) {
    var isPlaceholder = !!item.isPlaceholder;

    var cardClass  = isPlaceholder ? ' solution-card--placeholder' : '';
    var colorAttr  = (!isPlaceholder && item.color)
      ? ' style="--_solution-color:' + item.color + (item.colorRgb ? ';--_solution-color-rgb:' + item.colorRgb : '') + '"'
      : '';

    var iconHTML = item.image
      ? '<div class="solution-card__icon mb-3">' +
          '<img src="' + item.image + '" alt="" class="solution-card__img">' +
        '</div>'
      : item.icon
        ? '<div class="solution-card__icon mb-3">' +
            '<i class="bi ' + item.icon + ' fs-2"></i>' +
          '</div>'
        : '';

    var btnHTML = isPlaceholder
      ? '<a href="#" class="btn btn-outline-secondary rounded-pill mt-auto px-4 disabled" tabindex="-1" aria-disabled="true">敬請期待</a>'
      : '<a href="' + (item.link || '#') + '" class="btn btn-solution rounded-pill mt-auto px-4">了解更多</a>';

    return (
      '<div class="solution-card h-100' + cardClass + '"' + colorAttr + '>' +
        '<span class="solution-card__tag">' + (item.tag || '') + '</span>' +
        iconHTML +
        '<h3 class="solution-card__title">' + (item.name || '') + '</h3>' +
        '<p class="solution-card__text">' + (item.cardText || '') + '</p>' +
        btnHTML +
      '</div>'
    );
  }

  if (useCarousel) {
    /* > 3 筆：Slick Carousel 模式 */
    var $el = $(el);
    $el.addClass('slick-carousel').empty();
    active.forEach(function(item) {
      $el.append('<div>' + buildCardHTML(item) + '</div>');
    });
    $el.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      dots: true,
      arrows: true,
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1, centerMode: true, centerPadding: '60px' } },
        { breakpoint: 640, settings: { slidesToShow: 1, centerMode: true, centerPadding: '36px', arrows: false } }
      ]
    });
  } else {
    /* ≤ 3 筆：Bootstrap Grid 模式（靜態，不需 Slick） */
    el.innerHTML =
      '<div class="row g-4 justify-content-center">' +
        active.map(function(item) {
          return '<div class="col-12 col-md-4">' + buildCardHTML(item) + '</div>';
        }).join('') +
      '</div>';
  }
}

/* ============================================================
   優勢卡片
   elId : 掛載容器的 id
   data : [{ number, title, text }]
   ============================================================ */
function renderFeatureSteps(elId, data) {
  var el = document.getElementById(elId);
  if (!el) return;

  el.innerHTML =
    '<div class="row g-0">' +
      data.map(function(item) {
        return (
          '<div class="col-12 col-sm-6 col-lg-3">' +
            '<div class="feature-step h-100">' +
              '<div class="feature-step__number">' + item.number + '</div>' +
              '<h5 class="feature-step__title">' + item.title + '</h5>' +
              '<p class="feature-step__text">' + item.text + '</p>' +
            '</div>' +
          '</div>'
        );
      }).join('') +
    '</div>';
}

/* ============================================================
   Accordion 響應式同步
   桌機 / 平板（≥768px）：移除 data-bs-parent → 多個項目可同時展開
   手機（<768px）：還原 data-bs-parent → 展開一個時自動收合其他
   在 renderPageAccordion / renderFaqSections 結尾自動呼叫，
   並在視窗 resize 時重新套用。
   ============================================================ */
function syncAccordionParent() {
  var isMobile = window.innerWidth < 768;
  $('.accordion .accordion-collapse').each(function() {
    if (isMobile) {
      var parentId = $(this).closest('.accordion').attr('id');
      if (parentId) $(this).attr('data-bs-parent', '#' + parentId);
    } else {
      $(this).removeAttr('data-bs-parent');
    }
  });
}

/* ============================================================
   頁面 Accordion（技術支援 / 常見問題等頁使用）
   elId       : 掛載容器的 id
   data       : [{
                  title     : 'API串接',
                  body      : '說明文字',
                  image?    : 'img/...' ,   // 省略 → 純文字，無圖欄
                  ctaModal? : true,          // true → 觸發 #contactform
                  ctaLink?  : 'pages/...'   // 否則連結至此 URL
                }]
   accordionId: 產生的 accordion 元素 id（供 data-bs-parent 使用）
   ============================================================ */
function renderPageAccordion(elId, data, accordionId) {
  var el = document.getElementById(elId);
  if (!el) return;
  accordionId = accordionId || (elId + '-accordion');

  var items = data.map(function(item, i) {
    var collapseId = accordionId + '-item-' + i;

    var ctaHTML = item.ctaModal
      ? '<a href="#" class="btn btn-outline-dark rounded-pill px-4 mt-2"' +
          ' data-bs-toggle="modal" data-bs-target="#contactform">立即諮詢</a>'
      : '<a href="' + (item.ctaLink || '#') + '"' +
          ' class="btn btn-outline-dark rounded-pill px-4 mt-2">了解更多</a>';

    var bodyHTML = item.image
      ? '<div class="row align-items-center g-4">' +
          '<div class="col-12 col-md-7"><p>' + item.body + '</p>' + ctaHTML + '</div>' +
          '<div class="col-12 col-md-5">' +
            '<img src="' + item.image + '" class="img-fluid rounded" alt="">' +
          '</div>' +
        '</div>'
      : '<p>' + item.body + '</p>' + ctaHTML;

    return (
      '<div class="accordion-item">' +
        '<h2 class="accordion-header" id="' + collapseId + '-heading">' +
          '<button class="accordion-button collapsed d-flex align-items-center" type="button"' +
            ' data-bs-toggle="collapse" data-bs-target="#' + collapseId + '"' +
            ' aria-expanded="false" aria-controls="' + collapseId + '">' +
            '<span class="service-num"></span>' +
            item.title +
          '</button>' +
        '</h2>' +
        '<div id="' + collapseId + '"' +
          ' class="accordion-collapse collapse"' +
          ' aria-labelledby="' + collapseId + '-heading"' +
          ' data-bs-parent="#' + accordionId + '">' +
          '<div class="accordion-body">' + bodyHTML + '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  el.innerHTML =
    '<div class="accordion page-accordion" id="' + accordionId + '">' +
      items +
    '</div>';
  syncAccordionParent();
}

/* ============================================================
   成功案例圓圈卡
   elId : 掛載容器的 id（應為 div.d-flex.flex-wrap.case-row）
   data : [{ logo?, icon?, brand, link? }]
          logo 優先；無 logo 則顯示 Bootstrap icon
          link 有值時項目為 <a> 可點擊；否則為 <div>
   ≥ 5 筆時自動啟用跑馬燈；hover 暫停。
   跑馬燈偏移量由 JS 量測實際 scrollWidth，避免百分比誤差。
   ============================================================ */
function renderCaseCircles(elId, data) {
  var el = document.getElementById(elId);
  if (!el) return;

  var itemsHtml = data.map(function(item) {
    var inner = item.logo
      ? '<img src="' + item.logo + '" alt="' + item.brand + '" class="case-circle__logo">'
      : '<i class="bi ' + (item.icon || 'bi-building') + ' fs-2"></i>';
    var nameHtml = '<div class="case-name">' + item.brand + '</div>';
    if (item.link) {
      return '<a href="' + item.link + '" class="case-item"><div class="case-circle">' + inner + '</div>' + nameHtml + '</a>';
    }
    return '<div class="case-item"><div class="case-circle">' + inner + '</div>' + nameHtml + '</div>';
  }).join('');

  if (data.length >= 5) {
    el.classList.add('case-row--marquee');
    el.innerHTML = '';
    var track = document.createElement('div');
    track.className = 'marquee-track';
    track.innerHTML = itemsHtml;
    el.appendChild(track);

    var singleWidth = track.scrollWidth;
    var copies = Math.ceil(el.offsetWidth / singleWidth) + 2;
    track.innerHTML = Array(copies).fill(itemsHtml).join('');
    track.style.setProperty('--marquee-offset', '-' + singleWidth + 'px');
    track.style.setProperty('--marquee-duration', (data.length * 4) + 's');
  } else {
    el.innerHTML = itemsHtml;
  }
}

/* ============================================================
   FAQ 輔助：擷取 YouTube 影片 ID
   支援格式：
     https://www.youtube.com/watch?v=XXXX
     https://youtu.be/XXXX
     https://www.youtube.com/embed/XXXX
   ============================================================ */
function extractYouTubeId(url) {
  if (!url) return '';
  var match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : '';
}

/* ============================================================
   FAQ 類別 Pill 按鈕列
   elId       : 掛載容器的 id（不含 #）
   categories : faqCategories 陣列
   直接輸出 pill 按鈕，由外層 HTML 的 flex 容器排列並搭配搜尋列
   ============================================================ */
function renderFaqCategories(elId, categories) {
  var el = document.getElementById(elId);
  if (!el) return;

  el.innerHTML = categories.map(function(cat) {
    return (
      '<a href="javascript:void(0)"' +
         ' data-faq-target="#faq-section-' + cat.id + '"' +
         ' class="btn btn-outline-dark btn-sm rounded-pill faq-category-btn">' +
        cat.label +
      '</a>'
    );
  }).join('');
}

/* ============================================================
   FAQ 各類別手風琴 Sections
   elId       : 掛載容器的 id
   categories : faqCategories 陣列（決定 section 順序）
   faqData    : faqData 陣列（每筆含 category 欄位）

   每個 accordion-item 帶 data-faq-title / data-faq-body
   (純文字，已 strip HTML tags)，供頁面搜尋功能使用。

   body 結構：{ brief, content }
     brief   → Accordion 內以 Callout 樣式呈現；空值 → 不顯示 Callout
     content → 有值才顯示「了解更多」按鈕（ctaModal / slug 的觸發前提）

   category fallback：空值或不存在的 id → 歸入「其他」(id: 'other')
   title    fallback：空值 → 略過不渲染
   media 優先權：video > image（兩者同時存在時 video 優先）
   ============================================================ */
function renderFaqSections(elId, categories, faqData) {
  var el = document.getElementById(elId);
  if (!el) return;

  var catIds = categories.map(function(c) { return c.id; });
  function normalizeCategory(cat) {
    return (cat && catIds.indexOf(cat) !== -1) ? cat : 'other';
  }

  var sectionsHTML = categories.map(function(cat) {
    var items = faqData.filter(function(item) {
      return !!item.title && normalizeCategory(item.category) === cat.id;
    });
    if (!items.length) return '';

    var accordionId = 'faqAccordion-' + cat.id;

    var itemsHTML = items.map(function(item, i) {
      var collapseId = accordionId + '-item-' + i;
      var body       = item.body || {};
      var brief      = body.brief   || '';
      var content    = body.content || '';

      /* ── Media block (右欄) ───────────────────────── */
      var mediaHTML = '';
      if (item.video) {
        var vid = extractYouTubeId(item.video);
        if (vid) {
          mediaHTML =
            '<div class="faq-video-wrap ratio ratio-16x9">' +
              '<iframe src="https://www.youtube-nocookie.com/embed/' + vid + '"' +
                      ' title="' + (item.title || '').replace(/"/g, '&quot;') + '"' +
                      ' allow="accelerometer; autoplay; clipboard-write;' +
                              ' encrypted-media; gyroscope; picture-in-picture"' +
                      ' allowfullscreen></iframe>' +
            '</div>';
        }
      } else if (item.image) {
        mediaHTML =
          '<img src="' + item.image + '" class="img-fluid rounded" alt="">';
      }

      /* ── Brief（Accordion 內以一般段落呈現） ──────── */
      var briefHTML = brief ? '<p>' + brief + '</p>' : '';

      /* ── CTA 按鈕（須 body.content 有值才顯示） ──── */
      var ctaHTML = '';
      if (content) {
        if (item.ctaModal) {
          ctaHTML =
            '<a href="#" class="btn btn-outline-dark rounded-pill px-4 mt-2"' +
               ' data-bs-toggle="modal" data-bs-target="#contactform">了解更多</a>';
        } else if (item.slug) {
          ctaHTML =
            '<a href="pages/EINV_faq-' + item.slug + '.html"' +
               ' class="btn btn-outline-dark rounded-pill px-4 mt-2">了解更多</a>';
        }
      }

      /* ── Body layout ──────────────────────────────── */
      var bodyInner = briefHTML + ctaHTML;
      var bodyHTML = mediaHTML
        ? '<div class="row align-items-center g-4">' +
            '<div class="col-12 col-md-7">' + bodyInner + '</div>' +
            '<div class="col-12 col-md-5">'  + mediaHTML + '</div>' +
          '</div>'
        : bodyInner;

      /* ── data-* 屬性（strip HTML，供搜尋用） ────────── */
      var plainBody = (brief + ' ' + content).replace(/<[^>]+>/g, ' ').trim();

      return (
        '<div class="accordion-item"' +
             ' data-faq-title="' + (item.title || '').replace(/"/g, '&quot;') + '"' +
             ' data-faq-body="'  + plainBody.replace(/"/g, '&quot;') + '">' +
          '<h2 class="accordion-header" id="' + collapseId + '-heading">' +
            '<button class="accordion-button collapsed d-flex align-items-center" type="button"' +
                    ' data-bs-toggle="collapse" data-bs-target="#' + collapseId + '"' +
                    ' aria-expanded="false" aria-controls="' + collapseId + '">' +
              '<span class="service-num"></span>' +
              (item.title || '') +
            '</button>' +
          '</h2>' +
          '<div id="' + collapseId + '"' +
               ' class="accordion-collapse collapse"' +
               ' aria-labelledby="' + collapseId + '-heading"' +
               ' data-bs-parent="#' + accordionId + '">' +
            '<div class="accordion-body">' + bodyHTML + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="py-5 faq-section" id="faq-section-' + cat.id + '">' +
        '<div class="container">' +
          '<h3 class="section-heading">' + cat.label + '</h3>' +
          '<div class="accordion page-accordion mt-4" id="' + accordionId + '">' +
            itemsHTML +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }).join('');

  el.innerHTML = sectionsHTML;
  syncAccordionParent();
}

/* ============================================================
   方案頁 FAQ accordion（無分類、無搜尋）
   elId       : 掛載容器的 id
   data       : faqData 陣列
   solutionIdx: 1-based (1=POS直達車, 2=共享小平台, 3=豪華包車)
   ============================================================ */
function renderSolutionFaq(elId, data, solutionIdx) {
  var el = document.getElementById(elId);
  if (!el) return;

  var accordionId = 'solutionFaqAccordion-' + elId;
  var filtered = (data || []).filter(function(item) {
    return item.title &&
           Array.isArray(item.solutionRelated) &&
           item.solutionRelated[solutionIdx - 1] === 1;
  });

  if (!filtered.length) { el.innerHTML = ''; return; }

  var itemsHTML = filtered.map(function(item, i) {
    var collapseId = accordionId + '-item-' + i;
    var body    = item.body || {};
    var brief   = body.brief   || '';
    var content = body.content || '';

    var mediaHTML = '';
    if (item.video) {
      var vid = extractYouTubeId(item.video);
      if (vid) {
        mediaHTML =
          '<div class="faq-video-wrap ratio ratio-16x9">' +
            '<iframe src="https://www.youtube-nocookie.com/embed/' + vid + '"' +
                    ' title="' + (item.title || '').replace(/"/g, '&quot;') + '"' +
                    ' allow="accelerometer; autoplay; clipboard-write;' +
                            ' encrypted-media; gyroscope; picture-in-picture"' +
                    ' allowfullscreen></iframe>' +
          '</div>';
      }
    } else if (item.image) {
      mediaHTML = '<img src="' + item.image + '" class="img-fluid rounded" alt="">';
    }

    var briefHTML = brief ? '<p>' + brief + '</p>' : '';
    var ctaHTML = '';
    if (content) {
      if (item.ctaModal) {
        ctaHTML =
          '<a href="#" class="btn btn-outline-dark rounded-pill px-4 mt-2"' +
             ' data-bs-toggle="modal" data-bs-target="#contactform">了解更多</a>';
      } else if (item.slug) {
        ctaHTML =
          '<a href="pages/EINV_faq-' + item.slug + '.html"' +
             ' class="btn btn-outline-dark rounded-pill px-4 mt-2">了解更多</a>';
      }
    }

    var bodyInner = briefHTML + ctaHTML;
    var bodyHTML  = mediaHTML
      ? '<div class="row align-items-center g-4">' +
          '<div class="col-12 col-md-7">' + bodyInner + '</div>' +
          '<div class="col-12 col-md-5">'  + mediaHTML + '</div>' +
        '</div>'
      : bodyInner;

    var plainBody = (brief + ' ' + content).replace(/<[^>]+>/g, ' ').trim();

    return (
      '<div class="accordion-item"' +
           ' data-faq-title="' + (item.title || '').replace(/"/g, '&quot;') + '"' +
           ' data-faq-body="'  + plainBody.replace(/"/g, '&quot;') + '">' +
        '<h2 class="accordion-header" id="' + collapseId + '-heading">' +
          '<button class="accordion-button collapsed d-flex align-items-center" type="button"' +
                  ' data-bs-toggle="collapse" data-bs-target="#' + collapseId + '"' +
                  ' aria-expanded="false" aria-controls="' + collapseId + '">' +
            '<span class="service-num"></span>' +
            (item.title || '') +
          '</button>' +
        '</h2>' +
        '<div id="' + collapseId + '"' +
             ' class="accordion-collapse collapse"' +
             ' aria-labelledby="' + collapseId + '-heading"' +
             ' data-bs-parent="#' + accordionId + '">' +
          '<div class="accordion-body">' + bodyHTML + '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  el.innerHTML =
    '<div class="accordion page-accordion mt-4" id="' + accordionId + '">' +
      itemsHTML +
    '</div>';

  syncAccordionParent();
}

/* ============================================================
   FAQ 獨立頁詳細內容渲染
   elId    : 掛載容器的 id
   item    : faqData 中的單筆物件
   breadcrumbElId : (選填) 麵包屑 active 項目的 id，有值時自動填入 title

   版面邏輯：
     brief   → Callout（左邊框 alert，全寬）
     content → article-detail__body 段落
     media   → 有 image/video 時，content 與 media 並排（各佔一半）；
               無 media 時 content 全寬
   ============================================================ */
function renderFaqDetail(elId, item, breadcrumbElId) {
  var el = document.getElementById(elId);
  if (!el || !item) return;

  var body    = item.body || {};
  var brief   = body.brief   || '';
  var content = body.content || '';

  /* ── 標題 ────────────────────────────────────────── */
  var titleHTML =
    '<h1 class="article-detail__title mb-4">' + (item.title || '') + '</h1>';

  /* ── Brief Callout（全寬，呈現於內容上方） ──────── */
  var briefHTML = brief
    ? '<div class="alert alert-info d-flex align-items-center gap-3 mb-4" role="note">' +
        '<i class="bi bi-info-circle-fill fs-5 flex-shrink-0"></i>' +
        '<div>' + brief + '</div>' +
      '</div>'
    : '';

  /* ── Media block ─────────────────────────────────── */
  var mediaHTML = '';
  if (item.video) {
    var vid = extractYouTubeId(item.video);
    if (vid) {
      mediaHTML =
        '<div class="faq-video-wrap ratio ratio-16x9">' +
          '<iframe src="https://www.youtube-nocookie.com/embed/' + vid + '"' +
                  ' title="' + (item.title || '').replace(/"/g, '&quot;') + '"' +
                  ' allow="accelerometer; autoplay; clipboard-write;' +
                          ' encrypted-media; gyroscope; picture-in-picture"' +
                  ' allowfullscreen></iframe>' +
        '</div>';
    }
  } else if (item.image) {
    mediaHTML =
      '<div class="article-detail__image-placeholder">' +
        '<img src="' + item.image + '" alt="說明圖片">' +
      '</div>';
  }

  /* ── Content body ────────────────────────────────── */
  var contentHTML = content
    ? '<div class="article-detail__body mb-4">' + content + '</div>'
    : '';

  /* ── 版面組合 ─────────────────────────────────────── */
  var bodyLayout = (mediaHTML && content)
    ? '<div class="row g-5 align-items-start">' +
        '<div class="col-md-6">' + mediaHTML   + '</div>' +
        '<div class="col-md-6">' + contentHTML + '</div>' +
      '</div>'
    : contentHTML + mediaHTML;

  el.innerHTML =
    '<div class="container">' +
      titleHTML + briefHTML + bodyLayout +
    '</div>';

  /* ── 麵包屑更新 ──────────────────────────────────── */
  if (breadcrumbElId) {
    var bcEl = document.getElementById(breadcrumbElId);
    if (bcEl) bcEl.textContent = item.title || '';
  }

  /* 同步更新 <title> 標籤 */
  if (item.title) {
    document.title = item.title + ' - 群豐電子發票服務';
  }
}

/* ============================================================
   案例解決方案按鈕
   caseItem : caseData 中的單筆物件（需含 solution / solutionLink）
   回傳 HTML 字串；供案例獨立頁與 overview modal 共用
   ============================================================ */
function renderCaseSolutionBtn(caseItem) {
  var sol = typeof solutionData !== 'undefined'
    ? (solutionData || []).filter(function(s) { return s.link === caseItem.solutionLink; })[0]
    : null;
  var btnClass, styleAttr;
  if (sol && sol.color) {
    btnClass  = 'btn-solution';
    styleAttr = ' style="--_solution-color:' + sol.color + '"';
  } else {
    btnClass  = 'btn-primary';
    styleAttr = '';
  }
  return '<a href="' + caseItem.solutionLink + '"' +
         ' class="btn ' + btnClass + ' rounded-pill px-4"' + styleAttr + '>' +
         '我也想了解 <strong>' + caseItem.solution + '</strong>' +
         '</a>';
}

/* ============================================================
   案例詳細頁完整渲染
   caseItem : caseData 中的單筆物件
   呼叫後填入 #case-detail-body，並更新 <title>、麵包屑、CSS modifier
   ============================================================ */
function renderCaseDetail(caseItem) {
  document.title = caseItem.title + ' - 群豐電子發票服務';
  var $bc = $('.article-breadcrumb .breadcrumb-item.active');
  if ($bc.length) $bc.text(caseItem.title);

  var $sec = $('#case-detail-content');

  if (typeof solutionData !== 'undefined') {
    var _sol = (solutionData || []).filter(function(s){ return s.link === caseItem.solutionLink && s.color; })[0];
    if (_sol) {
      $sec[0].style.setProperty('--_solution-color', _sol.color);
      if (_sol.colorRgb) $sec[0].style.setProperty('--_solution-color-rgb', _sol.colorRgb);
    }
  }

  var tagClass = 'case-card__tag--solution';
  var html =
    '<div class="article-detail__tags mb-3">' +
      '<span class="case-card__tag case-card__tag--industry">' + caseItem.industry + '</span>' +
      '<span class="case-card__tag ' + tagClass + '">' + caseItem.solution + '</span>' +
    '</div>' +
    '<h1 class="article-detail__title mb-4">' + caseItem.title + '</h1>' +
    '<div class="row g-5 align-items-start">' +
      '<div class="col-md-6">' +
        '<div class="article-detail__image-placeholder">' +
          '<img src="' + caseItem.img + '" alt="' + caseItem.title + '">' +
        '</div>' +
      '</div>' +
      '<div class="col-md-6">' +
        '<p class="article-detail__quote">' +
          '<span class="article-detail__quote-mark article-detail__quote-mark--open">&ldquo;</span>' +
          (caseItem.quote || '') +
          '<span class="article-detail__quote-mark article-detail__quote-mark--close">&rdquo;</span>' +
        '</p>' +
        '<p class="article-detail__body">' + (caseItem.body || '') + '</p>' +
        '<div id="case-solution-btn">' + renderCaseSolutionBtn(caseItem) + '</div>' +
      '</div>' +
    '</div>';

  $('#case-detail-body').html(html);
}

/* ============================================================
   方案頁全頁渲染（從 solution-data.js 驅動）
   item : solutionData 陣列中的單一物件
   ============================================================ */
function renderSolutionPage(item) {
  if (!item) return;

  /* Set solution color as inline CSS custom properties on body */
  document.body.style.setProperty('--_solution-color', item.color || '');
  if (item.colorRgb) document.body.style.setProperty('--_solution-color-rgb', item.colorRgb);

  document.title = '解決方案 - ' + item.name + ' - 群豐電子發票服務';

  /* Section 1: Hero */
  var heroHTML =
    '<div class="row align-items-center">' +
      '<div class="col-lg-6 mb-4 mb-lg-0">' +
        '<nav aria-label="breadcrumb" class="solution-breadcrumb mb-3">' +
          '<ol class="breadcrumb mb-0">' +
            '<li class="breadcrumb-item"><a href="pages/EINV_solution_overview.html">解決方案</a></li>' +
            '<li class="breadcrumb-item active" aria-current="page">' + item.name + '</li>' +
          '</ol>' +
        '</nav>' +
        '<span class="solution-hero-badge">' + (item.tag || '方案') + '</span>' +
        '<h1 class="mt-2">' + item.name + '</h1>' +
        '<p class="hero-subtitle">' + item.heroSubtitle + '</p>' +
        '<div class="d-flex gap-3 flex-wrap">' +
          '<a href="#" class="btn btn-solution px-4" data-bs-toggle="modal" data-bs-target="#contactform">我要評估這個方案</a>' +
          '<a href="pages/EINV_solution_overview.html" class="btn btn-outline-secondary px-4">看所有方案</a>' +
        '</div>' +
      '</div>' +
      '<div class="col-lg-6">' +
        (item.heroImage
          ? '<div class="solution-hero-img-wrap"><img src="' + item.heroImage + '" alt="' + item.name + '" class="solution-hero-img"></div>'
          : '<div class="solution-hero-placeholder">[插圖 Placeholder]<br>' + item.name + '</div>') +
      '</div>' +
    '</div>';
  document.getElementById('solution-hero-content').innerHTML = heroHTML;

  /* Section 2: Features */
  var featureItems = item.features.map(function(f) {
    return '<div class="col">' +
      '<div class="feature-icon-wrap"><i class="bi ' + f.icon + '"></i></div>' +
      '<div class="feature-title">' + f.title + '</div>' +
      '<div class="feature-desc">' + f.desc + '</div>' +
    '</div>';
  }).join('');

  document.getElementById('solution-features-content').innerHTML =
    '<h2 class="section-heading">你可以做到...</h2>' +
    '<p class="section-subheading">' + item.featuresSubheading + '</p>' +
    '<div class="row row-cols-2 row-cols-md-4 g-4">' + featureItems + '</div>';

  /* Section 3: Process */
  var processItems = item.process.map(function(step, i) {
    var circleClass = 'process-circle' + (step.accent ? ' accent' : '');
    var html =
      '<div class="process-step">' +
        '<div class="' + circleClass + '">' + step.circle + '</div>' +
        '<div class="process-step-title">' + step.title + '</div>' +
        '<div class="process-step-desc">' + step.desc + '</div>' +
      '</div>';
    if (i < item.process.length - 1) html += '<div class="process-arrow-col">→</div>';
    return html;
  }).join('');

  document.getElementById('solution-process-content').innerHTML =
    '<h2 class="section-heading">服務流程</h2>' +
    '<p class="section-subheading">' + item.processSubheading + '</p>' +
    '<div class="process-wrapper">' + processItems + '</div>';

  /* Section 4: Tech */
  var storeFeatureItems = item.storeFeatures.map(function(f) {
    return '<li>' + f + '</li>';
  }).join('');

  /* IT 架構圖（各頁相同） */
  var itArchHTML =
    '<div class="it-arch-wrapper">' +
      '<div class="it-arch-box">' +
        '<div class="it-arch-box-title">客戶端系統層</div>' +
        '<div class="it-arch-box-desc">支援各類POS、ERP、電商網站</div>' +
      '</div>' +
      '<div class="it-arch-arrow">→</div>' +
      '<div class="it-arch-box highlight">' +
        '<div class="it-arch-box-title">EMIS代理與API層</div>' +
        '<div class="it-arch-box-desc">提供標準API、發票代理程式、測試環境</div>' +
      '</div>' +
      '<div class="it-arch-arrow">→</div>' +
      '<div class="it-arch-box">' +
        '<div class="it-arch-box-title">財政部大平台</div>' +
        '<div class="it-arch-box-desc">自動批次上傳、確保合規不斷線</div>' +
      '</div>' +
    '</div>' +
    '<p class="it-arch-caption">備有完整API功能列表與串接文件，專為開發者打造</p>';

  /* Store tab 右側 flow 圖：資料驅動，fallback 為群豐POS預設值 */
  var flowNodes = item.techFlowNodes || [
    { icon: 'bi-display', label: '群豐POS' },
    { icon: 'bi-cloud',   label: '電子發票平台' },
    { icon: 'bi-bank',    label: '財政部國稅局' }
  ];
  var flowHTML = flowNodes.map(function(n, i) {
    var arrow = (i < flowNodes.length - 1) ? '<div class="tech-flow-arrow">→</div>' : '';
    return '<div class="tech-flow-node">' +
      '<div class="tech-flow-icon-wrap"><i class="bi ' + n.icon + '"></i></div>' +
      '<div class="tech-flow-label">' + n.label + '</div>' +
    '</div>' + arrow;
  }).join('');

  /* IT tab：若有 itFeatures 則左 bullet + 右架構圖；否則僅顯示架構圖 */
  var itTabContent;
  if (item.itFeatures && item.itFeatures.length) {
    var itFeatureItems = item.itFeatures.map(function(f) { return '<li>' + f + '</li>'; }).join('');
    itTabContent =
      '<div class="row align-items-center">' +
        '<div class="col-md-6 mb-4 mb-md-0">' +
          '<ul class="tech-feature-list">' + itFeatureItems + '</ul>' +
        '</div>' +
        '<div class="col-md-6">' + itArchHTML + '</div>' +
      '</div>';
  } else {
    itTabContent = itArchHTML;
  }

  document.getElementById('solution-tech-content').innerHTML =
    '<h2 class="section-heading">功能重點、技術說明</h2>' +
    '<ul class="nav nav-tabs mt-4" id="techTab" role="tablist">' +
      '<li class="nav-item" role="presentation">' +
        '<button class="nav-link active" id="store-tab" data-bs-toggle="tab" data-bs-target="#store"' +
                ' type="button" role="tab" aria-controls="store" aria-selected="true">對店家</button>' +
      '</li>' +
      '<li class="nav-item" role="presentation">' +
        '<button class="nav-link" id="it-tab" data-bs-toggle="tab" data-bs-target="#it"' +
                ' type="button" role="tab" aria-controls="it" aria-selected="false">對IT人員</button>' +
      '</li>' +
    '</ul>' +
    '<div class="tab-content tech-content-area">' +
      '<div class="tab-pane fade show active" id="store" role="tabpanel" aria-labelledby="store-tab">' +
        '<div class="row align-items-center">' +
          '<div class="col-md-6 mb-4 mb-md-0">' +
            '<ul class="tech-feature-list">' + storeFeatureItems + '</ul>' +
          '</div>' +
          '<div class="col-md-6">' +
            '<div class="tech-flow-diagram">' + flowHTML + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="tab-pane fade" id="it" role="tabpanel" aria-labelledby="it-tab">' +
        itTabContent +
      '</div>' +
    '</div>';

  /* Section 6: CTA */
  var ctaButtonStyle = '';
  if (item.color) {
    var color = item.colorRgb ? 'rgb(' + item.colorRgb + ')' : item.color;
    ctaButtonStyle = ' style="--_solution-color:' + color + '"';
  }

  document.getElementById('solution-cta-content').innerHTML =
    '<div class="row align-items-center">' +
      '<div class="col-lg-6 mb-4 mb-lg-0">' +
        '<h2>準備好讓發票開立更簡單了嗎？</h2>' +
        '<p class="cta-subtitle">專人協助評估，找到最適合您的方案</p>' +
      '</div>' +
      '<div class="col-lg-6 d-flex gap-3 flex-wrap justify-content-lg-end">' +
        '<a href="#" class="btn btn-solution px-4" data-bs-toggle="modal" data-bs-target="#contactform"' + ctaButtonStyle + '>我要評估 <strong>' + item.name + '</strong></a>' +
        '<a href="pages/EINV_solution_overview.html" class="btn btn-outline-secondary px-4">看其他方案</a>' +
      '</div>' +
    '</div>';

  /* Section 5: FAQ */
  renderSolutionFaq('solution-faq-container', faqData, item.faqIndex);
}

/* ============================================================
   角色分流 Wizard
   renderRoleWizard(containerId, wizardData)
   ============================================================ */
function getSolutionForScenario(scenario) {
  if (typeof solutionData === 'undefined' || !Array.isArray(solutionData)) return null;
  if (scenario.link) {
    var matchByLink = solutionData.find(function(sol) { return sol.link === scenario.link; });
    if (matchByLink) return matchByLink;
  }
  if (scenario.solutionName) {
    var matchByName = solutionData.find(function(sol) { return sol.name === scenario.solutionName; });
    if (matchByName) return matchByName;
  }
  return null;
}

function renderRoleWizard(containerId, wizardData) {
  var $root = $('#' + containerId);
  if (!$root.length) return;

  /* ── 角色選擇卡（初始畫面）──────────────────────────── */
  var $cards = $('<div class="role-wizard-cards row g-3 justify-content-center"></div>');
  wizardData.forEach(function(role) {
    var $card = $(
      '<div class="col-12 col-md-5">' +
        '<button class="role-wizard-card w-100" data-role-id="' + role.id + '"' +
                ' style="--_wiz-color:' + role.color + '">' +
          '<span class="role-wizard-card__label">' + role.label + '</span>' +
          '<span class="role-wizard-card__title">' + role.title + '</span>' +
          '<span class="role-wizard-card__arrow"><i class="bi bi-chevron-right"></i></span>' +
        '</button>' +
      '</div>'
    );
    $cards.append($card);
  });

  /* ── Panel 容器（全部先隱藏）──────────────────────────── */
  var $panels = $('<div class="role-wizard-panels" style="display:none"></div>');
  wizardData.forEach(function(role) {
    var isIT = role.ctaButtons && role.ctaButtons.length > 0;

    /* scenario 清單 */
    var isMulti = !!role.multiSelect;
    var scenariosHtml = role.scenarios.map(function(s) {
      var matchedSolution = getSolutionForScenario(s);
      var solutionName = matchedSolution ? matchedSolution.name : (s.solutionName || '');
      var solutionColor = matchedSolution ? (matchedSolution.colorRgb ? 'rgb(' + matchedSolution.colorRgb + ')' : matchedSolution.color) : (s.color || '');
      var linkHtml = s.link
        ? '<a href="' + s.link + '" class="role-wizard-scenario__link" style="color:' + solutionColor + '">' +
            '<i class="bi bi-arrow-right-circle-fill me-1"></i>' + solutionName +
          '</a>'
        : '';
      var iconHtml = isMulti
        ? '<div class="role-wizard-scenario__checkbox"><i class="bi bi-check-lg"></i></div>'
        : '<div class="role-wizard-scenario__radio"><span></span></div>';
      return '<div class="role-wizard-scenario" data-has-link="' + (s.link ? '1' : '0') + '">' +
        iconHtml +
        '<div class="role-wizard-scenario__body">' +
          '<div class="role-wizard-scenario__label">' + s.label + '</div>' +
          '<div class="role-wizard-scenario__desc">' + s.desc + '</div>' +
        '</div>' +
        '<div class="role-wizard-scenario__link-wrap">' + linkHtml + '</div>' +
      '</div>';
    }).join('');

    /* CTA 按鈕（IT路徑） */
    var ctaHtml = '';
    if (isIT) {
      ctaHtml = '<div class="role-wizard-panel__cta d-flex gap-3 flex-wrap justify-content-center mt-4">';
      role.ctaButtons.forEach(function(btn) {
        var matchedSolution = getSolutionForScenario(btn);
        var btnText = matchedSolution ? matchedSolution.name : btn.text;
        var btnColor = matchedSolution ? (matchedSolution.colorRgb ? 'rgb(' + matchedSolution.colorRgb + ')' : matchedSolution.color) : btn.color;

        if (matchedSolution || btn.color) {
          ctaHtml += '<a href="' + btn.link + '" class="btn btn-solution rounded-pill px-4"' +
                     ' style="--_solution-color:' + btnColor + '">' + btnText + ' 方案一覽' +'</a>';
        } else {
          ctaHtml += '<a href="' + btn.link + '" class="btn btn-' + btn.style + ' rounded-pill px-4">' + btn.text + '</a>';
        }
      });
      ctaHtml += '</div>';
    }

    var $panel = $(
      '<div class="role-wizard-panel" data-role-id="' + role.id + '" style="display:none;--_wiz-color:' + role.color + '">' +
        '<div class="role-wizard-panel__inner">' +
          '<div class="role-wizard-panel__sidelabel" style="background:' + role.color + '">' +
            '<span>' + role.label + '&nbsp;|&nbsp;' + role.title + '</span>' +
          '</div>' +
          '<div class="role-wizard-panel__content">' +
            '<button class="role-wizard-close" aria-label="關閉"><i class="bi bi-x-lg"></i></button>' +
            '<h3 class="role-wizard-panel__title">' + role.panelTitle + '</h3>' +
            '<div class="role-wizard-scenario-list' + (isIT ? ' is-it' : '') + (isMulti ? ' is-multi' : '') + '">' +
              scenariosHtml +
            '</div>' +
            ctaHtml +
          '</div>' +
        '</div>' +
      '</div>'
    );
    $panels.append($panel);
  });

  $root.append($cards).append($panels);

  /* ── 事件綁定 ──────────────────────────────────────── */
  $root.on('click', '.role-wizard-card', function() {
    var id = $(this).data('role-id');
    $cards.hide();
    $panels.show();
    $panels.find('.role-wizard-panel').hide();
    $panels.find('.role-wizard-panel[data-role-id="' + id + '"]').show();
  });

  $root.on('click', '.role-wizard-close', function() {
    $panels.hide();
    $panels.find('.role-wizard-panel').hide();
    $panels.find('.role-wizard-scenario').removeClass('active');
    $cards.show();
  });

  $root.on('click', '.role-wizard-scenario', function() {
    var $list = $(this).closest('.role-wizard-scenario-list');
    if ($list.hasClass('is-multi')) {
      $(this).toggleClass('active');
    } else {
      $list.find('.role-wizard-scenario').removeClass('active');
      $(this).addClass('active');
    }
  });
}

/* ============================================================
   方案比較卡片
   renderSolutionCompareCards(containerId, solutionData, rowLabels)
   rowLabels: { infra, itLevel, target, pricing, lottery }
   ============================================================ */
function renderSolutionCompareCards(containerId, solutionData, rowLabels) {
  var $root = $('#' + containerId);
  if (!$root.length) return;

  var activeSolutions = solutionData.filter(function(s) {
    return s.active && s.compareRows;
  });

  var useCarousel = activeSolutions.length > 3;

  function buildCompareCardHTML(sol) {
    var isPlaceholder = !!sol.isPlaceholder;
    var cardClass = isPlaceholder ? ' compare-card--placeholder' : '';
    
    var rowsHtml = sol.compareRows.map(function(r) {
      var labelText = rowLabels[r.key] || r.key;
      var hlClass   = r.highlight ? ' compare-card__row--highlight' : '';
      var hlStyle   = r.highlight && !isPlaceholder ? ' style="background:' + sol.color + '"' : '';
      return '<div class="compare-card__row' + hlClass + '"' + hlStyle + '>' +
        '<div class="compare-card__row-label">' + labelText + '</div>' +
        '<div class="compare-card__row-value">' + r.value + '</div>' +
      '</div>';
    }).join('');

    var colorVars = '--_solution-color:' + (sol.color || '') +
                    (sol.colorRgb ? ';--_solution-color-rgb:' + sol.colorRgb : '');
    return (
      '<div class="compare-card' + cardClass + '" style="' + colorVars + '">' +
        '<div class="compare-card__header">' +
          '<span class="solution-card__tag">' + (sol.tag || '') + '</span>' +
          '<div class="compare-card__name">' + sol.name + '</div>' +
        '</div>' +
        '<div class="compare-card__rows">' + rowsHtml + '</div>' +
        '<div class="compare-card__footer">' +
          '<a href="' + sol.link + '" class="btn btn-solution rounded-pill px-4">了解更多</a>' +
        '</div>' +
      '</div>'
    );
  }

  if (useCarousel) {
    /* > 3 筆：Slick Carousel 模式 */
    var $el = $root;
    $el.addClass('slick-carousel compare-cards-carousel').empty();
    activeSolutions.forEach(function(sol) {
      $el.append('<div class="col-12 col-md-6 col-lg-4">' + buildCompareCardHTML(sol) + '</div>');
    });
    $el.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      dots: true,
      arrows: true,
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1, centerMode: true, centerPadding: '60px' } },
        { breakpoint: 640, settings: { slidesToShow: 1, centerMode: true, centerPadding: '36px', arrows: false } }
      ]
    });
  } else {
    /* ≤ 3 筆：Bootstrap Grid 模式（靜態，不需 Slick） */
    var $row = $('<div class="compare-cards row g-4 justify-content-center"></div>');
    activeSolutions.forEach(function(sol) {
      $row.append('<div class="col-12 col-md-6 col-lg-4">' + buildCompareCardHTML(sol) + '</div>');
    });
    $root.append($row);
  }
}

/* ============================================================
   頁面載入遮罩
   等 navbar 完成後呼叫；以淡出動畫移除 #page-loader
   ============================================================ */
function hidePageLoader() {
  var el = document.getElementById('page-loader');
  if (!el) return;
  el.classList.add('is-hiding');
  setTimeout(function() {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 380);
}

/* ============================================================
   全域 UI 初始化（所有頁面載入 components.js 後自動執行）
   ============================================================ */
$(function() {
  /* 回到頂端按鈕（固定懸浮 + Footer 箭頭） */
  $(document).on('click', '.scroll-top-btn, .footer-scroll-top', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  /* Accordion 響應式：初始載入（含靜態 accordion）+ 視窗 resize */
  syncAccordionParent();
  $(window).on('resize', syncAccordionParent);
});