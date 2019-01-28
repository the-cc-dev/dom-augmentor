/*! (c) Andrea Giammarchi - ISC */
var augmentor=function(n){"use strict";var t={};t.CustomEvent="function"==typeof CustomEvent?CustomEvent:function(n){return t.prototype=new t("").constructor.prototype,t;function t(n,t){t||(t={});var e=document.createEvent("CustomEvent");return e.initCustomEvent(n,!!t.bubbles,!!t.cancelable,t.detail),e}}();var e=t.CustomEvent,r={};try{r.WeakSet=WeakSet}catch(n){!function(n){var t=new n,e=u.prototype;function u(e){t.set(this,new n),e&&e.forEach(this.add,this)}e.add=function(n){return t.get(this).set(n,1),this},e.delete=function(n){return t.get(this).delete(n)},e.has=function(n){return t.get(this).has(n)},r.WeakSet=u}(WeakMap)}var u=r.WeakSet,a=null,o=[],i=[],c=function n(t){return typeof t==typeof n?t():t},s=function(n,t){return n.length!==t.length||n.some(k,t)},f=function(n){return function(t){var e={i:0,stack:[]};t[n]=e,t.before.push(function(){e.i=0})}},l=0,v=function(){return"_$"+l++},d=function(n){var t=a,e=t[n],r=t.update,u=e.i,o=e.stack;return e.i++,{i:u,stack:o,update:r,unknown:u===o.length}},h=function(n,t){for(var e=n.length,r=0;r<e;)n[r++](t)},p=function(n){var t={_:!0,$:!0,c:null,a:null};return{_:t,before:[],after:[],external:[],reset:[],update:function(){return t.$?n.apply(t.c,t.a):t._=!0}}};function k(n,t){return n!==this[t]}var m,y,g=v();try{m=cancelAnimationFrame,y=requestAnimationFrame}catch(n){m=clearTimeout,y=setTimeout}var w=function(n,t,e,r,u,a,o){var i={always:n,cb:u,check:t,clean:null,inputs:e,raf:r,t:0,update:t,fn:function(){b(a[o],i.cb())}};return i},E=function n(t){return function(e,r){var u=d(g),i=u.i,c=u.stack,f=u.unknown,l=r||o;if(f){var v=l===o,h=v||!t||"function"!=typeof l;v||!t||"function"!=typeof l?c.push(w(v,h,l,t,e,c,i)):(a.external.push(function(n){return r(e,n)}),c.push(w(v,v,o,t,n,c,i)))}else{var p=c[i],k=p.check,m=p.always,y=p.inputs;k&&(m||s(y,l))&&(p.cb=e,p.inputs=l,p.update=!0)}}},b=function(n,t){n.t=0,n.clean=t};i.push(function(n){var t=[],e={i:0,stack:t},r=function(n,t,e,r){e&&r?m(r):t&&t(),b(n,null)};n[g]=e,n.before.push(function(){e.i=0}),n.reset.push(function(){e.i=0;for(var n=t.length,u=0;u<n;u++){var a=t[u],o=a.check,i=a.clean,c=a.raf,s=a.t;o&&r(a,i,c,s)}}),n.after.push(function(){for(var n=t.length,e=0;e<n;e++){var u=t[e],a=u.check,o=u.clean,i=u.fn,c=u.raf,s=u.t,f=u.update;a&&f&&(u.update=!1,r(u,o,c,s),c?u.t=y(i):i())}})});var _=E(!0),C=E(!1),N=v();i.push(f(N));var W=v();i.push(f(W));var $=function(n,t){var e=d(W),r=e.i,u=e.stack,a=e.unknown,i=t||o;a&&S(u,-1,n,i);var c=u[r],f=c.filter,l=c.value,v=c.fn,h=c.inputs;return(f?s(h,i):n!==v)?S(u,r,n,i):l},S=function(n,t,e,r){var u={filter:r!==o,value:null,fn:e,inputs:r};return t<0?n.push(u):n[t]=u,u.value=e(),u.value},T=v();i.push(f(T));var L=function(n,t){var e=d(T),r=e.i,u=e.stack,a=e.unknown,o=e.update;if(a){var i=[null,function(e){t=n(t,e),i[0]=t,o()}];u.push(i),i[0]=c(t)}return u[r]},M=new WeakMap,x=v();i.push(f(x));function O(n){if(this.value!==n){this.value=n;for(var t=M.get(this),e=t.length,r=0;r<e;r++)t[r]()}}var D=function(n){var t="connected",e="dis"+t,r=n.Event,u=n.WeakSet,a=!0,o=new u;return function(n){return a&&(a=!a,function(n){var a=null;try{new MutationObserver(f).observe(n,{subtree:!0,childList:!0})}catch(t){var i=0,c=[],s=function(n){c.push(n),clearTimeout(i),i=setTimeout(function(){f(c.splice(i=0,c.length))},0)};n.addEventListener("DOMNodeRemoved",function(n){s({addedNodes:[],removedNodes:[n.target]})},!0),n.addEventListener("DOMNodeInserted",function(n){s({addedNodes:[n.target],removedNodes:[]})},!0)}function f(n){a=new function(){this[t]=new u,this[e]=new u};for(var r,o=n.length,i=0;i<o;i++)l((r=n[i]).removedNodes,e,t),l(r.addedNodes,t,e);a=null}function l(n,t,e){for(var u,a=new r(t),o=n.length,i=0;i<o;1===(u=n[i++]).nodeType&&v(u,a,t,e));}function v(n,t,e,r){o.has(n)&&!a[e].has(n)&&(a[r].delete(n),a[e].add(n),n.dispatchEvent(t));for(var u=n.children||[],i=u.length,c=0;c<i;v(u[c++],t,e,r));}}(n.ownerDocument)),o.add(n),n}}({Event:e,WeakSet:u}),R=function n(t,e){var r=e.nodeType;if(r){var u=1===r?e:function(n){for(var t=n.childNodes,e=t.length,r=0;r<e;){var u=t[r++];if(1===u.nodeType)return u}throw"unobservable"}(e);D(u);var a={handleEvent:A,onconnected:F,ondisconnected:q,$:t,_:null};u.addEventListener("connected",a,!1),u.addEventListener("disconnected",a,!1)}else{var o=e.valueOf();o!==e&&n(t,o)}};function A(n){this["on"+n.type]()}function F(){q.call(this),this._=this.$()}function q(){var n=this._;this._=null,n&&n()}return n.default=function(n){var t=p(e);return h(i,t),e.reset=function(){for(var n in h(t.reset,t),t)/^_\$/.test(n)&&t[n].stack.splice(0)},e;function e(){var e=a;a=t;var r=t._,u=t.before,o=t.after,i=t.external;try{var c;do{r.$=r._=!1,h(u,t),c=n.apply(r.c=this,r.a=arguments),h(o,t),i.length&&h(i.splice(0),c)}while(r._);return c}finally{r.$=!0,a=e}}},n.createContext=function(n){var t={value:n,provide:O};return M.set(t,[]),t},n.useCallback=function(n,t){return $(function(){return n},t)},n.useContext=function(n){var t=d(x),e=t.i,r=t.stack,u=t.unknown,a=t.update;return u&&(M.get(n).push(a),r.push(n)),r[e].value},n.useEffect=function(n,t){var e=[n];return t&&e.push(t.length?t:R),_.apply(null,e)},n.useLayoutEffect=C,n.useMemo=$,n.useReducer=L,n.useRef=function(n){var t=d(N),e=t.i,r=t.stack;if(t.unknown){var u={current:null};r.push(u),u.current=c(n)}return r[e]},n.useState=function(n){return L(function(n,t){return t},n)},n}({});
