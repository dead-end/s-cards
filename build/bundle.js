var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function s(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function l(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function g(){return p(" ")}function h(){return p("")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function w(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function b(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}t.selectedIndex=-1}function v(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}let x;function _(t){x=t}function q(){if(!x)throw new Error("Function called outside component initialization");return x}function y(t){q().$$.on_mount.push(t)}const S=[],k=[],C=[],L=[],T=Promise.resolve();let E=!1;function V(t){C.push(t)}let H=!1;const j=new Set;function A(){if(!H){H=!0;do{for(let t=0;t<S.length;t+=1){const e=S[t];_(e),M(e.$$)}for(_(null),S.length=0;k.length;)k.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];j.has(e)||(j.add(e),e())}C.length=0}while(S.length);for(;L.length;)L.pop()();E=!1,H=!1,j.clear()}}function M(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(V)}}const P=new Set;let I;function z(){I={r:0,c:[],p:I}}function D(){I.r||s(I.c),I=I.p}function O(t,e){t&&t.i&&(P.delete(t),t.i(e))}function B(t,e,n,o){if(t&&t.o){if(P.has(t))return;P.add(t),I.c.push((()=>{P.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function N(t){t&&t.c()}function Q(t,e,o,c){const{fragment:i,on_mount:l,on_destroy:a,after_update:u}=t.$$;i&&i.m(e,o),c||V((()=>{const e=l.map(n).filter(r);a?a.push(...e):s(e),t.$$.on_mount=[]})),u.forEach(V)}function U(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function W(t,e){-1===t.$$.dirty[0]&&(S.push(t),E||(E=!0,T.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,n,r,c,i,l,a,d=[-1]){const f=x;_(e);const p=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:n.context||[]),callbacks:o(),dirty:d,skip_bound:!1,root:n.target||f.$$.root};a&&a(p.root);let g=!1;if(p.ctx=r?r(e,n.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return p.ctx&&i(p.ctx[t],p.ctx[t]=s)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](s),g&&W(e,t)),n})):[],p.update(),g=!0,s(p.before_update),p.fragment=!!c&&c(p.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);p.fragment&&p.fragment.l(t),t.forEach(u)}else p.fragment&&p.fragment.c();n.intro&&O(e.$$.fragment),Q(e,n.target,n.anchor,n.customElement),A()}_(f)}class F{$destroy(){U(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const J=[];function K(e,n=t){let o;const s=new Set;function r(t){if(c(e,t)&&(e=t,o)){const t=!J.length;for(const t of s)t[1](),J.push(t,e);if(t){for(let t=0;t<J.length;t+=2)J[t][0](J[t+1]);J.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(c,i=t){const l=[c,i];return s.add(l),1===s.size&&(o=n(r)||t),c(e),()=>{s.delete(l),0===s.size&&(o(),o=null)}}}}const Y=(()=>{const{subscribe:t,set:e,update:n}=K({component:""});return{views:{},subscribe:t,setView:(t,n)=>{const o=Y.views[t];o.props=n,e(o)}}})(),G=(()=>{const{subscribe:t,set:e,update:n}=K([]);return{subscribe:t,addError:t=>{console.log("Added error:",t),n((e=>(e.push(t),e)))},resetErrors:()=>{e([])}}})(),X=t=>fetch(t).then((e=>{if(!e.ok)throw Error(`Unable to get JSON: ${t} - ${e.statusText}`);return e.json()})).catch((t=>G.addError("fetchJson: "+t)));let Z;const tt=t=>{G.addError(t.type)},et=()=>new Promise(((t,e)=>{const n=indexedDB.open("s-card",1);n.onupgradeneeded=t=>{Z=n.result,t.oldVersion<1&&(Z.createObjectStore("topics",{keyPath:"file"}),Z.createObjectStore("questions",{keyPath:"id",autoIncrement:!0}).createIndex("file","file",{unique:!1}),Z.createObjectStore("config",{keyPath:"key"}).transaction.oncomplete=()=>{console.log("Upgrade completed!")})},n.onerror=tt,n.onsuccess=e=>{Z=n.result,Z.onerror=tt,console.log("db init success!"),t()}})),nt=t=>{if(!t)return"";const e=t.getDate()>9?t.getDate():"0"+t.getDate(),n=t.getMonth()+1,o=n>9?n:"0"+n,s=t.getHours()>9?t.getHours():"0"+t.getHours(),r=t.getMinutes()>9?t.getMinutes():"0"+t.getMinutes();return`${e}.${o}.${t.getFullYear()} ${s}:${r}`},ot=(t,e)=>{const n=e||[];return(t||[]).toString()!==n.toString()},st=(t,e)=>{let n=0;for(let e=0;e<t.length;e++)n+=t[e];return rt(n,t.length*e)},rt=(t,e)=>{if(!e)return 0;const n=100*t/e;return Math.round(n)},ct=(t,e)=>((t,e,n,o)=>new Promise(((s,r)=>{const c=t.objectStore(e),i=c.index(n).getAllKeys(o);i.onsuccess=t=>{i.result.forEach((t=>{c.delete(t).onsuccess=e=>{console.log("Store:",c.name,"deleted:",t)}})),s()}})))(t,"questions","file",e),it=t=>{const e=Z.transaction(["questions"],"readonly").objectStore("questions");return lt(e,t)},lt=(t,e)=>new Promise(((n,o)=>{const s=t.index("file").getAll(e.file);s.onsuccess=t=>{n(s.result)}})),at=t=>{const e=Z.transaction(["topics","questions"],"readwrite"),n=e.objectStore("topics"),o=n.getAll();o.onsuccess=s=>{const r=((t,e)=>{const n=new Map;return t.forEach((t=>{if(!t.hasOwnProperty(e))throw new Error(`Object has no property: ${e}`);n.set(t[e],t)})),n})(o.result,"file"),c=t.map((t=>t.file));for(let t of r.keys())c.includes(t)||(n.delete(t).onsuccess=()=>{console.log("Store:",n.name,"deleted:",t),ct(e,t)});t.forEach((t=>{((t,e)=>!e||(e.lastLoaded&&(t.lastLoaded=e.lastLoaded),e.lastLearned&&(t.lastLearned=e.lastLearned),t.title!==e.title||t.desc!==e.desc||!ot(t.tags,e.tags)||!ot(t.details,e.details)))(t,r.get(t.file))&&(n.put(t).onsuccess=e=>{console.log("Store:",n.name,"update:",t.file)})}))}},ut=async t=>{console.log(t);const e=(t=>new Promise(((e,n)=>{const o=Z.transaction(["topics"],"readonly").objectStore("topics"),s=o.get(t);s.onsuccess=t=>{const n=s.result.hash;console.log("Store:",o.name,"get hash:",n),e(n)}})))(t),n=(o=t,fetch(o,{method:"HEAD"}).then((t=>{if(!t.ok)throw Error(`Unable to get hash for: ${o} - ${t.statusText}`);const e=t.headers.get("Content-Length");return console.log("url: ",o,"header:",e),e})).catch((t=>G.addError("fetchHash: "+t))));var o;const[s,r]=await Promise.all([e,n]);if(console.log("lmStore",s,"lmJson",r),!r)return;if(s&&s===r)return;const c=await X(t);c.forEach((e=>((t,e)=>{t.file=e,t.total=0,t.failed=0,t.ratio=0,t.progress=0})(e,t))),console.log(c);const i=Z.transaction(["topics","questions"],"readwrite");ct(i,t).then((()=>{((t,e,n)=>new Promise(((o,s)=>{const r=t.objectStore(e);n.forEach((t=>{r.add(t).onsuccess=e=>{console.log("Store:",r.name,"added:",t)}})),o()})))(i,"questions",c).then((()=>{((t,e,n)=>{const o=t.objectStore("topics"),s=o.get(e);o.get(e).onsuccess=t=>{const e=s.result;e.hash=n,e.lastLoaded=new Date,o.put(e).onsuccess=()=>{console.log("Store:",o.name,"set hash:",e)}}})(i,t,r)}))}))},dt=async()=>{await et();const t=new Promise(((t,e)=>{const n=Z.transaction(["config"],"readonly").objectStore("config").get("topics-last-modified");n.onsuccess=e=>{const o=n.result;o?t(o.value):t()}})),e=(n="data/topics.json",fetch(n,{method:"HEAD"}).then((t=>{if(!t.ok)throw Error(`Unable to last modified for: ${n} - ${t.statusText}`);const e=t.headers.get("Last-Modified");if(console.log("url: ",n,"header:",e),e)return new Date(e)})).catch((t=>G.addError("fetchLastModified: "+t))));var n;const[o,s]=await Promise.all([t,e]);console.log("hash store:",o),console.log("hash head:",s),s&&(null!==o||o<s)&&await X("data/topics.json").then((t=>{at(t),(t=>{const e={key:"topics-last-modified",value:t},n=Z.transaction(["config"],"readwrite").objectStore("config");n.put(e).onsuccess=()=>{console.log("Store:",n.name,"set lastModified:",e)}})(s)}))};function ft(t,e,n){const o=t.slice();return o[2]=e[n],o}function pt(t){let e,n,o=t[2]+"";return{c(){e=f("li"),n=p(o)},m(t,o){a(t,e,o),l(e,n)},p(t,e){1&e&&o!==(o=t[2]+"")&&w(n,o)},d(t){t&&u(e)}}}function gt(e){let n,o,s,r,c,i,p,h,w,b=e[0],v=[];for(let t=0;t<b.length;t+=1)v[t]=pt(ft(e,b,t));return{c(){n=f("div"),o=f("h4"),o.textContent="Errors",s=g(),r=f("ul");for(let t=0;t<v.length;t+=1)v[t].c();c=g(),i=f("div"),p=f("button"),p.textContent="Ok",$(o,"class","is-text-danger"),$(p,"class","button"),$(i,"class","buttons"),$(n,"class","card card-shadow block content")},m(t,u){a(t,n,u),l(n,o),l(n,s),l(n,r);for(let t=0;t<v.length;t+=1)v[t].m(r,null);l(n,c),l(n,i),l(i,p),h||(w=m(p,"click",e[1]),h=!0)},p(t,[e]){if(1&e){let n;for(b=t[0],n=0;n<b.length;n+=1){const o=ft(t,b,n);v[n]?v[n].p(o,e):(v[n]=pt(o),v[n].c(),v[n].m(r,null))}for(;n<v.length;n+=1)v[n].d(1);v.length=b.length}},i:t,o:t,d(t){t&&u(n),d(v,t),h=!1,w()}}}function ht(t,e,n){let o;i(t,G,(t=>n(0,o=t)));return[o,()=>{G.resetErrors()}]}class mt extends F{constructor(t){super(),R(this,t,ht,gt,c,{})}}function $t(t){let e,n,o=t[0].desc+"";return{c(){e=f("p"),n=p(o)},m(t,o){a(t,e,o),l(e,n)},p(t,e){1&e&&o!==(o=t[0].desc+"")&&w(n,o)},d(t){t&&u(e)}}}function wt(e){let n,o,s,r,c,i,d,m,$,b,v,x,_,q,y,S,k,C,L,T,E,V,H,j,A,M,P,I,z,D,O,B,N,Q,U,W,R,F,J,K,Y,G,X=e[0].title+"",Z=nt(e[0].lastLoaded)+"",tt=nt(e[0].lastLearned)+"",et=(e[0].hash?e[0].hash:"")+"",ot=e[0].tags.join(", ")+"",st=e[0].desc&&$t(e);return{c(){n=f("h4"),o=p(X),s=g(),r=f("table"),c=f("tr"),i=f("td"),i.textContent="Last loaded",d=g(),m=f("td"),$=p(Z),b=g(),v=f("tr"),x=f("td"),x.textContent="Last learned",_=g(),q=f("td"),y=p(tt),S=g(),k=f("tr"),C=f("td"),C.textContent="Hash",L=g(),T=f("td"),E=p(et),V=g(),H=f("tr"),j=f("td"),j.textContent="Status",A=g(),M=f("td"),P=p(e[1]),I=p("%"),z=g(),D=f("tr"),O=f("td"),O.textContent="Size",B=g(),N=f("td"),Q=p(e[2]),U=g(),W=f("tr"),R=f("td"),R.textContent="Tags",F=g(),J=f("td"),K=p(ot),Y=g(),st&&st.c(),G=h()},m(t,e){a(t,n,e),l(n,o),a(t,s,e),a(t,r,e),l(r,c),l(c,i),l(c,d),l(c,m),l(m,$),l(r,b),l(r,v),l(v,x),l(v,_),l(v,q),l(q,y),l(r,S),l(r,k),l(k,C),l(k,L),l(k,T),l(T,E),l(r,V),l(r,H),l(H,j),l(H,A),l(H,M),l(M,P),l(M,I),l(r,z),l(r,D),l(D,O),l(D,B),l(D,N),l(N,Q),l(r,U),l(r,W),l(W,R),l(W,F),l(W,J),l(J,K),a(t,Y,e),st&&st.m(t,e),a(t,G,e)},p(t,[e]){1&e&&X!==(X=t[0].title+"")&&w(o,X),1&e&&Z!==(Z=nt(t[0].lastLoaded)+"")&&w($,Z),1&e&&tt!==(tt=nt(t[0].lastLearned)+"")&&w(y,tt),1&e&&et!==(et=(t[0].hash?t[0].hash:"")+"")&&w(E,et),2&e&&w(P,t[1]),4&e&&w(Q,t[2]),1&e&&ot!==(ot=t[0].tags.join(", ")+"")&&w(K,ot),t[0].desc?st?st.p(t,e):(st=$t(t),st.c(),st.m(G.parentNode,G)):st&&(st.d(1),st=null)},i:t,o:t,d(t){t&&u(n),t&&u(s),t&&u(r),t&&u(Y),st&&st.d(t),t&&u(G)}}}function bt(t,e,n){let{topic:o}=e,{status:s=0}=e,{size:r=0}=e;return t.$$set=t=>{"topic"in t&&n(0,o=t.topic),"status"in t&&n(1,s=t.status),"size"in t&&n(2,r=t.size)},[o,s,r]}class vt extends F{constructor(t){super(),R(this,t,bt,wt,c,{topic:0,status:1,size:2})}}function xt(t){let e,n,o,s,r,c,i,d,p;return n=new vt({props:{topic:t[0],status:t[1],size:t[2]}}),{c(){e=f("div"),N(n.$$.fragment),o=g(),s=f("div"),r=f("button"),r.textContent="Show",$(r,"class","button"),$(s,"class","buttons"),$(e,"class","card card-shadow content"),$(e,"id",c=t[0].file)},m(c,u){a(c,e,u),Q(n,e,null),l(e,o),l(e,s),l(s,r),i=!0,d||(p=m(r,"click",t[4]),d=!0)},p(t,[o]){const s={};1&o&&(s.topic=t[0]),2&o&&(s.status=t[1]),4&o&&(s.size=t[2]),n.$set(s),(!i||1&o&&c!==(c=t[0].file))&&$(e,"id",c)},i(t){i||(O(n.$$.fragment,t),i=!0)},o(t){B(n.$$.fragment,t),i=!1},d(t){t&&u(e),U(n),d=!1,p()}}}function _t(t,e,n){let{topic:o}=e,s=0,r=0;const c=t=>{Y.setView("ViewTopicInfo",{topic:t})};y((()=>{var t;(t=o.file,new Promise(((e,n)=>{const o=[],s=IDBKeyRange.only(t),r=Z.transaction(["questions"],"readwrite").objectStore("questions"),c=r.index("file").openCursor(s);c.onsuccess=t=>{const n=c.result;if(n){const t=n.value;o.push(t.progress),n.continue()}else console.log("Store:",r.name,"progress values:",o),e(o)}}))).then((t=>{n(1,s=st(t,3)),n(2,r=t.length)}))}));return t.$$set=t=>{"topic"in t&&n(0,o=t.topic)},[o,s,r,c,()=>c(o)]}class qt extends F{constructor(t){super(),R(this,t,_t,xt,c,{topic:0})}}function yt(t,e,n){const o=t.slice();return o[8]=e[n],o}function St(t,e,n){const o=t.slice();return o[11]=e[n],o}function kt(t){let e,n,o,r,c,i,p,h,w=t[1],v=[];for(let e=0;e<w.length;e+=1)v[e]=Ct(St(t,w,e));let x=t[2]&&Lt(t);return{c(){e=f("div"),n=f("label"),n.textContent="Tag Filter",o=g(),r=f("select"),c=f("option"),c.textContent="-- Select --";for(let t=0;t<v.length;t+=1)v[t].c();i=g(),x&&x.c(),$(n,"for","tag-select"),c.__value="",c.value=c.__value,$(r,"id","tag-select"),void 0===t[2]&&V((()=>t[5].call(r))),$(e,"class","block")},m(s,u){a(s,e,u),l(e,n),l(e,o),l(e,r),l(r,c);for(let t=0;t<v.length;t+=1)v[t].m(r,null);b(r,t[2]),l(e,i),x&&x.m(e,null),p||(h=[m(r,"change",t[5]),m(r,"change",t[3])],p=!0)},p(t,n){if(2&n){let e;for(w=t[1],e=0;e<w.length;e+=1){const o=St(t,w,e);v[e]?v[e].p(o,n):(v[e]=Ct(o),v[e].c(),v[e].m(r,null))}for(;e<v.length;e+=1)v[e].d(1);v.length=w.length}6&n&&b(r,t[2]),t[2]?x?x.p(t,n):(x=Lt(t),x.c(),x.m(e,null)):x&&(x.d(1),x=null)},d(t){t&&u(e),d(v,t),x&&x.d(),p=!1,s(h)}}}function Ct(t){let e,n,o,s=t[11]+"";return{c(){e=f("option"),n=p(s),e.__value=o=t[11],e.value=e.__value},m(t,o){a(t,e,o),l(e,n)},p(t,r){2&r&&s!==(s=t[11]+"")&&w(n,s),2&r&&o!==(o=t[11])&&(e.__value=o,e.value=e.__value)},d(t){t&&u(e)}}}function Lt(e){let n,o,s;return{c(){n=f("button"),n.textContent="Show",$(n,"class","button")},m(t,r){a(t,n,r),o||(s=m(n,"click",e[6]),o=!0)},p:t,d(t){t&&u(n),o=!1,s()}}}function Tt(t){let e,n;return e=new qt({props:{topic:t[8]}}),{c(){N(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.topic=t[8]),e.$set(o)},i(t){n||(O(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Et(t){let e,n,o,s=t[1]&&kt(t),r=t[0],c=[];for(let e=0;e<r.length;e+=1)c[e]=Tt(yt(t,r,e));const i=t=>B(c[t],1,1,(()=>{c[t]=null}));return{c(){s&&s.c(),e=g(),n=f("div");for(let t=0;t<c.length;t+=1)c[t].c();$(n,"class","grid grid-4")},m(t,r){s&&s.m(t,r),a(t,e,r),a(t,n,r);for(let t=0;t<c.length;t+=1)c[t].m(n,null);o=!0},p(t,[o]){if(t[1]?s?s.p(t,o):(s=kt(t),s.c(),s.m(e.parentNode,e)):s&&(s.d(1),s=null),1&o){let e;for(r=t[0],e=0;e<r.length;e+=1){const s=yt(t,r,e);c[e]?(c[e].p(s,o),O(c[e],1)):(c[e]=Tt(s),c[e].c(),O(c[e],1),c[e].m(n,null))}for(z(),e=r.length;e<c.length;e+=1)i(e);D()}},i(t){if(!o){for(let t=0;t<r.length;t+=1)O(c[t]);o=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)B(c[t]);o=!1},d(t){s&&s.d(t),t&&u(e),t&&u(n),d(c,t)}}}function Vt(t,e,n){let o,s,{id:r=null}=e,c=[],i=[];var l;y((()=>{new Promise(((t,e)=>{const n=Z.transaction(["topics"],"readonly").objectStore("topics").getAll();n.onsuccess=e=>{t(n.result)}})).then((t=>{c=t,n(0,i=t),n(1,o=(t=>{const e=[];return t.forEach((t=>{t.tags.forEach((t=>{e.includes(t)||e.push(t)}))})),e.sort()})(c))}))})),l=()=>{if(r){const t=document.getElementById(r);t&&t.scrollIntoView()}},q().$$.after_update.push(l);return t.$$set=t=>{"id"in t&&n(4,r=t.id)},[i,o,s,()=>{n(0,i=s?c.filter((t=>t.tags.includes(s))):c)},r,function(){s=v(this),n(2,s),n(1,o)},()=>Y.setView("ViewTagInfo",{tag:s,topics:i})]}class Ht extends F{constructor(t){super(),R(this,t,Vt,Et,c,{id:4})}}class jt{constructor(t,e){this.count=0,this.md=t,this.tag=e}getTag(){return++this.count%2?`<${this.tag}>`:`</${this.tag}>`}check(){if(this.count%2)throw new Error(`Unbalanced tag: ${this.md} count: ${this.count}`);this.count=0}}class At{constructor(){this.map={},this._register("_","u"),this._register("*","b"),this._register("~","i"),this.regex=this._pattern()}_register(t,e){this.map[t]=new jt(t,e)}_pattern(){let t="";for(let e in this.map)t+=e;return new RegExp(`[${t}]`,"g")}tag(t){if(!this.map.hasOwnProperty(t))throw new Error("Unknown element: "+t);return this.map[t].getTag()}_check(){for(let t in this.map)this.map[t].check()}_substitute(t){const e=this;return t.replaceAll(this.regex,(function(t){return e.tag(t)}))}toHtml(t){Array.isArray(t)||(t=[t]);let e=!1,n="";for(let o of t)o.startsWith("- ")?(e||(n+="<ul>",e=!0),n+="<li>"+this._substitute(o.substring(2).trim())+"</li>"):(e?(n+="</ul>",e=!1):""!==n&&(n+="<br />"),n+=this._substitute(o.trim()));return e&&(n+="</ul>"),this._check(),n}}function Mt(t){let e,n,o,s,r,c=t[4].toHtml(t[0].details)+"";return{c(){e=f("div"),n=f("h5"),n.textContent="Details",o=g(),s=f("div"),r=f("p"),$(s,"class","card content is-info")},m(t,i){a(t,e,i),l(e,n),l(e,o),l(e,s),l(s,r),r.innerHTML=c},p(t,e){1&e&&c!==(c=t[4].toHtml(t[0].details)+"")&&(r.innerHTML=c)},d(t){t&&u(e)}}}function Pt(t){let e,n,o,r,c,i,d,h,w,b,v,x,_,q,y,S,k,C,L,T,E,V,H,j,A,M;r=new vt({props:{topic:t[0],status:t[1],size:t[3]}});let P=t[0].details&&Mt(t);return{c(){e=f("div"),n=f("div"),o=f("div"),N(r.$$.fragment),c=g(),i=f("div"),d=f("label"),d.textContent="Number of correct answers",h=g(),w=f("select"),b=f("option"),b.textContent="-- Select --",v=f("option"),v.textContent="Set 0",x=f("option"),x.textContent="Set 1",_=f("option"),_.textContent="Set 2",q=f("option"),q.textContent="Set 3",y=g(),P&&P.c(),S=g(),k=f("div"),C=f("button"),C.textContent="Back",L=g(),T=f("button"),T.textContent="Listing",E=g(),V=f("button"),H=p("Start"),$(o,"class","is-text-left"),$(d,"for","sf-set"),b.__value="",b.value=b.__value,v.__value="0",v.value=v.__value,x.__value="1",x.value=x.__value,_.__value="2",_.value=_.__value,q.__value="3",q.value=q.__value,$(w,"id","sf-set"),$(n,"class","grid grid-4"),$(C,"class","button"),$(T,"class","button"),$(V,"class","button"),V.disabled=t[2],$(k,"class","buttons"),$(e,"class","card card-shadow content")},m(s,u){a(s,e,u),l(e,n),l(n,o),Q(r,o,null),l(n,c),l(n,i),l(i,d),l(i,h),l(i,w),l(w,b),l(w,v),l(w,x),l(w,_),l(w,q),l(n,y),P&&P.m(n,null),l(e,S),l(e,k),l(k,C),l(k,L),l(k,T),l(k,E),l(k,V),l(V,H),j=!0,A||(M=[m(w,"change",t[8]),m(C,"click",t[5]),m(T,"click",t[6]),m(V,"click",t[7])],A=!0)},p(t,[e]){const o={};1&e&&(o.topic=t[0]),2&e&&(o.status=t[1]),8&e&&(o.size=t[3]),r.$set(o),t[0].details?P?P.p(t,e):(P=Mt(t),P.c(),P.m(n,null)):P&&(P.d(1),P=null),(!j||4&e)&&(V.disabled=t[2])},i(t){j||(O(r.$$.fragment,t),j=!0)},o(t){B(r.$$.fragment,t),j=!1},d(t){t&&u(e),U(r),P&&P.d(),A=!1,s(M)}}}function It(t,e,n){let{topic:o}=e,{questions:s=null}=e;const r=new At;let c=0,i=!0,l=0;const a=()=>{if(!s)return;const t=s.map((t=>t.progress));n(1,c=st(t,3)),n(2,i=((t,e)=>{for(let n in t)if(t[n]!==e)return!1;return!0})(t,3)),n(3,l=t.length)};y((async()=>{try{s||(await ut(o.file),console.log("Loading questions for topics"),n(9,s=await it(o)),a())}catch(t){G.addError("ViewTopicInfo: "+t.message)}}));return t.$$set=t=>{"topic"in t&&n(0,o=t.topic),"questions"in t&&n(9,s=t.questions)},[o,c,i,l,r,()=>{Y.setView("ViewTopicList",{id:o.file})},()=>{Y.setView("ViewTopicQuests",{topic:o})},()=>{Y.setView("ViewQuestAnswer",{topic:o})},t=>{const e=t.target;((t,e)=>{const n=IDBKeyRange.only(t),o=Z.transaction(["questions"],"readwrite").objectStore("questions"),s=o.index("file").openCursor(n);s.onsuccess=t=>{const n=s.result;if(n){const t=n.value;t.progress!==e&&(t.progress=e,o.put(t),console.log("Store:",o.name," update:",t.id)),n.continue()}else console.log("Store:",o.name,"set progress done:",e)}})(o.file,e.selectedIndex-1),e.selectedIndex=0,a()},s]}class zt extends F{constructor(t){super(),R(this,t,It,Pt,c,{topic:0,questions:9})}}function Dt(e){let n,o,s,r,c,i,d,h,m,b,v,x,_,q,y,S=e[0].progress+"",k=e[0].total+"",C=e[0].ratio+"";return{c(){n=f("span"),o=p("Progress: "),s=f("span"),r=p(S),c=p(" /\n  "),i=f("span"),i.textContent="3",d=g(),h=f("span"),m=p("Total: "),b=f("span"),v=p(k),x=p(" Wrong:\n    "),_=f("span"),q=p(C),y=p("%"),$(s,"class","is-text-success"),$(i,"class","is-text-success"),$(b,"class","is-text-success"),$(_,"class","is-text-danger"),$(h,"class","hide-sm"),$(n,"class","h6")},m(t,e){a(t,n,e),l(n,o),l(n,s),l(s,r),l(n,c),l(n,i),l(n,d),l(n,h),l(h,m),l(h,b),l(b,v),l(h,x),l(h,_),l(_,q),l(_,y)},p(t,[e]){1&e&&S!==(S=t[0].progress+"")&&w(r,S),1&e&&k!==(k=t[0].total+"")&&w(v,k),1&e&&C!==(C=t[0].ratio+"")&&w(q,C)},i:t,o:t,d(t){t&&u(n)}}}function Ot(t,e,n){let{quest:o}=e;return t.$$set=t=>{"quest"in t&&n(0,o=t.quest)},[o]}class Bt extends F{constructor(t){super(),R(this,t,Ot,Dt,c,{quest:0})}}function Nt(t,e,n){const o=t.slice();return o[3]=e[n],o}function Qt(t){let e,n,o,s,r,c,i,d,h,m,b,v,x,_,q,y,S,k,C=t[3].id+"",L=t[1].toHtml(t[3].quest)+"",T=t[1].toHtml(t[3].answer)+"";return c=new Bt({props:{quest:t[3]}}),{c(){e=f("div"),n=f("div"),o=p("Id: "),s=p(C),r=g(),N(c.$$.fragment),i=g(),d=f("div"),h=f("div"),m=f("p"),v=g(),x=f("div"),_=f("div"),q=f("p"),y=g(),$(n,"class","h6"),$(e,"class","is-flex-spread grid-full"),$(h,"class","content"),$(d,"class",b="card "+t[2]()),$(_,"class","content"),$(x,"class",S="card "+t[2]())},m(t,u){a(t,e,u),l(e,n),l(n,o),l(n,s),l(e,r),Q(c,e,null),a(t,i,u),a(t,d,u),l(d,h),l(h,m),m.innerHTML=L,a(t,v,u),a(t,x,u),l(x,_),l(_,q),q.innerHTML=T,l(x,y),k=!0},p(t,e){(!k||1&e)&&C!==(C=t[3].id+"")&&w(s,C);const n={};1&e&&(n.quest=t[3]),c.$set(n),(!k||1&e)&&L!==(L=t[1].toHtml(t[3].quest)+"")&&(m.innerHTML=L),(!k||1&e)&&T!==(T=t[1].toHtml(t[3].answer)+"")&&(q.innerHTML=T)},i(t){k||(O(c.$$.fragment,t),k=!0)},o(t){B(c.$$.fragment,t),k=!1},d(t){t&&u(e),U(c),t&&u(i),t&&u(d),t&&u(v),t&&u(x)}}}function Ut(t){let e,n,o=t[0],s=[];for(let e=0;e<o.length;e+=1)s[e]=Qt(Nt(t,o,e));const r=t=>B(s[t],1,1,(()=>{s[t]=null}));return{c(){e=f("div");for(let t=0;t<s.length;t+=1)s[t].c();$(e,"class","grid grid-2")},m(t,o){a(t,e,o);for(let t=0;t<s.length;t+=1)s[t].m(e,null);n=!0},p(t,[n]){if(7&n){let c;for(o=t[0],c=0;c<o.length;c+=1){const r=Nt(t,o,c);s[c]?(s[c].p(r,n),O(s[c],1)):(s[c]=Qt(r),s[c].c(),O(s[c],1),s[c].m(e,null))}for(z(),c=o.length;c<s.length;c+=1)r(c);D()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)O(s[t]);n=!0}},o(t){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)B(s[t]);n=!1},d(t){t&&u(e),d(s,t)}}}function Wt(t,e,n){let{questions:o}=e;const s=new At,r=((t,e,n)=>{let o=0;return()=>o++%(2*t)<t?e:n})(2,"is-primary","is-info");return t.$$set=t=>{"questions"in t&&n(0,o=t.questions)},[o,s,r]}class Rt extends F{constructor(t){super(),R(this,t,Wt,Ut,c,{questions:0})}}function Ft(t){let e,n,o,s,r,c,i,d,h,b,v,x=t[0].title+"";return r=new Rt({props:{questions:t[1]}}),{c(){e=f("div"),n=f("h4"),o=p(x),s=g(),N(r.$$.fragment),c=g(),i=f("div"),d=f("button"),d.textContent="Back",$(d,"class","button"),$(i,"class","buttons"),$(e,"class","card card-shadow content")},m(u,f){a(u,e,f),l(e,n),l(n,o),l(e,s),Q(r,e,null),l(e,c),l(e,i),l(i,d),h=!0,b||(v=m(d,"click",t[3]),b=!0)},p(t,[e]){(!h||1&e)&&x!==(x=t[0].title+"")&&w(o,x);const n={};2&e&&(n.questions=t[1]),r.$set(n)},i(t){h||(O(r.$$.fragment,t),h=!0)},o(t){B(r.$$.fragment,t),h=!1},d(t){t&&u(e),U(r),b=!1,v()}}}function Jt(t,e,n){let{topic:o}=e,s=[];y((()=>{it(o).then((t=>{n(1,s=t)}))}));const r=t=>{Y.setView("ViewTopicInfo",{topic:t})};return t.$$set=t=>{"topic"in t&&n(0,o=t.topic)},[o,s,r,()=>r(o)]}class Kt extends F{constructor(t){super(),R(this,t,Jt,Ft,c,{topic:0})}}function Yt(t,e,n){const o=t.slice();return o[7]=e[n],o}function Gt(t){let e,n,o=t[7].title+"";return{c(){e=f("li"),n=p(o)},m(t,o){a(t,e,o),l(e,n)},p(t,e){2&e&&o!==(o=t[7].title+"")&&w(n,o)},d(t){t&&u(e)}}}function Xt(e){let n,o,r,c,i,h,v,x,_,q,y,S,k,C,L,T,E,H,j,A,M,P,I,z=e[1],D=[];for(let t=0;t<z.length;t+=1)D[t]=Gt(Yt(e,z,t));return{c(){n=f("div"),o=f("div"),r=f("div"),c=p("Tag: "),i=p(e[0]),h=g(),v=f("ul");for(let t=0;t<D.length;t+=1)D[t].c();x=g(),_=f("div"),q=f("label"),q.textContent="Number of correct answers",y=g(),S=f("select"),k=f("option"),k.textContent="-- Select --",C=f("option"),C.textContent="Set 0",L=f("option"),L.textContent="Set 1",T=f("option"),T.textContent="Set 2",E=g(),H=f("div"),j=f("button"),j.textContent="Back",A=g(),M=f("button"),M.textContent="Listing",$(r,"class","is-text-left"),$(o,"class","grid grid-4"),$(q,"for","sf-set"),k.__value="-1",k.value=k.__value,C.__value="0",C.value=C.__value,L.__value="1",L.value=L.__value,T.__value="2",T.value=T.__value,$(S,"id","sf-set"),void 0===e[2]&&V((()=>e[6].call(S))),$(j,"class","button"),$(M,"class","button"),$(H,"class","buttons"),$(n,"class","card card-shadow content")},m(t,s){a(t,n,s),l(n,o),l(o,r),l(r,c),l(r,i),l(r,h),l(r,v);for(let t=0;t<D.length;t+=1)D[t].m(v,null);l(n,x),l(n,_),l(_,q),l(_,y),l(_,S),l(S,k),l(S,C),l(S,L),l(S,T),b(S,e[2]),l(n,E),l(n,H),l(H,j),l(H,A),l(H,M),P||(I=[m(S,"change",e[6]),m(j,"click",e[4]),m(M,"click",e[3])],P=!0)},p(t,[e]){if(1&e&&w(i,t[0]),2&e){let n;for(z=t[1],n=0;n<z.length;n+=1){const o=Yt(t,z,n);D[n]?D[n].p(o,e):(D[n]=Gt(o),D[n].c(),D[n].m(v,null))}for(;n<D.length;n+=1)D[n].d(1);D.length=z.length}4&e&&b(S,t[2])},i:t,o:t,d(t){t&&u(n),d(D,t),P=!1,s(I)}}}function Zt(t,e,n){let o,{tag:s}=e,{topics:r}=e,{questions:c=null}=e;return y((async()=>{try{if(!c){const t=[];r.forEach((e=>{t.push(ut(e.file))})),await Promise.all(t),console.log("Loading questions for topics"),n(5,c=await(async(t,e)=>{const n=Z.transaction(["questions"],"readonly").objectStore("questions");let o=[];return t.forEach((t=>{o.push(lt(n,t))})),Promise.all(o).then((t=>{let n=[].concat(...t);return n.sort(((t,e)=>e.ratio-t.ratio)),n.splice(0,e)}))})(r,30))}}catch(t){G.addError("ViewTagInfo: "+t.message)}})),t.$$set=t=>{"tag"in t&&n(0,s=t.tag),"topics"in t&&n(1,r=t.topics),"questions"in t&&n(5,c=t.questions)},[s,r,o,()=>{Y.setView("ViewTagQuests",{tag:s,topics:r,questions:c})},()=>{Y.setView("ViewTopicList")},c,function(){o=v(this),n(2,o)}]}class te extends F{constructor(t){super(),R(this,t,Zt,Xt,c,{tag:0,topics:1,questions:5})}}function ee(t){let e,n,o,s,r,c,i,d,h,b,v,x;return c=new Rt({props:{questions:t[1]}}),{c(){e=f("div"),n=f("h4"),o=p("Tag: "),s=p(t[0]),r=g(),N(c.$$.fragment),i=g(),d=f("div"),h=f("button"),h.textContent="Back",$(h,"class","button"),$(d,"class","buttons"),$(e,"class","card card-shadow content")},m(u,f){a(u,e,f),l(e,n),l(n,o),l(n,s),l(e,r),Q(c,e,null),l(e,i),l(e,d),l(d,h),b=!0,v||(x=m(h,"click",t[4]),v=!0)},p(t,[e]){(!b||1&e)&&w(s,t[0]);const n={};2&e&&(n.questions=t[1]),c.$set(n)},i(t){b||(O(c.$$.fragment,t),b=!0)},o(t){B(c.$$.fragment,t),b=!1},d(t){t&&u(e),U(c),v=!1,x()}}}function ne(t,e,n){let{tag:o}=e,{topics:s}=e,{questions:r=[]}=e;const c=()=>{Y.setView("ViewTagInfo",{tag:o,topics:s,questions:r})};return t.$$set=t=>{"tag"in t&&n(0,o=t.tag),"topics"in t&&n(3,s=t.topics),"questions"in t&&n(1,r=t.questions)},[o,r,c,s,()=>c()]}class oe extends F{constructor(t){super(),R(this,t,ne,ee,c,{tag:0,topics:3,questions:1})}}function se(e){let n,o,s,r,c,i,d,h,m,b,v,x,_,q,y,S,k,C,L,T,E,V,H,j,A=e[0][0]+"",M=e[0][1]+"",P=e[0][2]+"",I=e[0][3]+"";return{c(){n=f("table"),o=f("tr"),s=f("td"),s.textContent="No correct Answers",r=g(),c=f("td"),i=p(A),d=g(),h=f("tr"),m=f("td"),m.textContent="One correct Answer",b=g(),v=f("td"),x=p(M),_=g(),q=f("tr"),y=f("td"),y.textContent="Two correct Answers",S=g(),k=f("td"),C=p(P),L=g(),T=f("tr"),E=f("td"),E.textContent="Learned",V=g(),H=f("td"),j=p(I),$(n,"class","table hide-md")},m(t,e){a(t,n,e),l(n,o),l(o,s),l(o,r),l(o,c),l(c,i),l(n,d),l(n,h),l(h,m),l(h,b),l(h,v),l(v,x),l(n,_),l(n,q),l(q,y),l(q,S),l(q,k),l(k,C),l(n,L),l(n,T),l(T,E),l(T,V),l(T,H),l(H,j)},p(t,[e]){1&e&&A!==(A=t[0][0]+"")&&w(i,A),1&e&&M!==(M=t[0][1]+"")&&w(x,M),1&e&&P!==(P=t[0][2]+"")&&w(C,P),1&e&&I!==(I=t[0][3]+"")&&w(j,I)},i:t,o:t,d(t){t&&u(n)}}}function re(t,e,n){let{statistic:o=[0,0,0,0]}=e;return t.$$set=t=>{"statistic"in t&&n(0,o=t.statistic)},[o]}class ce extends F{constructor(t){super(),R(this,t,re,se,c,{statistic:0})}}function ie(t){let e,n=t[3].toHtml(t[1].details)+"";return{c(){e=f("p")},m(t,o){a(t,e,o),e.innerHTML=n},p(t,o){2&o&&n!==(n=t[3].toHtml(t[1].details)+"")&&(e.innerHTML=n)},d(t){t&&u(e)}}}function le(t){let e,n,o,s,r,c,i,d,h,m,b,v,x,_,q,y,S,k,C,L=t[0].id+"",T=t[3].toHtml(t[0].quest)+"",E=t[3].toHtml(t[0].answer)+"";d=new Bt({props:{quest:t[0]}});let V=t[1].details&&ie(t);return{c(){e=f("div"),n=f("div"),o=f("div"),s=f("div"),r=p("Question: "),c=p(L),i=g(),N(d.$$.fragment),h=g(),m=f("div"),b=f("p"),v=g(),x=f("div"),_=f("h5"),_.textContent="Answer",q=g(),y=f("div"),S=f("p"),k=g(),V&&V.c(),$(s,"class","h5"),$(o,"class","is-flex-spread block"),$(m,"class","card content is-primary"),$(y,"class","card content is-info"),x.hidden=t[2],$(e,"class","grid grid-2")},m(t,u){a(t,e,u),l(e,n),l(n,o),l(o,s),l(s,r),l(s,c),l(o,i),Q(d,o,null),l(n,h),l(n,m),l(m,b),b.innerHTML=T,l(e,v),l(e,x),l(x,_),l(x,q),l(x,y),l(y,S),S.innerHTML=E,l(y,k),V&&V.m(y,null),C=!0},p(t,[e]){(!C||1&e)&&L!==(L=t[0].id+"")&&w(c,L);const n={};1&e&&(n.quest=t[0]),d.$set(n),(!C||1&e)&&T!==(T=t[3].toHtml(t[0].quest)+"")&&(b.innerHTML=T),(!C||1&e)&&E!==(E=t[3].toHtml(t[0].answer)+"")&&(S.innerHTML=E),t[1].details?V?V.p(t,e):(V=ie(t),V.c(),V.m(y,null)):V&&(V.d(1),V=null),(!C||4&e)&&(x.hidden=t[2])},i(t){C||(O(d.$$.fragment,t),C=!0)},o(t){B(d.$$.fragment,t),C=!1},d(t){t&&u(e),U(d),V&&V.d()}}}function ae(t,e,n){let{quest:o}=e,{topic:s}=e,{hideAnswer:r}=e;const c=new At;return t.$$set=t=>{"quest"in t&&n(0,o=t.quest),"topic"in t&&n(1,s=t.topic),"hideAnswer"in t&&n(2,r=t.hideAnswer)},[o,s,r,c]}class ue extends F{constructor(t){super(),R(this,t,ae,le,c,{quest:0,topic:1,hideAnswer:2})}}function de(t){let e,n,o,r,c,i,d,h,b,v,x,_,q,y,S,k,C,L,T,E,V,H,j,A,M,P,I=t[0].title+"";return c=new ce({props:{statistic:t[1]}}),d=new ue({props:{topic:t[0],quest:t[3],hideAnswer:t[2]}}),{c(){e=f("div"),n=f("h4"),o=p(I),r=g(),N(c.$$.fragment),i=g(),N(d.$$.fragment),h=g(),b=f("div"),v=f("button"),x=p("Show"),q=g(),y=f("button"),S=p("Correct"),k=g(),C=f("button"),L=p("Wrong"),T=g(),E=f("button"),V=p("Skip"),H=g(),j=f("button"),j.textContent="Stop",$(v,"class","button"),v.hidden=_=!t[2],$(y,"class","button is-success"),y.hidden=t[2],$(C,"class","button is-danger"),C.hidden=t[2],$(E,"class","button is-warning"),E.hidden=t[2],$(j,"class","button"),$(b,"class","buttons"),$(e,"class","card card-shadow content")},m(s,u){a(s,e,u),l(e,n),l(n,o),l(e,r),Q(c,e,null),l(e,i),Q(d,e,null),l(e,h),l(e,b),l(b,v),l(v,x),l(b,q),l(b,y),l(y,S),l(b,k),l(b,C),l(C,L),l(b,T),l(b,E),l(E,V),l(b,H),l(b,j),A=!0,M||(P=[m(v,"click",t[6]),m(y,"click",t[7]),m(C,"click",t[8]),m(E,"click",t[9]),m(j,"click",t[5])],M=!0)},p(t,e){(!A||1&e)&&I!==(I=t[0].title+"")&&w(o,I);const n={};2&e&&(n.statistic=t[1]),c.$set(n);const s={};1&e&&(s.topic=t[0]),8&e&&(s.quest=t[3]),4&e&&(s.hideAnswer=t[2]),d.$set(s),(!A||4&e&&_!==(_=!t[2]))&&(v.hidden=_),(!A||4&e)&&(y.hidden=t[2]),(!A||4&e)&&(C.hidden=t[2]),(!A||4&e)&&(E.hidden=t[2])},i(t){A||(O(c.$$.fragment,t),O(d.$$.fragment,t),A=!0)},o(t){B(c.$$.fragment,t),B(d.$$.fragment,t),A=!1},d(t){t&&u(e),U(c),U(d),M=!1,s(P)}}}function fe(t){let e,n,o=t[3]&&de(t);return{c(){o&&o.c(),e=h()},m(t,s){o&&o.m(t,s),a(t,e,s),n=!0},p(t,[n]){t[3]?o?(o.p(t,n),8&n&&O(o,1)):(o=de(t),o.c(),O(o,1),o.m(e.parentNode,e)):o&&(z(),B(o,1,1,(()=>{o=null})),D())},i(t){n||(O(o),n=!0)},o(t){B(o),n=!1},d(t){o&&o.d(t),t&&u(e)}}}function pe(t,e,n){let o,{topic:s}=e;new At;let r,c,i,l=!0;const a=t=>{if(void 0===t)return c.push(i),void u();((t,e)=>{e?t.progress++:(t.progress=0,t.failed++),t.total++,t.ratio=rt(t.failed,t.total)})(i,t),(t=>new Promise(((e,n)=>{const o=Z.transaction(["questions"],"readwrite").objectStore("questions");o.put(t).onsuccess=n=>{console.log("Store:",o.name," update:",t),e()}})))(i).then((()=>{i.progress<3&&c.push(i),0===c.length&&d(),u()}))},u=()=>{n(3,i=c.shift()),console.log("next",i),n(1,o=(t=>{const e=[0,0,0,0];return t.forEach((t=>{e[t.progress]++})),e})(r)),n(2,l=!0)};y((()=>{it(s).then((t=>{r=t,c=r.filter((t=>t.progress<3)),(t=>{for(let o=0;o<t.length;o++){let s=(e=0,n=t.length-1,Math.floor(Math.random()*(n-e+1)+e));if(o===s)continue;let r=t[o];t[o]=t[s],t[s]=r}var e,n})(c),u()}))}));const d=()=>{(t=>{const e=Z.transaction(["topics","questions"],"readwrite").objectStore("topics"),n=e.get(t);e.get(t).onsuccess=t=>{const o=n.result;o.lastLearned=new Date,e.put(o).onsuccess=()=>{console.log("Store:",e.name,"update lastLearned:",o)}}})(s.file),Y.setView("ViewTopicList",{id:s.file})};return t.$$set=t=>{"topic"in t&&n(0,s=t.topic)},[s,o,l,i,a,d,()=>n(2,l=!1),()=>a(!0),()=>a(!1),()=>a()]}class ge extends F{constructor(t){super(),R(this,t,pe,fe,c,{topic:0})}}function he(t){let e,n;return e=new mt({}),{c(){N(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(O(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function me(t){let n,o,s,r,c,i,d,p,h,m=0!==t[0].length&&he();const w=[t[1].props];var b=t[1].component;function v(t){let n={};for(let t=0;t<w.length;t+=1)n=e(n,w[t]);return{props:n}}return b&&(i=new b(v())),{c(){n=f("div"),o=f("h2"),o.textContent="Cards",s=g(),m&&m.c(),r=g(),c=f("div"),i&&N(i.$$.fragment),d=g(),p=f("div"),p.innerHTML='<div class="is-text-right">by Volker Senkel 2021</div>',$(c,"id","main"),$(c,"class","block"),$(p,"class","block"),$(n,"class","container")},m(t,e){a(t,n,e),l(n,o),l(n,s),m&&m.m(n,null),l(n,r),l(n,c),i&&Q(i,c,null),l(n,d),l(n,p),h=!0},p(t,[e]){0!==t[0].length?m?1&e&&O(m,1):(m=he(),m.c(),O(m,1),m.m(n,r)):m&&(z(),B(m,1,1,(()=>{m=null})),D());const o=2&e?function(t,e){const n={},o={},s={$$scope:1};let r=t.length;for(;r--;){const c=t[r],i=e[r];if(i){for(const t in c)t in i||(o[t]=1);for(const t in i)s[t]||(n[t]=i[t],s[t]=1);t[r]=i}else for(const t in c)s[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(w,[(s=t[1].props,"object"==typeof s&&null!==s?s:{})]):{};var s;if(b!==(b=t[1].component)){if(i){z();const t=i;B(t.$$.fragment,1,0,(()=>{U(t,1)})),D()}b?(i=new b(v()),N(i.$$.fragment),O(i.$$.fragment,1),Q(i,c,null)):i=null}else b&&i.$set(o)},i(t){h||(O(m),i&&O(i.$$.fragment,t),h=!0)},o(t){B(m),i&&B(i.$$.fragment,t),h=!1},d(t){t&&u(n),m&&m.d(),i&&U(i)}}}function $e(t,e,n){let o,s;return i(t,G,(t=>n(0,o=t))),i(t,Y,(t=>n(1,s=t))),y((()=>{try{(async()=>{if("serviceWorker"in navigator){const t=await navigator.serviceWorker.register("service-worker.js");console.log("Registration of serivce worker done - scope:",t.scope)}})()}catch(t){G.addError("App onMount(): "+t)}Y.views={ViewTopicList:{component:Ht},ViewTopicInfo:{component:zt},ViewTopicQuests:{component:Kt},ViewTagInfo:{component:te},ViewTagQuests:{component:oe},ViewQuestAnswer:{component:ge}},dt().then((()=>{Y.setView("ViewTopicList")}))})),[o,s]}return new class extends F{constructor(t){super(),R(this,t,$e,me,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
