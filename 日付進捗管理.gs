function getprogress() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('進捗管理');
  //進捗管理シートの最後の行を指定
  var lastRow = sheet.getLastRow();
  
  var daysheet = ss.getSheetByName('日付管理');
  //日付管理シートの2行目から自動入力
  var dayi  = 2;
  var d = new Date();
  var date = d.getDate();
  
  //進捗管理シートのC列4行目以降を取得し、日付管理シートに自動で入力させる。
  for(var i = 4; i <= lastRow; i++) {
    
    if(date !== 1) {
      daysheet.getRange(dayi, date + 2).setValue(sheet.getRange(i, 3).getValue());
      dayi ++
    //毎月1日はシートを白紙に戻す
    } else if(date === 1) {
      daysheet.getRange(2, 1, lastRow - 1, 33).clearContent();
      daysheet.getRange(dayi, date + 2).setValue(sheet.getRange(i, 3).getValue());
      dayi ++ 
    }
  }
}