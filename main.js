(()=>{"use strict";let e;const t=t=>{let o=t.parentElement,i=document.createElement("form");i.id="temporary-form",i.style.display="block";let r=document.createElement("input");r.type="text",r.value=t.textContent;let a=document.createElement("button");a.type="button",a.innerHTML='<i class="material-icons">done</i>',((t,o)=>{t.addEventListener("click",(()=>{let t=o.value;""!=t&&(e.obj.textContent=t,e.item[e.attr]=t,Z()),n()}))})(a,r);let l=document.createElement("button");l.button="button",l.innerHTML='<i class="material-icons">clear</i>',(e=>{e.addEventListener("click",(()=>{n(e)}))})(l),i.append(r,a,l),o.appendChild(i)},n=()=>{document.getElementById("temporary-form").remove(),e.obj.style.display="block"};function o(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function i(e){o(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}function a(e){o(1,arguments);var t=i(e);return t.setHours(0,0,0,0),t}var l=864e5;function s(e,t){o(2,arguments);var n=a(e),i=a(t),s=n.getTime()-r(n),d=i.getTime()-r(i);return Math.round((s-d)/l)}function d(e,t){var n=e.getFullYear()-t.getFullYear()||e.getMonth()-t.getMonth()||e.getDate()-t.getDate()||e.getHours()-t.getHours()||e.getMinutes()-t.getMinutes()||e.getSeconds()-t.getSeconds()||e.getMilliseconds()-t.getMilliseconds();return n<0?-1:n>0?1:n}function c(e,t){o(2,arguments);var n=i(e),r=i(t),a=d(n,r),l=Math.abs(s(n,r));n.setDate(n.getDate()-a*l);var c=d(n,r)===-a,u=a*(l-c);return 0===u?0:u}function u(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}var m=36e5,p={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},g=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,y=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,f=/^([+-])(\d{2})(?::?(\d{2}))?$/;function k(e,t){o(1,arguments);var n=t||{},i=null==n.additionalDigits?2:u(n.additionalDigits);if(2!==i&&1!==i&&0!==i)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var r,a=b(e);if(a.date){var l=E(a.date,i);r=v(l.restDateString,l.year)}if(isNaN(r)||!r)return new Date(NaN);var s,d=r.getTime(),c=0;if(a.time&&(c=h(a.time),isNaN(c)||null===c))return new Date(NaN);if(!a.timezone){var m=new Date(d+c),p=new Date(0);return p.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),p.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),p}return s=D(a.timezone),isNaN(s)?new Date(NaN):new Date(d+c+s)}function b(e){var t,n={},o=e.split(p.dateTimeDelimiter);if(o.length>2)return n;if(/:/.test(o[0])?(n.date=null,t=o[0]):(n.date=o[0],t=o[1],p.timeZoneDelimiter.test(n.date)&&(n.date=e.split(p.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var i=p.timezone.exec(t);i?(n.time=t.replace(i[1],""),n.timezone=i[1]):n.time=t}return n}function E(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),o=e.match(n);if(!o)return{year:null};var i=o[1]&&parseInt(o[1]),r=o[2]&&parseInt(o[2]);return{year:null==r?i:100*r,restDateString:e.slice((o[1]||o[2]).length)}}function v(e,t){if(null===t)return null;var n=e.match(g);if(!n)return null;var o=!!n[4],i=w(n[1]),r=w(n[2])-1,a=w(n[3]),l=w(n[4]),s=w(n[5])-1;if(o)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,l,s)?function(e,t,n){var o=new Date(0);o.setUTCFullYear(e,0,4);var i=7*(t-1)+n+1-(o.getUTCDay()||7);return o.setUTCDate(o.getUTCDate()+i),o}(t,l,s):new Date(NaN);var d=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(j[t]||(B(e)?29:28))}(t,r,a)&&function(e,t){return t>=1&&t<=(B(e)?366:365)}(t,i)?(d.setUTCFullYear(t,r,Math.max(i,a)),d):new Date(NaN)}function w(e){return e?parseInt(e):1}function h(e){var t=e.match(y);if(!t)return null;var n=I(t[1]),o=I(t[2]),i=I(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,o,i)?n*m+6e4*o+1e3*i:NaN}function I(e){return e&&parseFloat(e.replace(",","."))||0}function D(e){if("Z"===e)return 0;var t=e.match(f);if(!t)return 0;var n="+"===t[1]?-1:1,o=parseInt(t[2]),i=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,i)?n*(o*m+6e4*i):NaN}var j=[31,null,31,30,31,30,31,31,30,31,30,31];function B(e){return e%400==0||e%4==0&&e%100}class N{constructor(e,t,n){this.title=e,this.description=t,this.dueDate=n,this.priority=!1}}const T=(e,t)=>{for(let n of e.taskList){let e=document.createElement("li");e.textContent=n.title;let o=document.createElement("p");o.classList.add("task-description"),o.textContent=n.description,o.style.display="none",e.appendChild(o),e.addEventListener("click",(()=>{"none"==o.style.display?o.style.display="block":o.style.display="none"})),t.appendChild(e);let i=c(k(n.dueDate),new Date);console.log(i)}},C={plus:e=>{e.addEventListener("click",(()=>{L.newForm(),e.style.display="none",document.getElementById("task-button-description").style.display="none"}))},submit:e=>{e.addEventListener("click",(()=>{L.newTask(),document.getElementById("new-task-form").style.display="none",document.getElementById("add-task-button").style.display="block",document.getElementById("task-button-description").style.display="block"}))},cancel:e=>{e.addEventListener("click",(()=>{document.getElementById("new-task-form").style.display="none",document.getElementById("add-task-button").style.display="block",document.getElementById("task-button-description").style.display="block"}))}},L=(()=>{let n;return{index:n,button:(e,t)=>{n=t;let o=document.getElementById("add-task-button");o.style.display="block",document.getElementById("task-button-description").style.display="block",o.project=e,console.log(e)},initButton:()=>{let e=document.getElementById("add-task-button"),t=document.getElementById("new-task-submit"),n=document.getElementById("new-task-cancel");C.submit(t),C.cancel(n),C.plus(e)},newForm:()=>{document.getElementById("new-task-form").style.display="block"},taskWindow:e=>{const t=document.getElementById("task-container");t.innerHTML="";const n=document.createElement("ul");n.id="task-list",T(e,n),t.appendChild(n)},newTask:()=>{let e=document.getElementById("add-task-button").project;if(!e)return;let t=document.getElementById("task-title").value,n=document.getElementById("task-desc").value,o=document.getElementById("due-date").value,i=new N(t,n,o,!1);e.taskList.push(i),Z(),M(e)},taskHeader:n=>{let o=document.getElementById("task-header"),i=document.getElementById("task-header-text"),r=document.getElementById("project-description");var a,l;""==r.textContent&&(r.textContent="Click to enter description"),l=n,1!=(a=r).editable&&(a.editable=!0,e={obj:a,item:l,attr:"description"},(e=>{e.addEventListener("click",(()=>{e.style.display="none",t(e)}))})(a),document.addEventListener("update",(e=>{console.log("update")}))),o.style.display="block",r.style.display="block",i.textContent=n.title,r.textContent=n.description}}})(),M=(e,t)=>{L.taskHeader(e),L.taskWindow(e),L.button(e,t)},S=L.initButton;class x{constructor(e){this.title=e,this.description="lorem ipsum domet ngalor ngidul arep nangendi (click here to edit)",this.startDate="",this.dueDate="",this.taskList=[]}addTask=e=>this.taskList.push(e);deleteTask=e=>{this.task.splice(this.indexOf(e),1)};static list}const F=e=>{e.addEventListener("click",(()=>{M(e.project,e.projectIndex)})),e.addEventListener("text-update",(()=>{sessionStorage.setItem("projects",JSON.stringify(x.list)),console.log("update")}))},U={plus:e=>{e.addEventListener("click",(()=>{H.newForm(),e.style.display="none"}))},submit:e=>{e.addEventListener("click",(()=>{console.log("submit"),H.newProject(),document.getElementById("new-project-form").style.display="none",document.getElementById("add-project-button").style.display="block"}))},cancel:e=>{e.addEventListener("click",(()=>{console.log("cancel"),document.getElementById("new-project-form").style.display="none",document.getElementById("add-project-button").style.display="block"}))}},H=(()=>{const e=document.getElementById("project-list"),t=t=>{x.list=t,e.innerHTML="";for(let n of t){let o=document.createElement("li");o.textContent=n.title,o.project=n,o.projectIndex=t.indexOf(n),F(o),e.appendChild(o)}},n=()=>{sessionStorage.setItem("projects",JSON.stringify(x.list))};return{projectList:t,addButton:()=>{let e=document.getElementById("add-project-button"),t=document.getElementById("new-project-submit"),n=document.getElementById("new-project-cancel");U.plus(e),U.submit(t),U.cancel(n),S()},newForm:()=>{document.getElementById("new-project-form").style.display="block"},newProject:()=>{let e=document.getElementById("input-project-title").value,o=new x(e);console.log(e),x.list.push(o),n(),t(x.list)},save:n}})(),O=H.projectList,Y=H.addButton,Z=H.save;let z=[];z=JSON.parse(sessionStorage.getItem("projects"));const $=new x("First Project");z||(z=[$],sessionStorage.setItem("projects",JSON.stringify(z))),Y(),O(z)})();