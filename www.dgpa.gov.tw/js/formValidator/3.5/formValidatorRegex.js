var regexEnum =
{
    intege: "^-?[1-9]\\d*$",					//整數
    intege1: "^[1-9]\\d*$",					//正整數
    intege2: "^-[1-9]\\d*$",					//負整數
    num: "^([+-]?)\\d*\\.?\\d+$",			//數字
    num1: "^[1-9]\\d*|0$",					//正數（正整數 + 0）
    num2: "^-[1-9]\\d*|0$",					//負數（負整數 + 0）
    decmal: "^([+-]?)\\d*\\.\\d+$",			//浮點數
    decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",　　	//正浮點數
    decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",　 //負浮點數
    decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",　 //浮點數
    decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",　　 //非負浮點數（正浮點數 + 0）
    decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",　　//非正浮點數（負浮點數 + 0）

    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //郵件
    color: "^[a-fA-F0-9]{6}$",				//顏色
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
    chinese: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//僅中文
    ascii: "^[\\x00-\\xFF]+$",				//僅ACSII字元
    zipcode: "^\\d{6}$",						//郵編
    mobile: "^(13|15)[0-9]{9}$",				//手機
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
    notempty: "^\\S+$",						//非空
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//圖檔
    rar: "(.*)\\.(rar|zip|7zip|tgz)$",								//壓縮檔案
    date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
    qq: "^[1-9]*[1-9][0-9]*$",				//QQ號碼
    tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",	//電話號碼的函數(包括驗證國內區號,國際區號,分機號)
    username: "^\\w+$",						//用來用戶註冊。匹配由數字、26個英文字母或者下劃線組成的字串
    letter: "^[A-Za-z]+$",					//字母
    letter_u: "^[A-Z]+$",					//大寫字母
    letter_l: "^[a-z]+$",					//小寫字母
    idcard: "^[1-9]([0-9]{14}|[0-9]{17})$"	//身份證
}

var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "內蒙古", 21: "遼寧", 22: "吉林", 23: "黑龍江", 31: "上海", 32: "江蘇", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山東", 41: "河南", 42: "湖北", 43: "湖南", 44: "廣東", 45: "廣西", 46: "海南", 50: "重慶", 51: "四川", 52: "貴州", 53: "雲南", 54: "西藏", 61: "陝西", 62: "甘肅", 63: "青海", 64: "寧夏", 65: "新疆", 71: "台灣", 81: "香港", 82: "澳門", 91: "國外" }

function isCardID(sId) {
    var iSum = 0;
    var info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) return "你輸入的身份證長度或格式錯誤";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份證地區非法";
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份證上的出生日期非法";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) return "你輸入的身份證號非法";
    return true;//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女") 
}




//短時間，形如 (13:04:06)
function isTime(str) {
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
    if (a == null) { return false }
    if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
        return false;
    }
    return true;
}

//短日期，形如 (2003-12-05)
function isDate(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}

//長時間，形如 (2003-12-05 13:04:06)
function isDateTime(str) {
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}
