function renderTimeline(e,t){"use strict";const n=["Aug","Sep","Okt","Nov","Dec","Jan","Feb","Mar","Apr","Maj","Jun"],a=["red","blue","green","purple"],d='<div class="event"><svg height="18"  width="18" class="dot"><circle cx="9" cy="9" r="5" /></svg><div class="bar"></div><div class="info"><h2>#title#</h2><h4>#info#</h4></div></div>',i='<div class="month"><p>#month#</p>#event#</div>';fetch("https://docs.google.com/document/d/1zcmqf4vlLzNTbaUSUxUkIfNVSMm3NMoKYkB5vSRIHcs/export?format=txt").then(e=>e.json()).then(t=>t.find(t=>t.Projekt==e)).then(e=>(function(e,t){var s=jQuery('<div class="timeline"></div>'),r=(new Date).getMonth()-7;r<0&&(r+=12);var o=!1,c=a.sort(()=>Math.random()-.5);n.forEach(function(t,n){var a=i.replace("#month#",t),v="";if(e.m[t]){o=!o;var l=e.m[t];v=d.replace("#title#",l.name).replace("#info#",l.note)}a=a.replace("#event#",v);var h=jQuery(a);n<=r&&h.addClass("past"),n==r&&h.addClass("today"),o&&h.find(".event").addClass("high");var p=c[n%c.length];h.find(".event").addClass(p),s.append(h)}),jQuery(t).append(s)})(e,t))}