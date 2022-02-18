var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function s(t){t.forEach(n)}function r(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function l(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function g(){return p(" ")}function h(){return p("")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function w(t,e){t.value=null==e?"":e}function v(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}t.selectedIndex=-1}function x(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}let _;function q(t){_=t}function S(){if(!_)throw new Error("Function called outside component initialization");return _}function k(t){S().$$.on_mount.push(t)}const y=[],T=[],C=[],E=[],V=Promise.resolve();let L=!1;function j(t){C.push(t)}const A=new Set;let H=0;function M(){const t=_;do{for(;H<y.length;){const t=y[H];H++,q(t),I(t.$$)}for(q(null),y.length=0,H=0;T.length;)T.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];A.has(e)||(A.add(e),e())}C.length=0}while(y.length);for(;E.length;)E.pop()();L=!1,A.clear(),q(t)}function I(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(j)}}const N=new Set;let P;function O(){P={r:0,c:[],p:P}}function G(){P.r||s(P.c),P=P.p}function B(t,e){t&&t.i&&(N.delete(t),t.i(e))}function z(t,e,n,o){if(t&&t.o){if(N.has(t))return;N.add(t),P.c.push((()=>{N.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function Q(t){t&&t.c()}function D(t,e,o,i){const{fragment:c,on_mount:l,on_destroy:a,after_update:u}=t.$$;c&&c.m(e,o),i||j((()=>{const e=l.map(n).filter(r);a?a.push(...e):s(e),t.$$.on_mount=[]})),u.forEach(j)}function R(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function F(t,e){-1===t.$$.dirty[0]&&(y.push(t),L||(L=!0,V.then(M)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function J(e,n,r,i,c,l,a,d=[-1]){const f=_;q(e);const p=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:o(),dirty:d,skip_bound:!1,root:n.target||f.$$.root};a&&a(p.root);let g=!1;if(p.ctx=r?r(e,n.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return p.ctx&&c(p.ctx[t],p.ctx[t]=s)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](s),g&&F(e,t)),n})):[],p.update(),g=!0,s(p.before_update),p.fragment=!!i&&i(p.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);p.fragment&&p.fragment.l(t),t.forEach(u)}else p.fragment&&p.fragment.c();n.intro&&B(e.$$.fragment),D(e,n.target,n.anchor,n.customElement),M()}q(f)}class U{$destroy(){R(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const W=[];function K(e,n=t){let o;const s=new Set;function r(t){if(i(e,t)&&(e=t,o)){const t=!W.length;for(const t of s)t[1](),W.push(t,e);if(t){for(let t=0;t<W.length;t+=2)W[t][0](W[t+1]);W.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(i,c=t){const l=[i,c];return s.add(l),1===s.size&&(o=n(r)||t),i(e),()=>{s.delete(l),0===s.size&&(o(),o=null)}}}}const Y=(()=>{const{subscribe:t,set:e,update:n}=K({component:""});return{views:{},subscribe:t,setView:(t,n)=>{const o=Y.views[t];o.props=n,e(o)}}})(),X=(()=>{const{subscribe:t,set:e,update:n}=K([]);return{subscribe:t,addError:t=>{console.log("Added error:",t),n((e=>(e.push(t),e)))},resetErrors:()=>{e([])}}})();let Z;const tt=t=>{X.addError(t.type)},et=()=>new Promise(((t,e)=>{const n=indexedDB.open("s-card",2);n.onupgradeneeded=t=>{Z=n.result,t.oldVersion<2&&(t=>{if(Z.objectStoreNames.contains("topics")||Z.createObjectStore("topics",{keyPath:"file"}),!Z.objectStoreNames.contains("questions")){const t=Z.createObjectStore("questions",{keyPath:"id",autoIncrement:!0});t.indexNames.contains("file")||t.createIndex("file","file",{unique:!1})}Z.objectStoreNames.contains("hash")||(Z.createObjectStore("hash",{keyPath:"file"}).transaction.oncomplete=()=>{console.log("Upgrade completed!")});Z.objectStoreNames.contains("config")&&Z.deleteObjectStore("config")})()},n.onerror=tt,n.onsuccess=e=>{Z=n.result,Z.onerror=tt,console.log("db init success!"),t()}})),nt=(t,e)=>{const n=t.delete(e);n.onsuccess=n=>{console.log("Store:",t.name,"delete:",e)},n.onerror=n=>{console.log("Store:",t.name,"delete:",e,"error",n)}},ot=(t,e)=>{const n=t.put(e);n.onsuccess=n=>{console.log("Store:",t.name,"put:",e)},n.onerror=n=>{console.log("Store:",t.name,"put:",e,"error",n)}},st=t=>new Promise(((e,n)=>{const o=Z.transaction(["hash"],"readonly").objectStore("hash"),s=o.get(t);s.onsuccess=n=>{const r=s.result?s.result:{file:t};console.log("Store:",o.name,"get:",r),X.addError("got hash: "+r),e(r)},s.onerror=e=>{console.log("Store:",o.name,"get:",t,"error",e),X.addError("got hash failed: "+e),n()}})),rt=(t,e)=>{const n=t.objectStore("hash");nt(n,e)},it=t=>{if(!t)return"";const e=t.getDate()>9?t.getDate():"0"+t.getDate(),n=t.getMonth()+1,o=n>9?n:"0"+n,s=t.getHours()>9?t.getHours():"0"+t.getHours(),r=t.getMinutes()>9?t.getMinutes():"0"+t.getMinutes();return`${e}.${o}.${t.getFullYear()} ${s}:${r}`},ct=(t,e)=>{const n=new Map;return t.forEach((t=>{if(!t.hasOwnProperty(e))throw new Error(`Object has no property: ${e}`);const o=t[e];if(n.has(o))throw new Error(`Duplicate key: ${e}`);n.set(o,t)})),n},lt=(t,e)=>{const n=e||[];return(t||[]).toString()===n.toString()},at=(t,e)=>{if(!e)return 0;const n=100*t/e;return Math.round(n)},ut=(t,e)=>((t,e,n,o)=>new Promise(((s,r)=>{const i=t.objectStore(e),c=i.index(n).getAllKeys(o);c.onsuccess=t=>{c.result.forEach((t=>{nt(i,t)})),s()}})))(t,"questions","file",e),dt=t=>{const e=Z.transaction(["questions"],"readonly").objectStore("questions");return ft(e,t)},ft=(t,e)=>new Promise(((n,o)=>{const s=t.index("file").getAll(e.file);s.onsuccess=t=>{n(s.result)}})),pt=async(t,e)=>{const n=Z.transaction(["questions"],"readwrite").objectStore("questions"),o=t.map((t=>(t.progress=e,new Promise(((e,o)=>{n.put(t).onsuccess=t=>{e()}})))));await Promise.all(o)},gt=(t,e,n)=>{const o=t.objectStore("questions"),s=o.index("file").getAll(e);s.onsuccess=t=>{const r=ct(n,"id"),i=ct(s.result,"id");i.forEach((t=>{r.has(t.id)||nt(o,t.id)})),r.forEach((t=>{i.has(t.id)?(((t,e)=>{if(t.id!==e.id)throw Error(`Unable to copy question parts: ${t.id} - ${e.id}`);e.file=t.file,e.total=t.total,e.failed=t.failed,e.ratio=t.ratio,e.progress=t.progress})(i.get(t.id),t),ot(o,t)):(((t,e)=>{t.file=e,t.total=0,t.failed=0,t.ratio=0,t.progress=0})(t,e),((t,e)=>{const n=t.add(e);n.onsuccess=n=>{console.log("Store:",t.name,"add:",e)},n.onerror=n=>{console.log("Store:",t.name,"add:",e,"error",n)}})(o,t))}))}},ht=(t,e)=>{const n=t.objectStore("topics");nt(n,e)},mt=t=>{const e=Z.transaction(["topics","questions","hash"],"readwrite"),n=e.objectStore("topics"),o=n.getAll();o.onsuccess=s=>{const r=ct(o.result,"file"),i=t.map((t=>t.file));for(let t of r.keys())i.includes(t)||(ht(e,t),rt(e,t),ut(e,t));t.forEach((t=>{((t,e)=>!e||(e.lastLearned&&(t.lastLearned=e.lastLearned),t.title!==e.title||t.desc!==e.desc||!lt(t.tags,e.tags)||!lt(t.details,e.details)))(t,r.get(t.file))&&ot(n,t)}))}},$t=async t=>{const e={Accept:"application/vnd.github.v3+json"};let n=await st(t);X.addError("hash: "+n),n.value&&(e["If-None-Match"]='"'+n.value+'"');const o="https://api.github.com/repos/dead-end/cards-russian/contents/"+t,s=await fetch(o,{headers:e});if(304===s.status)return console.log("File is up to date:",t),void X.addError("File is up to date:");if(!s.ok)return void X.addError(`githubGetJson - url: ${o} error: ${s.statusText}`);const r=await s.json();let i;try{i=JSON.parse((c=r.content,decodeURIComponent(escape(window.atob(c)))))}catch(t){return void X.addError(`githubGetJson - url: ${o} unable to parse data: ${t}`)}var c;return n.value=r.sha,n.lastLoaded=new Date,await(t=>new Promise(((e,n)=>{const o=Z.transaction(["hash"],"readwrite").objectStore("hash"),s=o.put(t);s.onsuccess=n=>{console.log("Store:",o.name,"put:",t),e()},s.onerror=e=>{console.log("Store:",o.name,"put:",t,"error",e),n()}})))(n),console.log("githubGetJson",i),i},bt=async t=>{const e=await $t(t);if(e){const n=Z.transaction(["questions"],"readwrite");gt(n,t,e)}};function wt(t,e,n){const o=t.slice();return o[2]=e[n],o}function vt(t){let e,n,o=t[2]+"";return{c(){e=f("li"),n=p(o)},m(t,o){a(t,e,o),l(e,n)},p(t,e){1&e&&o!==(o=t[2]+"")&&b(n,o)},d(t){t&&u(e)}}}function xt(e){let n,o,s,r,i,c,p,h,b,w=e[0],v=[];for(let t=0;t<w.length;t+=1)v[t]=vt(wt(e,w,t));return{c(){n=f("div"),o=f("h4"),o.textContent="Errors",s=g(),r=f("ul");for(let t=0;t<v.length;t+=1)v[t].c();i=g(),c=f("div"),p=f("button"),p.textContent="Ok",$(o,"class","is-text-danger"),$(p,"class","button"),$(c,"class","buttons"),$(n,"class","card card-shadow block content")},m(t,u){a(t,n,u),l(n,o),l(n,s),l(n,r);for(let t=0;t<v.length;t+=1)v[t].m(r,null);l(n,i),l(n,c),l(c,p),h||(b=m(p,"click",e[1]),h=!0)},p(t,[e]){if(1&e){let n;for(w=t[0],n=0;n<w.length;n+=1){const o=wt(t,w,n);v[n]?v[n].p(o,e):(v[n]=vt(o),v[n].c(),v[n].m(r,null))}for(;n<v.length;n+=1)v[n].d(1);v.length=w.length}},i:t,o:t,d(t){t&&u(n),d(v,t),h=!1,b()}}}function _t(t,e,n){let o;c(t,X,(t=>n(0,o=t)));return[o,()=>{X.resetErrors()}]}class qt extends U{constructor(t){super(),J(this,t,_t,xt,i,{})}}function St(t){let e,n,o,s,r,i,c,d,m,$,w,v,x,_,q=t[4]&&kt(t);return{c(){e=f("tr"),n=f("td"),n.textContent="Questions",o=g(),s=f("td"),r=p(t[2]),i=g(),c=f("tr"),d=f("td"),d.textContent="Status",m=g(),$=f("td"),w=p(t[1]),v=p("%"),x=g(),q&&q.c(),_=h()},m(t,u){a(t,e,u),l(e,n),l(e,o),l(e,s),l(s,r),a(t,i,u),a(t,c,u),l(c,d),l(c,m),l(c,$),l($,w),l($,v),a(t,x,u),q&&q.m(t,u),a(t,_,u)},p(t,e){4&e&&b(r,t[2]),2&e&&b(w,t[1]),t[4]?q?q.p(t,e):(q=kt(t),q.c(),q.m(_.parentNode,_)):q&&(q.d(1),q=null)},d(t){t&&u(e),t&&u(i),t&&u(c),t&&u(x),q&&q.d(t),t&&u(_)}}}function kt(t){let e,n,o,s,r,i,c,d,h,m,$,w=it(t[4].lastLoaded)+"",v=(t[4].value?t[4].value:"")+"";return{c(){e=f("tr"),n=f("td"),n.textContent="Last loaded",o=g(),s=f("td"),r=p(w),i=g(),c=f("tr"),d=f("td"),d.textContent="Hash",h=g(),m=f("td"),$=p(v)},m(t,u){a(t,e,u),l(e,n),l(e,o),l(e,s),l(s,r),a(t,i,u),a(t,c,u),l(c,d),l(c,h),l(c,m),l(m,$)},p(t,e){16&e&&w!==(w=it(t[4].lastLoaded)+"")&&b(r,w),16&e&&v!==(v=(t[4].value?t[4].value:"")+"")&&b($,v)},d(t){t&&u(e),t&&u(i),t&&u(c)}}}function yt(t){let e,n,o=t[0].desc+"";return{c(){e=f("p"),n=p(o)},m(t,o){a(t,e,o),l(e,n)},p(t,e){1&e&&o!==(o=t[0].desc+"")&&b(n,o)},d(t){t&&u(e)}}}function Tt(e){let n,o,s,r,i,c,d,m,$,w,v,x,_,q,S,k,y,T,C=e[0].title+"",E=it(e[0].lastLearned)+"",V=e[0].tags.join(", ")+"",L=e[3]&&St(e),j=e[0].desc&&yt(e);return{c(){n=f("h4"),o=p(C),s=g(),r=f("table"),i=f("tr"),c=f("td"),c.textContent="Last learned",d=g(),m=f("td"),$=p(E),w=g(),v=f("tr"),x=f("td"),x.textContent="Tags",_=g(),q=f("td"),S=p(V),k=g(),L&&L.c(),y=g(),j&&j.c(),T=h()},m(t,e){a(t,n,e),l(n,o),a(t,s,e),a(t,r,e),l(r,i),l(i,c),l(i,d),l(i,m),l(m,$),l(r,w),l(r,v),l(v,x),l(v,_),l(v,q),l(q,S),l(r,k),L&&L.m(r,null),a(t,y,e),j&&j.m(t,e),a(t,T,e)},p(t,[e]){1&e&&C!==(C=t[0].title+"")&&b(o,C),1&e&&E!==(E=it(t[0].lastLearned)+"")&&b($,E),1&e&&V!==(V=t[0].tags.join(", ")+"")&&b(S,V),t[3]?L?L.p(t,e):(L=St(t),L.c(),L.m(r,null)):L&&(L.d(1),L=null),t[0].desc?j?j.p(t,e):(j=yt(t),j.c(),j.m(T.parentNode,T)):j&&(j.d(1),j=null)},i:t,o:t,d(t){t&&u(n),t&&u(s),t&&u(r),L&&L.d(),t&&u(y),j&&j.d(t),t&&u(T)}}}function Ct(t,e,n){let o,{topic:s}=e,{status:r=0}=e,{size:i=0}=e,{details:c=!0}=e;return k((async()=>{c&&n(4,o=await st(s.file))})),t.$$set=t=>{"topic"in t&&n(0,s=t.topic),"status"in t&&n(1,r=t.status),"size"in t&&n(2,i=t.size),"details"in t&&n(3,c=t.details)},[s,r,i,c,o]}class Et extends U{constructor(t){super(),J(this,t,Ct,Tt,i,{topic:0,status:1,size:2,details:3})}}function Vt(t){let e,n,o,s,r,i,c,d,p;return n=new Et({props:{topic:t[0],details:!1}}),{c(){e=f("div"),Q(n.$$.fragment),o=g(),s=f("div"),r=f("button"),r.textContent="Show",$(r,"class","button"),$(s,"class","buttons"),$(e,"class","card card-shadow content"),$(e,"id",i=t[0].file)},m(i,u){a(i,e,u),D(n,e,null),l(e,o),l(e,s),l(s,r),c=!0,d||(p=m(r,"click",t[2]),d=!0)},p(t,[o]){const s={};1&o&&(s.topic=t[0]),n.$set(s),(!c||1&o&&i!==(i=t[0].file))&&$(e,"id",i)},i(t){c||(B(n.$$.fragment,t),c=!0)},o(t){z(n.$$.fragment,t),c=!1},d(t){t&&u(e),R(n),d=!1,p()}}}function Lt(t,e,n){let{topic:o}=e;const s=t=>{Y.setView("ViewTopicInfo",{topic:t})};return t.$$set=t=>{"topic"in t&&n(0,o=t.topic)},[o,s,()=>s(o)]}class jt extends U{constructor(t){super(),J(this,t,Lt,Vt,i,{topic:0})}}function At(t,e,n){const o=t.slice();return o[9]=e[n],o}function Ht(t,e,n){const o=t.slice();return o[12]=e[n],o}function Mt(t){let e,n,o,r,i,c,p,h,b,w,x,_=t[1],q=[];for(let e=0;e<_.length;e+=1)q[e]=It(Ht(t,_,e));let S=t[2]&&Nt(t);return{c(){e=f("div"),n=f("label"),n.textContent="Tag Filter",o=g(),r=f("select"),i=f("option"),i.textContent="-- Select --";for(let t=0;t<q.length;t+=1)q[t].c();c=g(),p=f("div"),S&&S.c(),h=g(),b=f("button"),b.textContent="Translate",$(n,"for","tag-select"),i.__value="",i.value=i.__value,$(r,"id","tag-select"),void 0===t[2]&&j((()=>t[5].call(r))),$(e,"class","block"),$(b,"class","button"),$(p,"class","buttons")},m(s,u){a(s,e,u),l(e,n),l(e,o),l(e,r),l(r,i);for(let t=0;t<q.length;t+=1)q[t].m(r,null);v(r,t[2]),a(s,c,u),a(s,p,u),S&&S.m(p,null),l(p,h),l(p,b),w||(x=[m(r,"change",t[5]),m(r,"change",t[3]),m(b,"click",t[7])],w=!0)},p(t,e){if(2&e){let n;for(_=t[1],n=0;n<_.length;n+=1){const o=Ht(t,_,n);q[n]?q[n].p(o,e):(q[n]=It(o),q[n].c(),q[n].m(r,null))}for(;n<q.length;n+=1)q[n].d(1);q.length=_.length}6&e&&v(r,t[2]),t[2]?S?S.p(t,e):(S=Nt(t),S.c(),S.m(p,h)):S&&(S.d(1),S=null)},d(t){t&&u(e),d(q,t),t&&u(c),t&&u(p),S&&S.d(),w=!1,s(x)}}}function It(t){let e,n,o,s=t[12]+"";return{c(){e=f("option"),n=p(s),e.__value=o=t[12],e.value=e.__value},m(t,o){a(t,e,o),l(e,n)},p(t,r){2&r&&s!==(s=t[12]+"")&&b(n,s),2&r&&o!==(o=t[12])&&(e.__value=o,e.value=e.__value)},d(t){t&&u(e)}}}function Nt(e){let n,o,s;return{c(){n=f("button"),n.textContent="Show",$(n,"class","button")},m(t,r){a(t,n,r),o||(s=m(n,"click",e[6]),o=!0)},p:t,d(t){t&&u(n),o=!1,s()}}}function Pt(t){let e,n;return e=new jt({props:{topic:t[9]}}),{c(){Q(e.$$.fragment)},m(t,o){D(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.topic=t[9]),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){R(e,t)}}}function Ot(t){let e,n,o,s=t[1]&&Mt(t),r=t[0],i=[];for(let e=0;e<r.length;e+=1)i[e]=Pt(At(t,r,e));const c=t=>z(i[t],1,1,(()=>{i[t]=null}));return{c(){s&&s.c(),e=g(),n=f("div");for(let t=0;t<i.length;t+=1)i[t].c();$(n,"class","grid grid-4")},m(t,r){s&&s.m(t,r),a(t,e,r),a(t,n,r);for(let t=0;t<i.length;t+=1)i[t].m(n,null);o=!0},p(t,[o]){if(t[1]?s?s.p(t,o):(s=Mt(t),s.c(),s.m(e.parentNode,e)):s&&(s.d(1),s=null),1&o){let e;for(r=t[0],e=0;e<r.length;e+=1){const s=At(t,r,e);i[e]?(i[e].p(s,o),B(i[e],1)):(i[e]=Pt(s),i[e].c(),B(i[e],1),i[e].m(n,null))}for(O(),e=r.length;e<i.length;e+=1)c(e);G()}},i(t){if(!o){for(let t=0;t<r.length;t+=1)B(i[t]);o=!0}},o(t){i=i.filter(Boolean);for(let t=0;t<i.length;t+=1)z(i[t]);o=!1},d(t){s&&s.d(t),t&&u(e),t&&u(n),d(i,t)}}}function Gt(t,e,n){let o,s,{id:r=null}=e,i=[],c=[];var l;k((()=>{X.addError("before got topics: "),new Promise(((t,e)=>{X.addError("topicGetAll: ");const n=Z.transaction(["topics"],"readonly").objectStore("topics"),o=n.getAll();o.onsuccess=e=>{console.log("Store:",n.name,"topicGetAll:"),X.addError("topicGetAll: OK"),t(o.result)},o.onerror=t=>{console.log("Store:",n.name,"topicGetAll error:",t),X.addError("Store: "+n.name+" topicGetAll error: "+t),e()}})).then((t=>{i=t,n(0,c=t),n(1,o=(t=>{const e=[];return t.forEach((t=>{t.tags.forEach((t=>{e.includes(t)||e.push(t)}))})),e.sort()})(i)),X.addError("got topics: "+i.length)}))})),l=()=>{if(r){const t=document.getElementById(r);t&&t.scrollIntoView()}},S().$$.after_update.push(l);return t.$$set=t=>{"id"in t&&n(4,r=t.id)},[c,o,s,()=>{n(0,c=s?i.filter((t=>t.tags.includes(s))):i)},r,function(){s=x(this),n(2,s),n(1,o)},()=>Y.setView("ViewTagInfo",{tag:s,topics:c}),()=>Y.setView("ViewTranslate")]}class Bt extends U{constructor(t){super(),J(this,t,Gt,Ot,i,{id:4})}}class zt{constructor(t,e){this.count=0,this.md=t,this.tag=e}getTag(){return++this.count%2?`<${this.tag}>`:`</${this.tag}>`}check(){if(this.count%2)throw new Error(`Unbalanced tag: ${this.md} count: ${this.count}`);this.count=0}}class Qt{constructor(){this.map={},this._register("_","u"),this._register("*","b"),this._register("~","i"),this.regex=this._pattern()}_register(t,e){this.map[t]=new zt(t,e)}_pattern(){let t="";for(let e in this.map)t+=e;return new RegExp(`[${t}]`,"g")}tag(t){if(!this.map.hasOwnProperty(t))throw new Error("Unknown element: "+t);return this.map[t].getTag()}_check(){for(let t in this.map)this.map[t].check()}_substitute(t){const e=this;return t.replaceAll(this.regex,(function(t){return e.tag(t)}))}toHtml(t){Array.isArray(t)||(t=[t]);let e=!1,n="";for(let o of t)o.startsWith("- ")?(e||(n+="<ul>",e=!0),n+="<li>"+this._substitute(o.substring(2).trim())+"</li>"):(e?(n+="</ul>",e=!1):""!==n&&(n+="<br />"),n+=this._substitute(o.trim()));return e&&(n+="</ul>"),this._check(),n}}function Dt(t){let e,n,o,s,r,i=t[4].toHtml(t[0].details)+"";return{c(){e=f("div"),n=f("h5"),n.textContent="Details",o=g(),s=f("div"),r=f("p"),$(s,"class","card content is-info")},m(t,c){a(t,e,c),l(e,n),l(e,o),l(e,s),l(s,r),r.innerHTML=i},p(t,e){1&e&&i!==(i=t[4].toHtml(t[0].details)+"")&&(r.innerHTML=i)},d(t){t&&u(e)}}}function Rt(t){let e,n,o,r,i,c,d,h,b,w,v,x,_,q,S,k,y,T,C,E,V,L,j,A,H,M;r=new Et({props:{topic:t[0],status:t[1],size:t[3]}});let I=t[0].details&&Dt(t);return{c(){e=f("div"),n=f("div"),o=f("div"),Q(r.$$.fragment),i=g(),c=f("div"),d=f("label"),d.textContent="Number of correct answers",h=g(),b=f("select"),w=f("option"),w.textContent="-- Select --",v=f("option"),v.textContent="Set 0",x=f("option"),x.textContent="Set 1",_=f("option"),_.textContent="Set 2",q=f("option"),q.textContent="Set 3",S=g(),I&&I.c(),k=g(),y=f("div"),T=f("button"),T.textContent="Back",C=g(),E=f("button"),E.textContent="Listing",V=g(),L=f("button"),j=p("Start"),$(o,"class","is-text-left"),$(d,"for","sf-set"),w.__value="",w.value=w.__value,v.__value="0",v.value=v.__value,x.__value="1",x.value=x.__value,_.__value="2",_.value=_.__value,q.__value="3",q.value=q.__value,$(b,"id","sf-set"),$(n,"class","grid grid-4"),$(T,"class","button"),$(E,"class","button"),$(L,"class","button"),L.disabled=t[2],$(y,"class","buttons"),$(e,"class","card card-shadow content")},m(s,u){a(s,e,u),l(e,n),l(n,o),D(r,o,null),l(n,i),l(n,c),l(c,d),l(c,h),l(c,b),l(b,w),l(b,v),l(b,x),l(b,_),l(b,q),l(n,S),I&&I.m(n,null),l(e,k),l(e,y),l(y,T),l(y,C),l(y,E),l(y,V),l(y,L),l(L,j),A=!0,H||(M=[m(b,"change",t[8]),m(T,"click",t[5]),m(E,"click",t[6]),m(L,"click",t[7])],H=!0)},p(t,[e]){const o={};1&e&&(o.topic=t[0]),2&e&&(o.status=t[1]),8&e&&(o.size=t[3]),r.$set(o),t[0].details?I?I.p(t,e):(I=Dt(t),I.c(),I.m(n,null)):I&&(I.d(1),I=null),(!A||4&e)&&(L.disabled=t[2])},i(t){A||(B(r.$$.fragment,t),A=!0)},o(t){z(r.$$.fragment,t),A=!1},d(t){t&&u(e),R(r),I&&I.d(),H=!1,s(M)}}}function Ft(t,e,n){let{topic:o}=e,{questions:s=null}=e;const r=new Qt;let i=0,c=!0,l=0;const a=()=>{if(!s)return;const t=s.map((t=>t.progress));n(1,i=((t,e)=>{let n=0;for(let e=0;e<t.length;e++)n+=t[e];return at(n,t.length*e)})(t,3)),n(2,c=((t,e)=>{for(let n in t)if(t[n]!==e)return!1;return!0})(t,3)),n(3,l=t.length)};k((async()=>{try{s||(await bt(o.file),console.log("Loading questions for topics"),n(9,s=await dt(o)),a())}catch(t){X.addError("ViewTopicInfo: "+t.message)}}));return t.$$set=t=>{"topic"in t&&n(0,o=t.topic),"questions"in t&&n(9,s=t.questions)},[o,i,c,l,r,()=>{Y.setView("ViewTopicList",{id:o.file})},()=>{Y.setView("ViewTopicQuests",{topic:o})},()=>{Y.setView("ViewQuestAnswer",{topics:[o],questions:s})},t=>{const e=t.target;s&&(pt(s,e.selectedIndex-1),e.selectedIndex=0,a())},s]}class Jt extends U{constructor(t){super(),J(this,t,Ft,Rt,i,{topic:0,questions:9})}}function Ut(e){let n,o,s,r,i,c,d,h,m,w,v,x,_,q,S,k=e[0].progress+"",y=e[0].total+"",T=e[0].ratio+"";return{c(){n=f("span"),o=p("Progress: "),s=f("span"),r=p(k),i=p(" /\n  "),c=f("span"),c.textContent="3",d=g(),h=f("span"),m=p("Total: "),w=f("span"),v=p(y),x=p(" Wrong:\n    "),_=f("span"),q=p(T),S=p("%"),$(s,"class","is-text-success"),$(c,"class","is-text-success"),$(w,"class","is-text-success"),$(_,"class","is-text-danger"),$(h,"class","hide-sm"),$(n,"class","h6")},m(t,e){a(t,n,e),l(n,o),l(n,s),l(s,r),l(n,i),l(n,c),l(n,d),l(n,h),l(h,m),l(h,w),l(w,v),l(h,x),l(h,_),l(_,q),l(_,S)},p(t,[e]){1&e&&k!==(k=t[0].progress+"")&&b(r,k),1&e&&y!==(y=t[0].total+"")&&b(v,y),1&e&&T!==(T=t[0].ratio+"")&&b(q,T)},i:t,o:t,d(t){t&&u(n)}}}function Wt(t,e,n){let{question:o}=e;return t.$$set=t=>{"question"in t&&n(0,o=t.question)},[o]}class Kt extends U{constructor(t){super(),J(this,t,Wt,Ut,i,{question:0})}}function Yt(t,e,n){const o=t.slice();return o[3]=e[n],o}function Xt(t){let e,n,o,s,r,i,c,d,h,m,w,v,x,_,q,S,k,y,T,C,E,V,L=t[3].id+"",j=t[3].file+"",A=t[1].toHtml(t[3].quest)+"",H=t[1].toHtml(t[3].answer)+"";return m=new Kt({props:{question:t[3]}}),{c(){e=f("div"),n=f("div"),o=f("span"),s=p("Id: "),r=p(L),i=g(),c=f("span"),d=p(j),h=g(),Q(m.$$.fragment),w=g(),v=f("div"),x=f("div"),_=f("p"),S=g(),k=f("div"),y=f("div"),T=f("p"),C=g(),$(o,"class","h6"),$(c,"class","hide-sm"),$(e,"class","is-flex-spread grid-full"),$(x,"class","content"),$(v,"class",q="card "+t[2]()),$(y,"class","content"),$(k,"class",E="card "+t[2]())},m(t,u){a(t,e,u),l(e,n),l(n,o),l(o,s),l(o,r),l(n,i),l(n,c),l(c,d),l(e,h),D(m,e,null),a(t,w,u),a(t,v,u),l(v,x),l(x,_),_.innerHTML=A,a(t,S,u),a(t,k,u),l(k,y),l(y,T),T.innerHTML=H,l(k,C),V=!0},p(t,e){(!V||1&e)&&L!==(L=t[3].id+"")&&b(r,L),(!V||1&e)&&j!==(j=t[3].file+"")&&b(d,j);const n={};1&e&&(n.question=t[3]),m.$set(n),(!V||1&e)&&A!==(A=t[1].toHtml(t[3].quest)+"")&&(_.innerHTML=A),(!V||1&e)&&H!==(H=t[1].toHtml(t[3].answer)+"")&&(T.innerHTML=H)},i(t){V||(B(m.$$.fragment,t),V=!0)},o(t){z(m.$$.fragment,t),V=!1},d(t){t&&u(e),R(m),t&&u(w),t&&u(v),t&&u(S),t&&u(k)}}}function Zt(t){let e,n,o=t[0],s=[];for(let e=0;e<o.length;e+=1)s[e]=Xt(Yt(t,o,e));const r=t=>z(s[t],1,1,(()=>{s[t]=null}));return{c(){e=f("div");for(let t=0;t<s.length;t+=1)s[t].c();$(e,"class","grid grid-2")},m(t,o){a(t,e,o);for(let t=0;t<s.length;t+=1)s[t].m(e,null);n=!0},p(t,[n]){if(7&n){let i;for(o=t[0],i=0;i<o.length;i+=1){const r=Yt(t,o,i);s[i]?(s[i].p(r,n),B(s[i],1)):(s[i]=Xt(r),s[i].c(),B(s[i],1),s[i].m(e,null))}for(O(),i=o.length;i<s.length;i+=1)r(i);G()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)B(s[t]);n=!0}},o(t){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)z(s[t]);n=!1},d(t){t&&u(e),d(s,t)}}}function te(t,e,n){let{questions:o}=e;const s=new Qt,r=((t,e,n)=>{let o=0;return()=>o++%(2*t)<t?e:n})(2,"is-primary","is-info");return t.$$set=t=>{"questions"in t&&n(0,o=t.questions)},[o,s,r]}class ee extends U{constructor(t){super(),J(this,t,te,Zt,i,{questions:0})}}function ne(t){let e,n,o,s,r,i,c,d,h,w,v,x=t[0].title+"";return r=new ee({props:{questions:t[1]}}),{c(){e=f("div"),n=f("h4"),o=p(x),s=g(),Q(r.$$.fragment),i=g(),c=f("div"),d=f("button"),d.textContent="Back",$(d,"class","button"),$(c,"class","buttons"),$(e,"class","card card-shadow content")},m(u,f){a(u,e,f),l(e,n),l(n,o),l(e,s),D(r,e,null),l(e,i),l(e,c),l(c,d),h=!0,w||(v=m(d,"click",t[3]),w=!0)},p(t,[e]){(!h||1&e)&&x!==(x=t[0].title+"")&&b(o,x);const n={};2&e&&(n.questions=t[1]),r.$set(n)},i(t){h||(B(r.$$.fragment,t),h=!0)},o(t){z(r.$$.fragment,t),h=!1},d(t){t&&u(e),R(r),w=!1,v()}}}function oe(t,e,n){let{topic:o}=e,s=[];k((()=>{dt(o).then((t=>{n(1,s=t)}))}));const r=t=>{Y.setView("ViewTopicInfo",{topic:t})};return t.$$set=t=>{"topic"in t&&n(0,o=t.topic)},[o,s,r,()=>r(o)]}class se extends U{constructor(t){super(),J(this,t,oe,ne,i,{topic:0})}}function re(t,e,n){const o=t.slice();return o[9]=e[n],o}function ie(t){let e,n,o=t[9].title+"";return{c(){e=f("li"),n=p(o)},m(t,o){a(t,e,o),l(e,n)},p(t,e){2&e&&o!==(o=t[9].title+"")&&b(n,o)},d(t){t&&u(e)}}}function ce(e){let n,o,r,i,c,h,w,x,_,q,S,k,y,T,C,E,V,L,A,H,M,I,N,P,O,G,B,z,Q=e[1],D=[];for(let t=0;t<Q.length;t+=1)D[t]=ie(re(e,Q,t));return{c(){n=f("div"),o=f("div"),r=f("div"),i=f("h4"),c=p("Tag: "),h=p(e[0]),w=g(),x=f("p"),x.textContent="Files incluging the tag:",_=g(),q=f("ul");for(let t=0;t<D.length;t+=1)D[t].c();S=g(),k=f("div"),y=f("label"),y.textContent="Number of correct answers",T=g(),C=f("select"),E=f("option"),E.textContent="-- Select --",V=f("option"),V.textContent="Set 0",L=f("option"),L.textContent="Set 1",A=f("option"),A.textContent="Set 2",H=g(),M=f("div"),I=f("button"),I.textContent="Back",N=g(),P=f("button"),P.textContent="Listing",O=g(),G=f("button"),G.textContent="Start",$(r,"class","is-text-left"),$(o,"class","grid grid-4"),$(y,"for","sf-set"),E.__value="-1",E.value=E.__value,V.__value="0",V.value=V.__value,L.__value="1",L.value=L.__value,A.__value="2",A.value=A.__value,$(C,"id","sf-set"),void 0===e[2]&&j((()=>e[8].call(C))),$(k,"class","block"),$(I,"class","button"),$(P,"class","button"),$(G,"class","button"),$(M,"class","buttons"),$(n,"class","card card-shadow content")},m(t,s){a(t,n,s),l(n,o),l(o,r),l(r,i),l(i,c),l(i,h),l(r,w),l(r,x),l(r,_),l(r,q);for(let t=0;t<D.length;t+=1)D[t].m(q,null);l(n,S),l(n,k),l(k,y),l(k,T),l(k,C),l(C,E),l(C,V),l(C,L),l(C,A),v(C,e[2]),l(n,H),l(n,M),l(M,I),l(M,N),l(M,P),l(M,O),l(M,G),B||(z=[m(C,"change",e[8]),m(C,"change",e[6]),m(I,"click",e[4]),m(P,"click",e[3]),m(G,"click",e[5])],B=!0)},p(t,[e]){if(1&e&&b(h,t[0]),2&e){let n;for(Q=t[1],n=0;n<Q.length;n+=1){const o=re(t,Q,n);D[n]?D[n].p(o,e):(D[n]=ie(o),D[n].c(),D[n].m(q,null))}for(;n<D.length;n+=1)D[n].d(1);D.length=Q.length}4&e&&v(C,t[2])},i:t,o:t,d(t){t&&u(n),d(D,t),B=!1,s(z)}}}function le(t,e,n){let o,{tag:s}=e,{topics:r}=e,{questions:i=null}=e;return k((async()=>{try{if(!i){const t=[];r.forEach((e=>{t.push(bt(e.file))})),await Promise.all(t),console.log("Loading questions for topics"),n(7,i=await(async(t,e)=>{const n=Z.transaction(["questions"],"readonly").objectStore("questions");let o=[];return t.forEach((t=>{o.push(ft(n,t))})),Promise.all(o).then((t=>{let n=[].concat(...t);return n.sort(((t,e)=>e.ratio-t.ratio)),n.splice(0,e)}))})(r,30))}}catch(t){X.addError("ViewTagInfo: "+t.message)}})),t.$$set=t=>{"tag"in t&&n(0,s=t.tag),"topics"in t&&n(1,r=t.topics),"questions"in t&&n(7,i=t.questions)},[s,r,o,()=>{Y.setView("ViewTagQuests",{tag:s,topics:r,questions:i})},()=>{Y.setView("ViewTopicList")},()=>{Y.setView("ViewQuestAnswer",{tag:s,topics:r,questions:i})},t=>{if(!i)return;const e=t.target;pt(i,e.selectedIndex-1),e.selectedIndex=0},i,function(){o=x(this),n(2,o)}]}class ae extends U{constructor(t){super(),J(this,t,le,ce,i,{tag:0,topics:1,questions:7})}}function ue(t){let e,n,o,s,r,i,c,d,h,w,v,x;return i=new ee({props:{questions:t[1]}}),{c(){e=f("div"),n=f("h4"),o=p("Tag: "),s=p(t[0]),r=g(),Q(i.$$.fragment),c=g(),d=f("div"),h=f("button"),h.textContent="Back",$(h,"class","button"),$(d,"class","buttons"),$(e,"class","card card-shadow content")},m(u,f){a(u,e,f),l(e,n),l(n,o),l(n,s),l(e,r),D(i,e,null),l(e,c),l(e,d),l(d,h),w=!0,v||(x=m(h,"click",t[4]),v=!0)},p(t,[e]){(!w||1&e)&&b(s,t[0]);const n={};2&e&&(n.questions=t[1]),i.$set(n)},i(t){w||(B(i.$$.fragment,t),w=!0)},o(t){z(i.$$.fragment,t),w=!1},d(t){t&&u(e),R(i),v=!1,x()}}}function de(t,e,n){let{tag:o}=e,{topics:s}=e,{questions:r=[]}=e;const i=()=>{Y.setView("ViewTagInfo",{tag:o,topics:s,questions:r})};return t.$$set=t=>{"tag"in t&&n(0,o=t.tag),"topics"in t&&n(3,s=t.topics),"questions"in t&&n(1,r=t.questions)},[o,r,i,s,()=>i()]}class fe extends U{constructor(t){super(),J(this,t,de,ue,i,{tag:0,topics:3,questions:1})}}function pe(e){let n,o,s,r,i,c,d,h,m,w,v,x,_,q,S,k,y,T,C,E,V,L,j,A,H=e[0][0]+"",M=e[0][1]+"",I=e[0][2]+"",N=e[0][3]+"";return{c(){n=f("table"),o=f("tr"),s=f("td"),s.textContent="No correct Answers",r=g(),i=f("td"),c=p(H),d=g(),h=f("tr"),m=f("td"),m.textContent="One correct Answer",w=g(),v=f("td"),x=p(M),_=g(),q=f("tr"),S=f("td"),S.textContent="Two correct Answers",k=g(),y=f("td"),T=p(I),C=g(),E=f("tr"),V=f("td"),V.textContent="Learned",L=g(),j=f("td"),A=p(N),$(n,"class","table hide-md")},m(t,e){a(t,n,e),l(n,o),l(o,s),l(o,r),l(o,i),l(i,c),l(n,d),l(n,h),l(h,m),l(h,w),l(h,v),l(v,x),l(n,_),l(n,q),l(q,S),l(q,k),l(q,y),l(y,T),l(n,C),l(n,E),l(E,V),l(E,L),l(E,j),l(j,A)},p(t,[e]){1&e&&H!==(H=t[0][0]+"")&&b(c,H),1&e&&M!==(M=t[0][1]+"")&&b(x,M),1&e&&I!==(I=t[0][2]+"")&&b(T,I),1&e&&N!==(N=t[0][3]+"")&&b(A,N)},i:t,o:t,d(t){t&&u(n)}}}function ge(t,e,n){let{statistic:o=[0,0,0,0]}=e;return t.$$set=t=>{"statistic"in t&&n(0,o=t.statistic)},[o]}class he extends U{constructor(t){super(),J(this,t,ge,pe,i,{statistic:0})}}function me(t){let e,n=t[3].toHtml(t[1].details)+"";return{c(){e=f("p")},m(t,o){a(t,e,o),e.innerHTML=n},p(t,o){2&o&&n!==(n=t[3].toHtml(t[1].details)+"")&&(e.innerHTML=n)},d(t){t&&u(e)}}}function $e(t){let e,n,o,s,r,i,c,d,h,m,w,v,x,_,q,S,k,y,T,C=t[0].id+"",E=t[3].toHtml(t[0].quest)+"",V=t[3].toHtml(t[0].answer)+"";d=new Kt({props:{question:t[0]}});let L=t[1].details&&me(t);return{c(){e=f("div"),n=f("div"),o=f("div"),s=f("div"),r=p("Question: "),i=p(C),c=g(),Q(d.$$.fragment),h=g(),m=f("div"),w=f("p"),v=g(),x=f("div"),_=f("h5"),_.textContent="Answer",q=g(),S=f("div"),k=f("p"),y=g(),L&&L.c(),$(s,"class","h5"),$(o,"class","is-flex-spread block"),$(m,"class","card content is-primary"),$(S,"class","card content is-info"),x.hidden=t[2],$(e,"class","grid grid-2")},m(t,u){a(t,e,u),l(e,n),l(n,o),l(o,s),l(s,r),l(s,i),l(o,c),D(d,o,null),l(n,h),l(n,m),l(m,w),w.innerHTML=E,l(e,v),l(e,x),l(x,_),l(x,q),l(x,S),l(S,k),k.innerHTML=V,l(S,y),L&&L.m(S,null),T=!0},p(t,[e]){(!T||1&e)&&C!==(C=t[0].id+"")&&b(i,C);const n={};1&e&&(n.question=t[0]),d.$set(n),(!T||1&e)&&E!==(E=t[3].toHtml(t[0].quest)+"")&&(w.innerHTML=E),(!T||1&e)&&V!==(V=t[3].toHtml(t[0].answer)+"")&&(k.innerHTML=V),t[1].details?L?L.p(t,e):(L=me(t),L.c(),L.m(S,null)):L&&(L.d(1),L=null),(!T||4&e)&&(x.hidden=t[2])},i(t){T||(B(d.$$.fragment,t),T=!0)},o(t){z(d.$$.fragment,t),T=!1},d(t){t&&u(e),R(d),L&&L.d()}}}function be(t,e,n){let{question:o}=e,{topic:s}=e,{hideAnswer:r}=e;const i=new Qt;return t.$$set=t=>{"question"in t&&n(0,o=t.question),"topic"in t&&n(1,s=t.topic),"hideAnswer"in t&&n(2,r=t.hideAnswer)},[o,s,r,i]}class we extends U{constructor(t){super(),J(this,t,be,$e,i,{question:0,topic:1,hideAnswer:2})}}function ve(t){let e,n,o,r,i,c,d,h,b,w,v,x,_,q,S,k,y,T,C,E,V,L,j,A;function H(t,e){return t[0]?_e:xe}let M=H(t),I=M(t);return o=new he({props:{statistic:t[3]}}),i=new we({props:{topic:t[1],question:t[2],hideAnswer:t[4]}}),{c(){e=f("div"),I.c(),n=g(),Q(o.$$.fragment),r=g(),Q(i.$$.fragment),c=g(),d=f("div"),h=f("button"),b=p("Show"),v=g(),x=f("button"),_=p("Correct"),q=g(),S=f("button"),k=p("Wrong"),y=g(),T=f("button"),C=p("Skip"),E=g(),V=f("button"),V.textContent="Stop",$(h,"class","button"),h.hidden=w=!t[4],$(x,"class","button is-success"),x.hidden=t[4],$(S,"class","button is-danger"),S.hidden=t[4],$(T,"class","button is-warning"),T.hidden=t[4],$(V,"class","button"),$(d,"class","buttons"),$(e,"class","card card-shadow content")},m(s,u){a(s,e,u),I.m(e,null),l(e,n),D(o,e,null),l(e,r),D(i,e,null),l(e,c),l(e,d),l(d,h),l(h,b),l(d,v),l(d,x),l(x,_),l(d,q),l(d,S),l(S,k),l(d,y),l(d,T),l(T,C),l(d,E),l(d,V),L=!0,j||(A=[m(h,"click",t[9]),m(x,"click",t[10]),m(S,"click",t[11]),m(T,"click",t[12]),m(V,"click",t[6])],j=!0)},p(t,s){M===(M=H(t))&&I?I.p(t,s):(I.d(1),I=M(t),I&&(I.c(),I.m(e,n)));const r={};8&s&&(r.statistic=t[3]),o.$set(r);const c={};2&s&&(c.topic=t[1]),4&s&&(c.question=t[2]),16&s&&(c.hideAnswer=t[4]),i.$set(c),(!L||16&s&&w!==(w=!t[4]))&&(h.hidden=w),(!L||16&s)&&(x.hidden=t[4]),(!L||16&s)&&(S.hidden=t[4]),(!L||16&s)&&(T.hidden=t[4])},i(t){L||(B(o.$$.fragment,t),B(i.$$.fragment,t),L=!0)},o(t){z(o.$$.fragment,t),z(i.$$.fragment,t),L=!1},d(t){t&&u(e),I.d(),R(o),R(i),j=!1,s(A)}}}function xe(t){let e,n,o=t[1].title+"";return{c(){e=f("h4"),n=p(o)},m(t,o){a(t,e,o),l(e,n)},p(t,e){2&e&&o!==(o=t[1].title+"")&&b(n,o)},d(t){t&&u(e)}}}function _e(t){let e,n,o,s,r,i,c=t[1].title+"";return{c(){e=f("h4"),n=p("Tag: "),o=p(t[0]),s=g(),r=f("h6"),i=p(c)},m(t,c){a(t,e,c),l(e,n),l(e,o),a(t,s,c),a(t,r,c),l(r,i)},p(t,e){1&e&&b(o,t[0]),2&e&&c!==(c=t[1].title+"")&&b(i,c)},d(t){t&&u(e),t&&u(s),t&&u(r)}}}function qe(t){let e,n,o=t[2]&&ve(t);return{c(){o&&o.c(),e=h()},m(t,s){o&&o.m(t,s),a(t,e,s),n=!0},p(t,[n]){t[2]?o?(o.p(t,n),4&n&&B(o,1)):(o=ve(t),o.c(),B(o,1),o.m(e.parentNode,e)):o&&(O(),z(o,1,1,(()=>{o=null})),G())},i(t){n||(B(o),n=!0)},o(t){z(o),n=!1},d(t){o&&o.d(t),t&&u(e)}}}function Se(t,e,n){let o,s,r,i,{tag:c=null}=e,{topics:l}=e,{questions:a}=e,u=!0;const d=t=>{if(void 0===t)return i.push(s),void f();var e;((t,e)=>{e?t.progress++:(t.progress=0,t.failed++),t.total++,t.ratio=at(t.failed,t.total)})(s,t),(e=s,new Promise(((t,n)=>{const o=Z.transaction(["questions"],"readwrite").objectStore("questions");o.put(e).onsuccess=n=>{console.log("Store:",o.name," update:",e),t()}}))).then((()=>{s.progress<3&&i.push(s),0===i.length&&p(),f()}))},f=()=>{n(2,s=i.shift()),n(1,o=l.find((t=>t.file===s.file))),n(3,r=(t=>{const e=[0,0,0,0];return t.forEach((t=>{e[t.progress]++})),e})(a)),n(4,u=!0),console.log("next",s)};k((()=>{i=a.filter((t=>t.progress<3)),(t=>{for(let o=0;o<t.length;o++){let s=(e=0,n=t.length-1,Math.floor(Math.random()*(n-e+1)+e));if(o===s)continue;let r=t[o];t[o]=t[s],t[s]=r}var e,n})(i),f()}));const p=()=>{o?(n(1,o.lastLearned=new Date,o),(t=>{const e=Z.transaction(["topics"],"readwrite").objectStore("topics");ot(e,t)})(o),Y.setView("ViewTopicList",{id:o.file})):Y.setView("ViewTopicList")};return t.$$set=t=>{"tag"in t&&n(0,c=t.tag),"topics"in t&&n(7,l=t.topics),"questions"in t&&n(8,a=t.questions)},[c,o,s,r,u,d,p,l,a,()=>n(4,u=!1),()=>d(!0),()=>d(!1),()=>d()]}class ke extends U{constructor(t){super(),J(this,t,Se,qe,i,{tag:0,topics:7,questions:8})}}function ye(e){let n,o,r,i,c,d,h,v,x,_,q,S,k,y,T,C,E,V,L,j,A,H,M,I;return{c(){n=f("h4"),n.textContent="Translate",o=g(),r=f("label"),i=p(e[0]),c=g(),d=f("textarea"),h=g(),v=f("label"),x=p(e[1]),_=g(),q=f("textarea"),S=g(),k=f("div"),y=f("button"),y.textContent="Translate",T=g(),C=f("button"),C.textContent="Reset",E=g(),V=f("button"),V.textContent="Switch",L=g(),j=f("button"),j.textContent="Back",A=g(),H=f("p"),H.innerHTML='The translation is done with <a href="https://libretranslate.de/">LibreTranslate</a>',$(r,"for","src"),$(d,"id","src"),$(v,"for","dst"),$(q,"id","dst"),q.readOnly=!0,q.value=e[3],$(y,"class","button"),$(C,"class","button"),$(V,"class","button"),$(j,"class","button"),$(k,"class","buttons")},m(t,s){a(t,n,s),a(t,o,s),a(t,r,s),l(r,i),a(t,c,s),a(t,d,s),w(d,e[2]),a(t,h,s),a(t,v,s),l(v,x),a(t,_,s),a(t,q,s),a(t,S,s),a(t,k,s),l(k,y),l(k,T),l(k,C),l(k,E),l(k,V),l(k,L),l(k,j),a(t,A,s),a(t,H,s),M||(I=[m(d,"input",e[8]),m(y,"click",e[9]),m(C,"click",e[10]),m(V,"click",e[11]),m(j,"click",e[12])],M=!0)},p(t,[e]){1&e&&b(i,t[0]),4&e&&w(d,t[2]),2&e&&b(x,t[1]),8&e&&(q.value=t[3])},i:t,o:t,d(t){t&&u(n),t&&u(o),t&&u(r),t&&u(c),t&&u(d),t&&u(h),t&&u(v),t&&u(_),t&&u(q),t&&u(S),t&&u(k),t&&u(A),t&&u(H),M=!1,s(I)}}}function Te(t,e,n){let o="German",s="Russian",r="de",i="ru",c="",l="";const a=()=>{c&&fetch("https://libretranslate.de/translate",{method:"POST",body:JSON.stringify({q:c,source:r,target:i,format:"text"}),headers:{"Content-Type":"application/json"}}).then((t=>(t.ok||X.addError(`Unable to get JSON: ${t.statusText}`),t.json()))).then((t=>{n(3,l=t.translatedText)}))},u=()=>{"de"===r?(n(0,o="Russian"),n(1,s="German"),r="ru",i="de"):(n(0,o="German"),n(1,s="Russian"),r="de",i="ru"),n(2,c=l),a()},d=()=>{n(2,c=""),n(3,l="")},f=()=>{Y.setView("ViewTopicList")};return[o,s,c,l,a,u,d,f,function(){c=this.value,n(2,c)},()=>a(),()=>d(),()=>u(),()=>f()]}class Ce extends U{constructor(t){super(),J(this,t,Te,ye,i,{})}}function Ee(t){let e,n;return e=new qt({}),{c(){Q(e.$$.fragment)},m(t,o){D(e,t,o),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){R(e,t)}}}function Ve(t){let n,o,s,r,i,c,d,p,h,m=0!==t[0].length&&Ee();const b=[t[1].props];var w=t[1].component;function v(t){let n={};for(let t=0;t<b.length;t+=1)n=e(n,b[t]);return{props:n}}return w&&(c=new w(v())),{c(){n=f("div"),o=f("h2"),o.textContent="Cards",s=g(),m&&m.c(),r=g(),i=f("div"),c&&Q(c.$$.fragment),d=g(),p=f("div"),p.innerHTML='<div class="is-text-right">by Volker Senkel 2021</div>',$(i,"id","main"),$(i,"class","block"),$(p,"class","block"),$(n,"class","container")},m(t,e){a(t,n,e),l(n,o),l(n,s),m&&m.m(n,null),l(n,r),l(n,i),c&&D(c,i,null),l(n,d),l(n,p),h=!0},p(t,[e]){0!==t[0].length?m?1&e&&B(m,1):(m=Ee(),m.c(),B(m,1),m.m(n,r)):m&&(O(),z(m,1,1,(()=>{m=null})),G());const o=2&e?function(t,e){const n={},o={},s={$$scope:1};let r=t.length;for(;r--;){const i=t[r],c=e[r];if(c){for(const t in i)t in c||(o[t]=1);for(const t in c)s[t]||(n[t]=c[t],s[t]=1);t[r]=c}else for(const t in i)s[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(b,[(s=t[1].props,"object"==typeof s&&null!==s?s:{})]):{};var s;if(w!==(w=t[1].component)){if(c){O();const t=c;z(t.$$.fragment,1,0,(()=>{R(t,1)})),G()}w?(c=new w(v()),Q(c.$$.fragment),B(c.$$.fragment,1),D(c,i,null)):c=null}else w&&c.$set(o)},i(t){h||(B(m),c&&B(c.$$.fragment,t),h=!0)},o(t){z(m),c&&z(c.$$.fragment,t),h=!1},d(t){t&&u(n),m&&m.d(),c&&R(c)}}}function Le(t,e,n){let o,s;return c(t,X,(t=>n(0,o=t))),c(t,Y,(t=>n(1,s=t))),k((()=>{try{(async()=>{if("serviceWorker"in navigator){const t=await navigator.serviceWorker.register("service-worker.js");console.log("Registration of serivce worker done - scope:",t.scope)}})()}catch(t){X.addError("App onMount(): "+t)}Y.views={ViewTopicList:{component:Bt},ViewTopicInfo:{component:Jt},ViewTopicQuests:{component:se},ViewTagInfo:{component:ae},ViewTagQuests:{component:fe},ViewQuestAnswer:{component:ke},ViewTranslate:{component:Ce}},(async()=>{await et(),X.addError("before get topics");const t=await $t("data/topics.json");t&&(X.addError("before sync"),mt(t))})().then((()=>{Y.setView("ViewTopicList")}))})),[o,s]}return new class extends U{constructor(t){super(),J(this,t,Le,Ve,i,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
