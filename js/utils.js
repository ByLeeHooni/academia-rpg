/* Utilitários: DOM, escape, campos, sons, notificações, dados e menus suspensos. */
const $=s=>document.querySelector(s),uid=()=>Math.random().toString(36).slice(2,8);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const beep=f=>{if(!snd)return;try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.frequency.value=f||660;o.type="square";g.gain.value=.04;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.06)}catch(e){}};
const setP=(p,v)=>{const k=p.split(".");let o=S;for(let i=0;i<k.length-1;i++)o=o[k[i]];o[k.at(-1)]=v};
const fld=(p,l,v,t)=>`<label>${l}${t==="a"?`<textarea data-p="${p}">${esc(v)}</textarea>`:`<input data-p="${p}" ${t?`type="${t}"`:""} value="${esc(v)}">`}</label>`;
const GL={Vivo:"●",Morto:"✝",Executado:"✖",Assassino:"⚠"};
function enh(root){root.querySelectorAll("select:not([data-enh])").forEach(sel=>{sel.dataset.enh=1;
 const w=document.createElement("div"),b=document.createElement("button");w.className="dd";b.type="button";b.className="dd-b";
 const lab=()=>{const o=sel.options[sel.selectedIndex];return o&&o.text.trim()?(GL[o.text]?GL[o.text]+" ":"")+o.text:"—"};
 b.textContent=lab();w.append(b);sel.after(w);let m=null,hl=0;
 const close=()=>{if(!m)return;m.remove();m=null;w.classList.remove("open");document.removeEventListener("mousedown",out,true);document.removeEventListener("keydown",key,true);removeEventListener("scroll",close,true);removeEventListener("resize",close)};
 const out=e=>{if(!w.contains(e.target))close()};
 const pick=i=>{sel.selectedIndex=i;close();sel.dispatchEvent(new Event("input",{bubbles:true}));sel.dispatchEvent(new Event("change",{bubbles:true}));b.textContent=lab()};
 const paint=()=>[...m.children].forEach((o,i)=>o.classList.toggle("hl",i===hl));
 const key=e=>{if(e.key==="Escape")close();else if(e.key==="ArrowDown"){e.preventDefault();hl=Math.min(hl+1,sel.options.length-1);paint()}else if(e.key==="ArrowUp"){e.preventDefault();hl=Math.max(hl-1,0);paint()}else if(e.key==="Enter"){e.preventDefault();pick(hl)}};
 b.onclick=e=>{e.preventDefault();if(m)return close();hl=Math.max(0,sel.selectedIndex);m=document.createElement("div");m.className="dd-m";
  [...sel.options].forEach((o,i)=>{const d=document.createElement("div");d.className="dd-o"+(i===sel.selectedIndex?" sel":"");d.textContent=(GL[o.text]?GL[o.text]+"  ":"")+(o.text.trim()||"—");d.onmousedown=ev=>ev.preventDefault();d.onclick=()=>pick(i);m.append(d)});
  w.append(m);w.classList.add("open");paint();const r=b.getBoundingClientRect(),wd=Math.max(r.width,150);m.style.minWidth=wd+"px";m.style.left=Math.max(8,Math.min(r.left,innerWidth-wd-8))+"px";
  m.style.top=(r.bottom+m.offsetHeight+12>innerHeight?Math.max(8,r.top-m.offsetHeight-4):r.bottom+4)+"px";
  document.addEventListener("mousedown",out,true);document.addEventListener("keydown",key,true);addEventListener("scroll",close,true);addEventListener("resize",close)}})}
const toast=(title,sub,rolls,mod,total,ico,tag)=>{let box=$("#toasts");if(!box){box=document.createElement("div");box.id="toasts";document.body.append(box)}
 const el=document.createElement("div");el.className="toast";
 el.innerHTML=`<div class="hx"><span>${esc(ico||"")}</span></div><div class="tb"><div class="tt">${esc(title)}${tag?`<em>${esc(tag)}</em>`:""}</div><div class="ts">${esc(sub||"")}</div>${total!=null?`<div class="tr2"><small>${esc(`[${rolls.join(", ")}]`+(mod?(mod>0?" + ":" − ")+Math.abs(mod):""))}</small><b>= ${total}</b></div>`:""}</div><button class="tx" aria-label="Fechar">✕</button>`;
 const close=()=>{el.classList.add("out");setTimeout(()=>el.remove(),300)};el.querySelector(".tx").onclick=close;box.append(el);{const t=[...box.children].filter(x=>!x.dataset.pid);while(t.length>4)t.shift().remove()}setTimeout(close,5000)};
const rx=t=>{const m=t.replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!m)return null;const n=Math.min(+m[1]||1,50),d=+m[2],k=+(m[3]||0),r=Array.from({length:n},()=>Math.ceil(Math.random()*d)),tot=r.reduce((a,b)=>a+b,0)+k;return{r,k,tot,d,txt:`${r.join("+")}${k?(k>0?"+":"")+k:""} = ${tot}`}};
const clean=h=>{const b=new DOMParser().parseFromString(h||"","text/html").body;b.querySelectorAll("*").forEach(e=>{if(!/^(B|I|U|BR|DIV|P|STRONG|EM)$/.test(e.tagName))e.replaceWith(...e.childNodes);else[...e.attributes].forEach(a=>e.removeAttribute(a.name))});return b.innerHTML};
