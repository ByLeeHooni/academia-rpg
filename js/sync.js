/* Sincronização em tempo real via Supabase (opcional).
   Sem configuração: modo local, com sincronização entre abas do mesmo navegador. */
const SY={sb:null,room:(()=>{try{return localStorage.getItem("acad_room")||""}catch(e){return ""}})(),last:{},ch:null,timer:null,on:false};
const cj=v=>JSON.stringify(v,(k,x)=>x&&typeof x==="object"&&!Array.isArray(x)?Object.fromEntries(Object.keys(x).sort().map(y=>[y,x[y]])):x);
const syUI=(t,ok)=>{const e=$("#sy");if(e){e.textContent=t;e.style.color=ok?"#fff":""}};
const mergeLog=(a,b)=>{const m=new Map();[...a,...b].forEach(e=>{const k=e.id||e.t0+"|"+e.who+"|"+e.key,o=m.get(k);if(!o||e.t1>o.t1||(e.t1===o.t1&&e.n>o.n))m.set(k,e)});return[...m.values()].sort((x,y)=>x.t0-y.t0).slice(-800)};
const syDocs=()=>{const d={};S.chars.forEach(c=>d["char:"+c.id]=c);d.meta={camps:S.camps,threats:S.threats,home:S.home,ranks:S.ranks,lib:S.lib,combat:S.combat,turn:S.turn};d.pend=S.pend;d.log=S.log;return d};
function syRender(){const a=document.activeElement,p=a&&a.dataset&&a.dataset.p,s=a&&a.selectionStart,e=a&&a.selectionEnd;render();if(p){const n=document.querySelector(`[data-p="${p}"]`);if(n){n.focus();try{n.setSelectionRange(s,e)}catch(_){}}}}
function syApply(k,data,del){const a=document.activeElement,p=a&&a.dataset&&a.dataset.p,v=p?a.value:null,num=a&&a.type==="number";
 if(del){delete SY.last[k];if(k.startsWith("char:")){const id=k.slice(5),i=S.chars.findIndex(c=>c.id===id);if(i>=0)S.chars.splice(i,1);delete SN[id]}return}
 SY.last[k]=cj(data);
 if(k.startsWith("char:")){const i=S.chars.findIndex(c=>c.id===data.id);if(i>=0)S.chars[i]=data;else S.chars.push(data);S.chars.sort((x,y)=>(x.ts||0)-(y.ts||0));SN[data.id]=snapC(data)}
 else if(k==="meta")Object.assign(S,data);else if(k==="pend")S.pend=data||[];else if(k==="log")S.log=mergeLog(S.log||[],data||[]);
 if(p&&v!==null)try{setP(p,num?+v:v)}catch(e){}}
function syPush(){if(!SY.on)return;clearTimeout(SY.timer);SY.timer=setTimeout(async()=>{const d=syDocs(),rows=[],del=[];
 for(const k in d){const j=cj(d[k]);if(SY.last[k]!==j){rows.push({room:SY.room,key:k,data:d[k]});SY.last[k]=j}}
 for(const k in SY.last)if(!(k in d)){del.push(k);delete SY.last[k]}
 try{if(rows.length){const r=await SY.sb.from("docs").upsert(rows);if(r.error)throw r.error}
  if(del.length){const r=await SY.sb.from("docs").delete().eq("room",SY.room).in("key",del);if(r.error)throw r.error}syUI("● sincronizado",1)}
 catch(e){rows.forEach(r=>delete SY.last[r.key]);syUI("⚠ sem conexão")}},300)}
function syOff(){if(SY.ch&&SY.sb)SY.sb.removeChannel(SY.ch);SY.ch=null;SY.on=false;SY.last={}}
async function syConnect(){syOff();if(!SY.sb)return;if(!SY.room){syUI("○ informe a sala");return}
 syUI("… conectando");const r=await SY.sb.from("docs").select("key,data").eq("room",SY.room);if(r.error){syUI("⚠ "+(r.error.message||"erro"));return}
 if(r.data.length){try{localStorage.setItem("acad2_antes_da_sala",JSON.stringify(S))}catch(e){}S.chars=[];r.data.forEach(x=>syApply(x.key,x.data));S.chars.sort((x,y)=>(x.ts||0)-(y.ts||0));snapAll()}
 SY.on=true;syPush();
 SY.ch=SY.sb.channel("sala-"+SY.room).on("postgres_changes",{event:"*",schema:"public",table:"docs",filter:"room=eq."+SY.room},p=>{
  const del=p.eventType==="DELETE",r=del?p.old:p.new;if(!r||r.room!==SY.room)return;
  if(del?!(r.key in SY.last):cj(r.data)===SY.last[r.key])return;syApply(r.key,r.data,del);syRender()}).subscribe(s=>{if(s==="SUBSCRIBED")syUI("● sincronizado",1);else if(s!=="CLOSED")syUI("⚠ reconectando…")});
 syRender()}
(function(){const c=window.ACADEMIA_CONFIG,rm=$("#room");rm.value=SY.room;
 addEventListener("storage",e=>{if(e.key!=="acad2"||!e.newValue)return;try{const n=JSON.parse(e.newValue);Object.assign(S,n,{me:S.me,versions:S.versions});snapAll();syRender()}catch(_){}});
 if(!c.supabaseUrl||!c.supabaseKey){rm.style.display="none";syUI("○ modo local");return}
 const go=()=>{SY.sb=supabase.createClient(c.supabaseUrl,c.supabaseKey);syConnect()};
 rm.onchange=()=>{SY.room=rm.value.trim();try{localStorage.setItem("acad_room",SY.room)}catch(e){}syConnect()};
 addEventListener("online",()=>syPush());setInterval(()=>syPush(),20000);
 if(window.supabase)go();else{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";s.onload=go;s.onerror=()=>syUI("⚠ biblioteca não carregou");document.head.append(s)}})();
