function getprogress() {
  //進捗管理シート取得
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('進捗管理');
  var lastRow = sheet.getLastRow();
  
  //日付管理シートと日付を取得
  var daysheet = ss.getSheetByName('日付管理');
  var dayi  = 2;
  var d = new Date();
  var date = d.getDate();
  
　//Slackメッセージ用に配列準備
  var SlackText = new Array(lastRow-3);
  
  //進捗管理シートのC列4行目以降を取得し、日付管理シートに自動で入力させる。
  for(var i = 4; i <= lastRow; i++) {
    
    //自動入力させたいデータ。
    var progress = sheet.getRange(i, 3).getValue(); 
    var studentName = sheet.getRange(i ,2).getValue();
    
    if(date !== 1) {
      daysheet.getRange(dayi, date + 2).setValue(progress);
      SlackText[i-4] = studentName + 'さんは'+ progress;
      dayi ++
      
    //毎月1日はシートを白紙に戻す
    } else if(date === 1) {
      daysheet.getRange(2, 1, lastRow - 1, 33).clearContent();
      daysheet.getRange(dayi, date + 2).setValue(progress);
      SlackText[i-4] = studentName + 'さんは'+ progress;
      dayi ++ 
    }
  }
  
  //Slackに送りたいメッセージ
  var sendMessage = SlackText.join('\n');
  postSlack(sendMessage);
}


function postSlack(text) {
  
  var url = 'SlackWebhookのURLを入力してください！！！';
  var params = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({text: text})
  };
  
  UrlFetchApp.fetch(url, params);
}