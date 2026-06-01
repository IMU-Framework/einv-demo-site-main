/* navbar.js — extracted navbar-related scripts so they execute when loaded dynamically */
(function(window, document){
  // closeAlert from template
  function closeAlert() {
    try {
      if (window.jQuery) {
        $('#myModal').modal('hide');
        if ($('#myModalTitle').text() == "✅ 填寫完成") {
          $('#contactform').modal('hide');
        } else {
          $('#contactform').modal('show');
        }
      }
    } catch (e) { console.error('closeAlert', e); }
  }

  function validate_error(sID, sMsg) {
    try {
      var _sMsg = "";
      var $ = window.jQuery;
      var _sValue = $ ? $(sID).val() : (document.querySelector(sID) ? document.querySelector(sID).value : null);
      if (_sValue == "" || _sValue == null || _sValue == "null") {
        if ($) $(sID).next().html("<span class='error'>" + sMsg + "</span>");
        var _iIndex = sMsg.indexOf(" ");
        _sMsg = sMsg.substring(0, _iIndex+1);
      } else {
        if ($) $(sID).next().html("");
        if (sID == "#InputEmail") {
          var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          var _isValid = EmailRegex.test(_sValue);
          if (!_isValid) {
            if ($) $(sID).next().html("<span class='error'>Email格式錯誤</span>");
            _sMsg = "Email格式錯誤 ";
          }
        }
      }
      return _sMsg;
    } catch (e) { console.error('validate_error', e); return ""; }
  }

  function submitForm() {
    try {
      var $ = window.jQuery;
      if (!$) return;
      var _sCompany = $("#InputCompanyName").val();
      var _sName = $("#InputContactName").val();
      var _sMobile = $("#InputMobilePhone").val();
      var _sTel = $("#InputCompanyPhone").val();
      var _sEmail = $("#InputEmail").val();
      var _sArea = $("#InputArea").val();
      var _sIndustry = $("#InputIndustry").val();
      var _sType = $("#InputStoreType").val();
      var _sNum = $("#InputStoreNum").val();
      var _sRemark = $("#InputRemark").val();
      var _sChoose1 = "";
      if (document.all && document.all.InputItems) {
        for (var i=0;i<document.all.InputItems.length;i++) if (document.all.InputItems[i].checked) _sChoose1 += (i+1)+',';
      } else {
        var checks = document.getElementsByName('InputItems');
        if (checks && checks.length) for (var j=0;j<checks.length;j++) if (checks[j].checked) _sChoose1 += (j+1)+',';
      }

      var _sMsg = "";
      _sMsg += validate_error("#InputCompanyName", "公司/品牌/商店 必須輸入");
      _sMsg += validate_error("#InputContactName", "姓名 必須輸入");
      _sMsg += validate_error("#InputEmail", "Email 必須輸入");
      _sMsg += validate_error("#InputMobilePhone", "行動電話 必須輸入");
      _sMsg += validate_error("#InputIndustry", "行業別 必須輸入");
      _sMsg += validate_error("#InputArea", "所在地區 必須輸入");
      _sMsg += validate_error("#InputStoreType", "營業類型 必須輸入");
      _sMsg += validate_error("#InputStoreNum", "實體門市數量 必須輸入");
      if (_sChoose1 == "") _sMsg += "想了解的產品";
      if (_sMsg != "") {
        $('#myModal').modal('hide');
        _sMsg = "資料填寫不完整，請檢查輸入資料：<br><br>  " + _sMsg;
        $("#msg").html(_sMsg);
        var _sIcon = "<span style='color:red'>⚠️</span>";
        $('#myModalTitle').html(_sIcon + "️️ 填寫未完成");
        $('#myModalDialog').css("border", "2px solid red");
        $("#contactform").modal("hide");
        $('#myModal').modal("show");
        return;
      }

      var data = { from: "www", company: _sCompany, name: _sName, mobile: _sMobile, tel: _sTel, email: _sEmail, area: _sArea, industry: _sIndustry, store_type: _sType, stores_num: _sNum, choose1: _sChoose1, remark: _sRemark };
      var _sURL = "https://lms-t.emis.com.tw/lms/ws/www/data1";
      if (window.location.href.indexOf("localhost") > 0) _sURL = "http://www.emis.com.tw:8080/mis/ws/www/data1";
      $.ajax({ type: "POST", dataType: "json", contentType: 'application/json', url: _sURL, crossOrigin: true, cache: false, data: JSON.stringify(data), success: function(response){
        if (response.code == "0"){
          $("#contactform").modal('hide');
          $("#msg").html("感謝您的填寫，我們會盡快與您聯絡。");
          $('#myModalTitle').text("✅ 填寫完成");
          $('#myModalDialog').css("border", "2px solid green");
          $('#myModal').modal("show");
        } else {
          var _sMsg2 = response.message || '';
          $("#contactform").modal("hide");
          $("#msg").html(_sMsg2);
          $('#myModalTitle').text("⚠️ 填寫未完成");
          $('#myModalDialog').css("border", "2px solid red");
          $('#myModal').modal("show");
        }
      }, error: function(e){ alert("Error " + (e.message || e.statusText || '')); } });
    } catch (e) { console.error('submitForm', e); }
  }

  // expose functions globally for templates to call if needed
  window.closeAlert = closeAlert;
  window.validate_error = validate_error;
  window.submitForm = submitForm;

})(window, document);
