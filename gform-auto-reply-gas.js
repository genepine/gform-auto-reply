function sendMailGoogleForm() {
    Logger.log('sendMailGoogleForm() debug start');
   
    //------------------------------------------------------------
    // 設定エリアここから
    //------------------------------------------------------------
    
    // 件名、本文、フッター
    var subject = "アサーティブジャパン｜DVDのご注文"; 
    var body
    = "この度はこの度はDVDをご注文いただきまして\n"
    +"誠にありがとうございました。\n"
    +"以下の内容を承りました。\n"
    +"後日、担当者よりメールでご連絡いたします。\n\n"
    + "------------------------------------------------------------\n";
    var footer
    = "------------------------------------------------------------\n\n"
    +"このメールは自動応答メールにより配信しております。\n"
    +" \n"
    +"*****************************************\n"
    +"  特定非営利活動法人 アサーティブジャパン\n"
    +"  〒186-0002\n"
    +"  東京都国立市東1-6-31  KSビル 4F A号\n"
    +"  TEL：042-580-2280／FAX：042-580-2528\n"
    +"  info@assertive.org\n"
    +"*****************************************";
    
    // 入力カラム名の指定
    var NAME_COL_NAME = 'お名前';
    var MAIL_COL_NAME = 'E-mail';
    
    
    // メール送信先
    var admin_name ="アサーティブジャパン";//送信元の名前 
    var admin = "info@assertive.org"; // 送信元メールアドレス
    var cc = "";// ccが必要な場合は、""内に記載
    var bcc = "";// bccが必要な場合は、""内に記載
    var reply = admin;
    var to = ""; // To: （入力者のアドレスが自動で入ります）
   
    
    //------------------------------------------------------------
    // 設定エリアここまで
    //------------------------------------------------------------
   
    try{
    // スプレッドシートの操作
    var sheet = SpreadsheetApp.getActiveSheet();
    var rows = sheet.getLastRow();
    var cols = sheet.getLastColumn();
    var rg = sheet.getDataRange();
    Logger.log("rows="+rows+" cols="+cols);
   
    // メール件名・本文作成と送信先メールアドレス取得
    for (var i = 1; i <= cols; i++ ) {
    var col_name = rg.getCell(1, i).getValue(); // カラム名
    var col_value = rg.getCell(rows, i).getValue(); // 入力値
    body += "【"+col_name+"】\n";
    body += col_value + "\n\n";
    if ( col_name === NAME_COL_NAME ) {
    body = col_value+" 様\n\n"+body;
    }
    if ( col_name === MAIL_COL_NAME ) {
    to = col_value;
    }
    }
    body += footer;
   
    // 送信先オプション
    var options = {};
    if ( cc ) options.cc = cc;
    if ( bcc ) options.bcc = bcc;
    if ( reply ) options.replyTo = reply;
   
    // メール送信
    if ( to ) {
    MailApp.sendEmail(to, subject, body, options);
    }else{
    MailApp.sendEmail(admin, "【失敗】Googleフォームにメールアドレスが指定されていません", body);
    }
    }catch(e){
    MailApp.sendEmail(admin, "【失敗】Googleフォームからメール送信中にエラーが発生", e.message);
    } 
   }