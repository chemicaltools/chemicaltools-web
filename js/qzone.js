(function(){
var p = {
url:location.href,
showcount:'1',
desc:'',
summary:'',/*����ժҪ(��ѡ)*/
title:'',
site:'��ѧe+',
pics:'', 
style:'202',
width:105,
height:31
};
var s = [];
for(var i in p){
s.push(i + '=' + encodeURIComponent(p[i]||''));
}
document.write(['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&'),'" target="_blank">����</a>'].join(''));
})();