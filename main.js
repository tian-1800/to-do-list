(()=>{"use strict";let e;const t=t=>{let a=t.parentElement,l=document.createElement("form");l.id="temporary-form",l.style.display="block";let o=document.createElement("input");o.type="text",o.value=t.textContent;let i=document.createElement("button");i.type="button",i.innerHTML='<i class="material-icons">done</i>',((t,a)=>{t.addEventListener("click",(()=>{let t=a.value;""!=t&&(e.obj.textContent=t,e.item[e.attr]=t,W()),n()}))})(i,o);let r=document.createElement("button");r.button="button",r.innerHTML='<i class="material-icons">clear</i>',(e=>{e.addEventListener("click",(()=>{n()}))})(r),l.append(o,i,r),a.appendChild(l)},n=()=>{document.getElementById("temporary-form").remove(),e.obj.style.display="block"};function a(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function l(e){a(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function o(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}function i(e){a(1,arguments);var t=l(e);return t.setHours(0,0,0,0),t}var r=864e5;function s(e,t){a(2,arguments);var n=i(e),l=i(t),s=n.getTime()-o(n),d=l.getTime()-o(l);return Math.round((s-d)/r)}function d(e,t){var n=e.getFullYear()-t.getFullYear()||e.getMonth()-t.getMonth()||e.getDate()-t.getDate()||e.getHours()-t.getHours()||e.getMinutes()-t.getMinutes()||e.getSeconds()-t.getSeconds()||e.getMilliseconds()-t.getMilliseconds();return n<0?-1:n>0?1:n}function c(e,t){a(2,arguments);var n=l(e),o=l(t),i=d(n,o),r=Math.abs(s(n,o));n.setDate(n.getDate()-i*r);var c=d(n,o)===-i,u=i*(r-c);return 0===u?0:u}function u(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}var m=36e5,p={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},y=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,g=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,b=/^([+-])(\d{2})(?::?(\d{2}))?$/;function f(e,t){a(1,arguments);var n=t||{},l=null==n.additionalDigits?2:u(n.additionalDigits);if(2!==l&&1!==l&&0!==l)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var o,i=k(e);if(i.date){var r=E(i.date,l);o=v(r.restDateString,r.year)}if(isNaN(o)||!o)return new Date(NaN);var s,d=o.getTime(),c=0;if(i.time&&(c=w(i.time),isNaN(c)||null===c))return new Date(NaN);if(!i.timezone){var m=new Date(d+c),p=new Date(0);return p.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),p.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),p}return s=I(i.timezone),isNaN(s)?new Date(NaN):new Date(d+c+s)}function k(e){var t,n={},a=e.split(p.dateTimeDelimiter);if(a.length>2)return n;if(/:/.test(a[0])?(n.date=null,t=a[0]):(n.date=a[0],t=a[1],p.timeZoneDelimiter.test(n.date)&&(n.date=e.split(p.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var l=p.timezone.exec(t);l?(n.time=t.replace(l[1],""),n.timezone=l[1]):n.time=t}return n}function E(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:null};var l=a[1]&&parseInt(a[1]),o=a[2]&&parseInt(a[2]);return{year:null==o?l:100*o,restDateString:e.slice((a[1]||a[2]).length)}}function v(e,t){if(null===t)return null;var n=e.match(y);if(!n)return null;var a=!!n[4],l=D(n[1]),o=D(n[2])-1,i=D(n[3]),r=D(n[4]),s=D(n[5])-1;if(a)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,r,s)?function(e,t,n){var a=new Date(0);a.setUTCFullYear(e,0,4);var l=7*(t-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+l),a}(t,r,s):new Date(NaN);var d=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(j[t]||(B(e)?29:28))}(t,o,i)&&function(e,t){return t>=1&&t<=(B(e)?366:365)}(t,l)?(d.setUTCFullYear(t,o,Math.max(l,i)),d):new Date(NaN)}function D(e){return e?parseInt(e):1}function w(e){var t=e.match(g);if(!t)return null;var n=h(t[1]),a=h(t[2]),l=h(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,a,l)?n*m+6e4*a+1e3*l:NaN}function h(e){return e&&parseFloat(e.replace(",","."))||0}function I(e){if("Z"===e)return 0;var t=e.match(b);if(!t)return 0;var n="+"===t[1]?-1:1,a=parseInt(t[2]),l=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,l)?n*(a*m+6e4*l):NaN}var j=[31,null,31,30,31,30,31,31,30,31,30,31];function B(e){return e%400==0||e%4==0&&e%100}let N;const T=e=>{let t=e.parentElement,n=document.createElement("form");n.id="temporary-form",n.style.display="block";const a=C(),l=L();let o=document.createElement("button");o.type="button",o.innerHTML='<i class="material-icons">done</i>',((e,t,n)=>{e.addEventListener("click",(()=>{N.item.startDate=t.value,N.item.dueDate=n.value,N.obj.textContent=x(N.obj,t,n),W(),M()}))})(o,a,l);let i=document.createElement("button");i.button="button",i.innerHTML='<i class="material-icons">clear</i>',(e=>{e.addEventListener("click",(()=>{M()}))})(i),n.append(a,l,o,i),t.appendChild(n)},C=()=>{let e=document.createElement("input");return e.type="date",console.log(N.item.startDate),""==N.item.startDate?e.valueAsDate=new Date:e.valueAsDate=f(N.item.startDate),e},L=()=>{let e=document.createElement("input");return e.type="date",""==N.item.dueDate?e.valueAsDate=new Date:e.valueAsDate=f(N.item.dueDate),e},x=(e,t,n)=>{const a=new Date;return c(a,t),c(a,n),`${t.value} until ${n.value}`},M=()=>{document.getElementById("temporary-form").remove(),N.obj.style.display="block"};class S{constructor(e,t,n){this.title=e,this.description=t,this.dueDate=n,this.priority=!1}}const F=(e,t)=>{for(let n of e.taskList){let e=document.createElement("li");e.textContent=n.title;let a=document.createElement("p");a.classList.add("task-description"),a.textContent=n.description,a.style.display="none",e.appendChild(a),e.addEventListener("click",(()=>{"none"==a.style.display?a.style.display="block":a.style.display="none"})),t.appendChild(e);let l=c(f(n.dueDate),new Date);console.log(l)}},H={plus:e=>{e.addEventListener("click",(()=>{U.newForm(),e.style.display="none",document.getElementById("task-button-description").style.display="none"}))},submit:e=>{e.addEventListener("click",(()=>{U.newTask(),document.getElementById("new-task-form").style.display="none",document.getElementById("add-task-button").style.display="block",document.getElementById("task-button-description").style.display="block"}))},cancel:e=>{e.addEventListener("click",(()=>{document.getElementById("new-task-form").style.display="none",document.getElementById("add-task-button").style.display="block",document.getElementById("task-button-description").style.display="block"}))}},U=(()=>{let n;return{index:n,button:(e,t)=>{n=t;let a=document.getElementById("add-task-button");a.style.display="block",document.getElementById("task-button-description").style.display="block",a.project=e,console.log(e)},initButton:()=>{let e=document.getElementById("add-task-button"),t=document.getElementById("new-task-submit"),n=document.getElementById("new-task-cancel");H.submit(t),H.cancel(n),H.plus(e)},newForm:()=>{document.getElementById("new-task-form").style.display="block"},taskWindow:e=>{const t=document.getElementById("task-container");t.innerHTML="";const n=document.createElement("ul");n.id="task-list",F(e,n),t.appendChild(n)},newTask:()=>{let e=document.getElementById("add-task-button").project;if(!e)return;let t=document.getElementById("task-title").value,n=document.getElementById("task-desc").value,a=document.getElementById("due-date").value,l=new S(t,n,a,!1);e.taskList.push(l),W(),O(e)},taskHeader:n=>{let a=document.getElementById("task-header"),l=document.getElementById("task-header-text"),o=document.getElementById("project-description"),i=document.getElementById("project-timetable");var r,s;""==o.textContent&&(o.textContent="Click to enter description"),s=n,1!=(r=o).editable&&(r.editable=!0,e={obj:r,item:s,attr:"description"},(e=>{e.addEventListener("click",(()=>{e.style.display="none",t(e)}))})(r)),((e,t,n)=>{e.editable||(e.editable=!0,N={obj:e,item:n},(e=>{e.addEventListener("click",(()=>{T(e),e.style.display="none"}))})(e))})(i,0,n),""==n.startDate?i.textContent="click to edit timetable":i.textContent=`${n.startDate} until ${n.dueDate}`,a.style.display="block",o.style.display="block",l.textContent=n.title,o.textContent=n.description}}})(),O=(e,t)=>{U.taskHeader(e),U.taskWindow(e),U.button(e,t)},Y=U.initButton;class ${constructor(e){this.title=e,this.description="lorem ipsum domet ngalor ngidul arep nangendi (click here to edit)",this.startDate="",this.dueDate="",this.taskList=[]}addTask=e=>this.taskList.push(e);deleteTask=e=>{this.task.splice(this.indexOf(e),1)};static list}const Z=e=>{e.addEventListener("click",(()=>{O(e.project,e.projectIndex)})),e.addEventListener("text-update",(()=>{sessionStorage.setItem("projects",JSON.stringify($.list)),console.log("update")}))},z={plus:e=>{e.addEventListener("click",(()=>{A.newForm(),e.style.display="none"}))},submit:e=>{e.addEventListener("click",(()=>{console.log("submit"),A.newProject(),document.getElementById("new-project-form").style.display="none",document.getElementById("add-project-button").style.display="block"}))},cancel:e=>{e.addEventListener("click",(()=>{console.log("cancel"),document.getElementById("new-project-form").style.display="none",document.getElementById("add-project-button").style.display="block"}))}},A=(()=>{const e=document.getElementById("project-list"),t=t=>{$.list=t,e.innerHTML="";for(let n of t){let a=document.createElement("li");a.textContent=n.title,a.project=n,a.projectIndex=t.indexOf(n),Z(a),e.appendChild(a)}},n=()=>{sessionStorage.setItem("projects",JSON.stringify($.list))};return{projectList:t,addButton:()=>{let e=document.getElementById("add-project-button"),t=document.getElementById("new-project-submit"),n=document.getElementById("new-project-cancel");z.plus(e),z.submit(t),z.cancel(n),Y()},newForm:()=>{document.getElementById("new-project-form").style.display="block"},newProject:()=>{let e=document.getElementById("input-project-title").value,a=new $(e);console.log(e),$.list.push(a),n(),t($.list)},save:n}})(),J=A.projectList,P=A.addButton,W=A.save;let R=[];R=JSON.parse(sessionStorage.getItem("projects"));const q=new $("First Project");R||(R=[q],sessionStorage.setItem("projects",JSON.stringify(R))),P(),J(R)})();