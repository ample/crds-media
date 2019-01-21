const e=window.CrdsComponents.h;var t=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=e,i=!0,s=!1,a=void 0;try{for(var u,c=n[Symbol.iterator]();!(i=(u=c.next()).done);i=!0){var f=u.value;if(null==o)return;o="function"==typeof f?f(o):o[f]}}catch(e){s=!0,a=e}finally{try{!i&&c.return&&c.return()}finally{if(s)throw a}}return o},n=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}};function r(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}var o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function s(e){return null!==e&&"object"==typeof e}function a(e){return"[object Function]"===o.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var c={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!=e&&(r(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&r(e.slice(0,0))}(e)||!!e._isBuffer)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:a,isStream:function(e){return s(e)&&a(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function n(n,r){t[r]="object"==typeof t[r]&&"object"==typeof n?e(t[r],n):n}for(var r=0,o=arguments.length;r<o;r++)u(arguments[r],n);return t},extend:function(e,t,r){return u(t,function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}},f="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};function l(){throw new Error("setTimeout has not been defined")}function h(){throw new Error("clearTimeout has not been defined")}var d=l,p=h;function m(e){if(d===setTimeout)return setTimeout(e,0);if((d===l||!d)&&setTimeout)return d=setTimeout,setTimeout(e,0);try{return d(e,0)}catch(t){try{return d.call(null,e,0)}catch(t){return d.call(this,e,0)}}}"function"==typeof f.setTimeout&&(d=setTimeout),"function"==typeof f.clearTimeout&&(p=clearTimeout);var g,w=[],y=!1,v=-1;function C(){y&&g&&(y=!1,g.length?w=g.concat(w):v=-1,w.length&&b())}function b(){if(!y){var e=m(C);y=!0;for(var t=w.length;t;){for(g=w,w=[];++v<t;)g&&g[v].run();v=-1,t=w.length}g=null,y=!1,function(e){if(p===clearTimeout)return clearTimeout(e);if((p===h||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(e);try{p(e)}catch(t){try{return p.call(null,e)}catch(t){return p.call(this,e)}}}(e)}}function k(e,t){this.fun=e,this.array=t}function x(){}k.prototype.run=function(){this.fun.apply(null,this.array)};var T=x,L=x,S=x,E=x,R=x,A=x,B=x,j=f.performance||{},N=j.now||j.mozNow||j.msNow||j.oNow||j.webkitNow||function(){return(new Date).getTime()},q=new Date,D={nextTick:function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];w.push(new k(e,t)),1!==w.length||y||m(b)},title:"browser",browser:!0,env:{},argv:[],version:"",versions:{},on:T,addListener:L,once:S,off:E,removeListener:R,removeAllListeners:A,emit:B,binding:function(e){throw new Error("process.binding is not supported")},cwd:function(){return"/"},chdir:function(e){throw new Error("process.chdir is not supported")},umask:function(){return 0},hrtime:function(e){var t=.001*N.call(j),n=Math.floor(t),r=Math.floor(t%1*1e9);return e&&(n-=e[0],(r-=e[1])<0&&(n--,r+=1e9)),[n,r]},platform:"browser",release:{},config:{},uptime:function(){return(new Date-q)/1e3}},O=function(e,t,n,r,o){return function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}(new Error(e),t,n,r,o)};function U(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var _=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],P=c.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=c.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0};function F(){this.message="String contains an invalid character"}(F.prototype=new Error).code=5,F.prototype.name="InvalidCharacterError";var M=c.isStandardBrowserEnv()?{write:function(e,t,n,r,o,i){var s=[];s.push(e+"="+encodeURIComponent(t)),c.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),c.isString(r)&&s.push("path="+r),c.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},z="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||function(e){for(var t,n,r=String(e),o="",i=0,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.charAt(0|i)||(s="=",i%1);o+=s.charAt(63&t>>8-i%1*8)){if((n=r.charCodeAt(i+=.75))>255)throw new F;t=t<<8|n}return o},H=function(e){return new Promise(function(t,n){var r=e.data,o=e.headers;c.isFormData(r)&&delete o["Content-Type"];var i=new XMLHttpRequest,s="onreadystatechange",a=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in i||P(e.url)||(i=new window.XDomainRequest,s="onload",a=!0,i.onprogress=function(){},i.ontimeout=function(){}),e.auth&&(o.Authorization="Basic "+z((e.auth.username||"")+":"+(e.auth.password||""))),i.open(e.method.toUpperCase(),function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(c.isURLSearchParams(t))r=t.toString();else{var o=[];c.forEach(t,function(e,t){null!=e&&(c.isArray(e)?t+="[]":e=[e],c.forEach(e,function(e){c.isDate(e)?e=e.toISOString():c.isObject(e)&&(e=JSON.stringify(e)),o.push(U(t)+"="+U(e))}))}),r=o.join("&")}return r&&(e+=(-1===e.indexOf("?")?"?":"&")+r),e}(e.url,e.params,e.paramsSerializer),!0),i.timeout=e.timeout,i[s]=function(){if(i&&(4===i.readyState||a)&&(0!==i.status||i.responseURL&&0===i.responseURL.indexOf("file:"))){var r,o,s,u,f,l="getAllResponseHeaders"in i?(r=i.getAllResponseHeaders(),f={},r?(c.forEach(r.split("\n"),function(e){if(u=e.indexOf(":"),o=c.trim(e.substr(0,u)).toLowerCase(),s=c.trim(e.substr(u+1)),o){if(f[o]&&_.indexOf(o)>=0)return;f[o]="set-cookie"===o?(f[o]?f[o]:[]).concat([s]):f[o]?f[o]+", "+s:s}}),f):f):null;!function(e,t,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(O("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}(t,n,{data:e.responseType&&"text"!==e.responseType?i.response:i.responseText,status:1223===i.status?204:i.status,statusText:1223===i.status?"No Content":i.statusText,headers:l,config:e,request:i}),i=null}},i.onerror=function(){n(O("Network Error",e,null,i)),i=null},i.ontimeout=function(){n(O("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",i)),i=null},c.isStandardBrowserEnv()){var u=M,f=(e.withCredentials||P(e.url))&&e.xsrfCookieName?u.read(e.xsrfCookieName):void 0;f&&(o[e.xsrfHeaderName]=f)}if("setRequestHeader"in i&&c.forEach(o,function(e,t){void 0===r&&"content-type"===t.toLowerCase()?delete o[t]:i.setRequestHeader(t,e)}),e.withCredentials&&(i.withCredentials=!0),e.responseType)try{i.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&i.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&i.upload&&i.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){i&&(i.abort(),n(e),i=null)}),void 0===r&&(r=null),i.send(r)})},I={"Content-Type":"application/x-www-form-urlencoded"};function X(e,t){!c.isUndefined(e)&&c.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var J,$={adapter:("undefined"!=typeof XMLHttpRequest?J=H:void 0!==D&&(J=H),J),transformRequest:[function(e,t){return function(e,t){c.forEach(e,function(t,n){"Content-Type"!==n&&n.toUpperCase()==="Content-Type".toUpperCase()&&(e["Content-Type"]=t,delete e[n])})}(t),c.isFormData(e)||c.isArrayBuffer(e)||c.isBuffer(e)||c.isStream(e)||c.isFile(e)||c.isBlob(e)?e:c.isArrayBufferView(e)?e.buffer:c.isURLSearchParams(e)?(X(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):c.isObject(e)?(X(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};c.forEach(["delete","get","head"],function(e){$.headers[e]={}}),c.forEach(["post","put","patch"],function(e){$.headers[e]=c.merge(I)});var V=$;function K(){this.handlers=[]}K.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},K.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},K.prototype.forEach=function(e){c.forEach(this.handlers,function(t){null!==t&&e(t)})};var Z=K,G=function(e,t,n){return c.forEach(n,function(n){e=n(e,t)}),e},W=function(e){return!(!e||!e.__CANCEL__)};function Q(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var Y=function(e){var t,n;return Q(e),e.baseURL&&!/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e.url)&&(e.url=(t=e.baseURL,(n=e.url)?t.replace(/\/+$/,"")+"/"+n.replace(/^\/+/,""):t)),e.headers=e.headers||{},e.data=G(e.data,e.headers,e.transformRequest),e.headers=c.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),c.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||V.adapter)(e).then(function(t){return Q(e),t.data=G(t.data,t.headers,e.transformResponse),t},function(t){return W(t)||(Q(e),t&&t.response&&(t.response.data=G(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})};function ee(e){this.defaults=e,this.interceptors={request:new Z,response:new Z}}ee.prototype.request=function(e){"string"==typeof e&&(e=c.merge({url:arguments[0]},arguments[1])),(e=c.merge(V,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[Y,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},c.forEach(["delete","get","head","options"],function(e){ee.prototype[e]=function(t,n){return this.request(c.merge(n||{},{method:e,url:t}))}}),c.forEach(["post","put","patch"],function(e){ee.prototype[e]=function(t,n,r){return this.request(c.merge(r||{},{method:e,url:t,data:n}))}});var te=ee;function ne(e){this.message=e}ne.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},ne.prototype.__CANCEL__=!0;var re=ne;function oe(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new re(e),t(n.reason))})}oe.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},oe.source=function(){var e;return{token:new oe(function(t){e=t}),cancel:e}};var ie=oe;function se(e){var t=new te(e),r=n(te.prototype.request,t);return c.extend(r,te.prototype,t),c.extend(r,t),r}var ae=se(V);ae.Axios=te,ae.create=function(e){return se(c.merge(V,e))},ae.Cancel=re,ae.CancelToken=ie,ae.isCancel=W,ae.all=function(e){return Promise.all(e)},ae.spread=function(e){return function(t){return e.apply(null,t)}};var ue=ae;ue.default=ae;var ce=ue;class fe{constructor(){this.debug=!1,this.key="crds-hearts",this._likes=[]}componentWillLoad(){this.isLiked=this.likes().includes(this.id),this.getCount()}getCount(){return ce.get(`https://cdn.contentful.com/spaces/y3a9myzsdjan/environments/int/entries/${this.id}`,{params:{access_token:"f8a7a66b9bb572e7ba4e793799ee41f80ade56794476e1dcfc374631f505735c"}}).then(e=>{this.count=t(e,"data","fields","interaction_count")||0})}abbrevCount(){return this.count>1e3?`${Math.round(this.count/1e3*4)/4}K`:this.count.toString()}likes(){const e=localStorage.getItem(this.key);return e?JSON.parse(e):[]}toggle(e){this.log("toggle()"),e.preventDefault(),this.isLiked=!this.isLiked,this.isLiked?(this.add(),this.count++):(this.remove(),this.count--)}remove(){this.log("removeFromStore()"),this._likes=this.likes().filter(e=>{if(e.toString()!==this.id)return e}),this.save(this._likes)}add(){this._likes=this.likes(),this._likes.push(this.id),this.save(this._likes)}save(e){this.log("save()"),localStorage.setItem(this.key,JSON.stringify(e)),ce.post("https://8k97vbzbrk.execute-api.us-east-1.amazonaws.com/int/content-interactions",{entry_id:this.id,action:this.isLiked?"add":"subtract"})}log(e,t=""){this.debug&&console.log(e,t)}render(){return e("a",{href:"#",onClick:e=>this.toggle(e),class:this.isLiked?"on":"off"},e("span",{innerHTML:'<svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="heart"><path d="M222.944078,39.3395243 C232.469215,47.3270078 239.075354,57.1577642 242.762502,68.8317796 C246.449652,80.505795 246.987363,92.2566154 244.37563,104.084241 C241.763898,115.911866 236.156363,126.126627 227.553015,134.728537 L138.600552,226.891836 C135.527926,229.963948 131.994414,231.5 128,231.5 C124.005586,231.5 120.472074,229.963948 117.399448,226.891836 L28.4469857,135.189353 C19.8436364,126.280238 14.2361025,115.911866 11.6243699,104.084241 C9.01263721,92.2566154 9.55034867,80.505795 13.2374974,68.8317796 C16.924646,57.1577642 23.5307851,47.3270078 33.0559215,39.3395243 C41.3520061,32.2736738 50.7235066,27.8191121 61.1704302,25.9758461 C71.6173538,24.1325802 81.9106415,24.90061 92.0503004,28.2799285 C102.189959,31.6592471 111.100566,37.3426551 118.782129,45.3301387 L128,54.5464684 L137.217871,45.3301387 C144.899434,37.3426551 153.810041,31.6592471 163.9497,28.2799285 C174.089359,24.90061 184.382646,24.1325802 194.82957,25.9758461 C205.276493,27.8191121 214.647994,32.2736738 222.944078,39.3395243 Z" id="Path"></path></g></svg>',class:"icon heart"}),e("span",{innerHTML:'<svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="heart-o"><path d="M218.116413,43.6103959 C227.157221,51.1917362 233.427455,60.5226236 236.927121,71.603045 C240.426788,82.6834664 240.937158,93.8367875 238.458225,105.063008 C235.979293,116.289229 230.656887,125.984595 222.490997,134.14912 L138.061541,221.626149 C135.14515,224.542052 131.791308,226 128,226 C124.208692,226 120.85485,224.542052 117.938459,221.626149 L33.5090034,134.586505 C25.3431125,126.130395 20.0207075,116.289229 17.5417748,105.063008 C15.0628421,93.8367875 15.5732123,82.6834664 19.0728789,71.603045 C22.5725454,60.5226236 28.7698738,51.1917362 37.6648574,43.6103959 C46.559841,36.0290557 56.4026531,31.6552043 67.1932938,30.4888417 C76.8173768,29.3224791 86.587277,30.6346345 96.5030011,34.425308 C105.543809,37.9243891 113.126417,42.8814185 119.250834,49.2964028 L128,58.4814907 L136.749166,49.2964028 C144.040141,41.7150625 152.570578,36.3206413 162.340478,33.1131525 C172.110378,29.9056637 181.95319,29.1766863 191.868914,30.9262268 C201.784638,32.6757674 210.533805,36.903826 218.116413,43.6103959 Z M212.429455,124.526647 C218.262231,118.694847 222.272267,111.477993 224.459559,102.876083 C226.646851,94.2741726 226.573939,85.8909618 224.24083,77.726437 C221.61608,68.3955562 216.585309,60.5955167 209.148518,54.3263319 C201.711727,48.0571471 193.47293,44.630959 184.432123,44.0477811 C177.141149,43.7561888 169.704357,45.3599365 162.121749,48.8590176 C155.705691,51.4833285 150.602015,54.9824096 146.810708,59.356261 L128,78.6012073 L109.189292,59.356261 C105.10635,54.9824096 100.002668,51.3375357 93.8782512,48.4216325 C86.2956426,44.9225514 78.8588512,43.4646031 71.567877,44.0477811 C62.5270696,44.630959 54.2882735,48.0571471 46.8514821,54.3263319 C39.4146907,60.5955167 34.38392,68.3955562 31.7591701,77.726437 C29.4260613,85.8909618 29.3531494,94.2741726 31.5404409,102.876083 C33.7277325,111.477993 37.7377693,118.694847 43.5705447,124.526647 L128,212.003675 L212.429455,124.526647 Z"></path></g></svg>',class:"icon heart-o"}),e("span",{class:"count"},this.abbrevCount()))}static get is(){return"heart-button"}static get encapsulation(){return"shadow"}static get properties(){return{_likes:{state:!0},count:{type:Number,attr:"count",mutable:!0},id:{type:String,attr:"id"},isLiked:{type:Boolean,attr:"is-liked",mutable:!0},key:{type:String,attr:"key"}}}static get style(){return"a.sc-heart-button{font-family:sans-serif;display:block;color:#979797;font-size:80%;text-decoration:none}a.sc-heart-button > *.sc-heart-button{vertical-align:middle}a.on.sc-heart-button > span.heart-o.sc-heart-button > svg.sc-heart-button, a.on.sc-heart-button > span.heart.sc-heart-button > svg.sc-heart-button{fill:#c05c04}a.on.sc-heart-button > span.heart-o.heart.sc-heart-button, a.on.sc-heart-button > span.heart.heart.sc-heart-button, a.sc-heart-button:hover > span.heart-o.heart.sc-heart-button, a.sc-heart-button:hover > span.heart.heart.sc-heart-button{display:inline-block}a.on.sc-heart-button > span.heart-o.heart-o.sc-heart-button, a.on.sc-heart-button > span.heart.heart-o.sc-heart-button, a.sc-heart-button:hover > span.heart-o.heart-o.sc-heart-button, a.sc-heart-button:hover > span.heart.heart-o.sc-heart-button{display:none}a.sc-heart-button:hover > span.heart.sc-heart-button, a.sc-heart-button:hover > span.heart-o.sc-heart-button{background:#c05c04}a.sc-heart-button:hover > span.heart-o.sc-heart-button > svg.sc-heart-button, a.sc-heart-button:hover > span.heart.sc-heart-button > svg.sc-heart-button{fill:#fff}a.sc-heart-button   span.count.sc-heart-button{padding-left:.5rem}a.sc-heart-button   span.heart.sc-heart-button, a.sc-heart-button   span.heart-o.sc-heart-button{display:inline-block;border:1px solid;border-radius:50%;width:42px;height:42px}a.sc-heart-button   span.heart-o.sc-heart-button   svg.sc-heart-button, a.sc-heart-button   span.heart.sc-heart-button   svg.sc-heart-button{margin:9px;width:24px;height:24px;fill:currentColor}a.sc-heart-button   span.heart.sc-heart-button{display:none}a.sc-heart-button   span.heart-o.sc-heart-button{display:inline-block}"}}export{fe as HeartButton};