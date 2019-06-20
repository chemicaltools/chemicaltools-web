(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["deviation"],{"7afa":function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r});a("a481");function n(t){return t=t.replace(/[\d]/g,function(t){return"<sub>"+t+"</sub>"}),t=t.replace(/(\+|-)/g,function(t){return"<sup>"+t+"</sup>"}),t=t.replace(/<sub>[\d]<\/sub><sup>(\+|-)<\/sup>/g,function(t){return"<sup>"+t.replace(/<\/?su(b|p)>/g,"")+"</sup>"}),t}function r(t,e){var n=a("818d");if(n.extend(String.prototype,{}),0===t)return t;var r=Math.floor(Math.log(Math.abs(t))/Math.LN10),i=t*Math.pow(10,-r);return i.toFixed(e)+(0===r?"":"×10<sup>{0}</sup>".format(r))}},"818d":function(t,e,a){(function(e){"use strict";function a(t){var e=new Error(t);return e.name="ValueError",e}function n(t){return function(e){var n=Array.prototype.slice.call(arguments,1),r=0,i="UNDEFINED";return e.replace(/([{}])\1|[{](.*?)(?:!(.+?))?[}]/g,function(e,u,o,s){if(null!=u)return u;var l=o;if(l.length>0){if("IMPLICIT"===i)throw a("cannot switch from implicit to explicit numbering");i="EXPLICIT"}else{if("EXPLICIT"===i)throw a("cannot switch from explicit to implicit numbering");i="IMPLICIT",l=String(r),r+=1}var c=l.split("."),d=(/^\d+$/.test(c[0])?c:["0"].concat(c)).reduce(function(t,e){return t.reduce(function(t,a){return null!=a&&e in Object(a)?["function"===typeof a[e]?a[e]():a[e]]:[]},[])},[n]).reduce(function(t,e){return e},"");if(null==s)return d;if(Object.prototype.hasOwnProperty.call(t,s))return t[s](d);throw a('no transformer named "'+s+'"')})}}var r=n({});r.create=n,r.extend=function(t,a){var r=n(a);t.format=function(){var t=Array.prototype.slice.call(arguments);return t.unshift(this),r.apply(e,t)}},t.exports=r}).call(this,this)},a481:function(t,e,a){"use strict";var n=a("cb7c"),r=a("4bf8"),i=a("9def"),u=a("4588"),o=a("0390"),s=a("5f1b"),l=Math.max,c=Math.min,d=Math.floor,v=/\$([$&`']|\d\d?|<[^>]*>)/g,f=/\$([$&`']|\d\d?)/g,p=function(t){return void 0===t?t:String(t)};a("214f")("replace",2,function(t,e,a,h){return[function(n,r){var i=t(this),u=void 0==n?void 0:n[e];return void 0!==u?u.call(n,i,r):a.call(String(i),n,r)},function(t,e){var r=h(a,t,this,e);if(r.done)return r.value;var d=n(t),v=String(this),f="function"===typeof e;f||(e=String(e));var m=d.global;if(m){var b=d.unicode;d.lastIndex=0}var x=[];while(1){var w=s(d,v);if(null===w)break;if(x.push(w),!m)break;var M=String(w[0]);""===M&&(d.lastIndex=o(v,i(d.lastIndex),b))}for(var y="",_=0,I=0;I<x.length;I++){w=x[I];for(var $=String(w[0]),S=l(c(u(w.index),v.length),0),L=[],O=1;O<w.length;O++)L.push(p(w[O]));var k=w.groups;if(f){var E=[$].concat(L,S,v);void 0!==k&&E.push(k);var F=String(e.apply(void 0,E))}else F=g($,v,S,L,k,e);S>=_&&(y+=v.slice(_,S)+F,_=S+$.length)}return y+v.slice(_)}];function g(t,e,n,i,u,o){var s=n+t.length,l=i.length,c=f;return void 0!==u&&(u=r(u),c=v),a.call(o,c,function(a,r){var o;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(s);case"<":o=u[r.slice(1,-1)];break;default:var c=+r;if(0===c)return a;if(c>l){var v=d(c/10);return 0===v?a:v<=l?void 0===i[v-1]?r.charAt(1):i[v-1]+r.charAt(1):a}o=i[c-1]}return void 0===o?"":o})}})},b781:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-textarea",{attrs:{name:"input",label:t.$t("message.data"),hint:t.$t("message.dataline")},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),a("v-btn",{attrs:{color:"success"},on:{click:function(e){return t.calculateDeviation(t.input)}}},[t._v(t._s(t.$t("message.calculate")))]),a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",[a("div",{staticClass:"pt-3",domProps:{innerHTML:t._s(t.$t(t.output))}}),a("v-data-table",{directives:[{name:"show",rawName:"v-show",value:t.results,expression:"results"}],attrs:{items:t.results,"disable-initial-sort":"","hide-actions":"","hide-headers":""},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",[t._v(t._s(t.$t(e.item.name)))]),a("td",{staticClass:"text-xs-right",domProps:{innerHTML:t._s(e.item.value)}})]}}])})],1)],1)],1)},r=[],i=(a("ac6a"),a("28a5"),a("7afa")),u=a("edf6"),o=a("818d");o.extend(String.prototype,{});var s={data:function(){return{output:"message.inputdata",results:[],input:""}},methods:{calculateDeviation:function(t){if(t){var e=t.split(/[\r\n\\s ,;]+/),a=1/0,n=1/0;if(e.length>1){e.forEach(function(t){var e=t.length,r=0;if("-"===t.substr(0,1)&&e--,t.indexOf(".")>=0&&(e--,r=e-t.indexOf("."),Math.abs(parseFloat(t))<1)){var i=Math.floor(Math.log(Math.abs(parseFloat(t)))/Math.LN10);e+=i}a=Math.min(a,e),n=Math.min(n,r)}),a-=1;var r=u.calculateDeviation(e.map(parseFloat)),o=[{name:"deviation.input",value:e.join(", ")},{name:"deviation.average",value:r.average.toFixed(n)},{name:"deviation.ad",value:r.average_deviation.toFixed(n)},{name:"deviation.rad",value:Object(i["b"])(1e3*r.relative_average_deviation,a)+"‰"},{name:"deviation.sd",value:Object(i["b"])(r.standard_deviation,a)},{name:"deviation.rsd",value:Object(i["b"])(1e3*r.relative_standard_deviation,a)+"‰"}];this.results=o,this.output=""}else this.results=[],this.output="message.multpledata"}else this.output="message.inputdata"}}},l=s,c=a("2877"),d=a("6544"),v=a.n(d),f=a("8336"),p=a("a523"),h=a("8fea"),g=a("0e8f"),m=a("a722"),b=a("a844"),x=Object(c["a"])(l,n,r,!1,null,null,null);e["default"]=x.exports;v()(x,{VBtn:f["a"],VContainer:p["a"],VDataTable:h["a"],VFlex:g["a"],VLayout:m["a"],VTextarea:b["a"]})}}]);
//# sourceMappingURL=deviation.a75d4503.js.map