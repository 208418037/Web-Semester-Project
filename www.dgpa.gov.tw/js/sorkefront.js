function goCount(id, name) {
    $.get("/SetInfoReadCount?pid=" + id + "&name=" + name + "&rnd=" + Math.random());
}

function goCountAtt(id) {
    $.get("/SetAttReadCount?pid=" + id + "&rnd=" + Math.random());
}

//處理點閱數 iscount 是否統計計數(主要用於列表頁contenttype 未內容頁時是否統計計數)
function goCount2(id, name,iscount) {
    $.get("/SetInfoReadCount?pid=" + id + "&name=" + name + "&iscount=" + iscount + "&rnd=" + Math.random());
}

//設置首頁按鈕點閱數
function setIndexHits(uid) {
    $.get("/SetIndexItemHits?uid=" + uid + "&rnd=" + Math.random());
}

//JS去空格
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}