/* Renderização, animações das barras e roteamento por hash. */
function render(){const key=location.hash+rt+ct+lt+(mod?mod.k+mod.cat:""),op=key===lk?[...document.querySelectorAll("#app details")].map(d=>d.open):[],sy=scrollY;lk=key;const pv={};document.querySelectorAll("#app .vb[data-bk]").forEach(e=>pv[e.dataset.bk]={pc:+e.dataset.pc,v:+e.dataset.val});render0();document.querySelectorAll("#app details").forEach((d,i)=>{if(op[i])d.open=true});scrollTo(0,sy);fx(pv);enh($("#app"));pendToasts()}
function fx(pv){
 document.querySelectorAll("#app .vb[data-bk]").forEach(e=>{const o=pv[e.dataset.bk];if(!o)return;const pc=+e.dataset.pc,v=+e.dataset.val;if(o.pc===pc&&o.v===v)return;
  const bs=[...e.children].filter(x=>x.tagName==="I");e.classList.add("nt");bs.forEach(b=>b.style.width=o.pc+"%");void e.offsetWidth;e.classList.remove("nt");bs.forEach(b=>b.style.width=pc+"%");
  if(v!==o.v)e.classList.add(v<o.v?"hit":"heal");
  const i=e.querySelector(".m input");if(i){const t0=performance.now(),f=t=>{const k=Math.min(1,(t-t0)/450);i.value=Math.round(o.v+(v-o.v)*k);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}});
 if(fresh){const l=[...document.querySelectorAll("#app details.acc")].pop();if(l)l.classList.add("new");fresh=0}
 if(rolled){const l=document.querySelector("#app .log div");if(l)l.classList.add("flash");rolled=0}
 if(tabanim){document.querySelectorAll("#app .tabs ~ *").forEach(e=>e.style.animation="in .3s");tabanim=0}
 if(pulse){const h=document.querySelector(pulse);if(h)h.classList.add("pop");pulse=""}}
function render0(){const h=location.hash.slice(1)||"agentes",pg=h.startsWith("ficha")?"ficha":h.startsWith("campanha-")?"campanha":h.startsWith("editar-")||h==="nova-campanha"?"form":h;if(/^(ameacas|biblioteca)$/.test(pg)&&!isM()){location.hash="agentes";return}const PG=["agentes","campanhas",...(isM()?["ameacas","biblioteca"]:[]),"patente"];
 $("#nav").innerHTML=PG.map(k=>`<a href="#${k}" class="${k===pg||(pg==="ficha"&&k==="agentes")||(/^(campanha|form)$/.test(pg)&&k==="campanhas")?"on":""}">${{agentes:"ID Cards",ameacas:"Ameaças",biblioteca:"Biblioteca"}[k]||k[0].toUpperCase()+k.slice(1)}</a>`).join("");
 $("#app").innerHTML=(PG.includes(pg)?`<input id="q" placeholder="🔍 Buscar…" value="${esc(q)}" style="width:100%;margin-bottom:14px;padding:10px">`:"")+(P[pg]||P.agentes)()+(mod?modal():"");const mq=$("#mq");if(mq)mq.oninput=()=>{mod.q=mq.value;const p=mq.selectionStart;render();const n=$("#mq");n.focus();n.setSelectionRange(p,p)};
 const qi=$("#q");if(qi){qi.oninput=()=>{q=qi.value;const p=qi.selectionStart;render();const n=$("#q");n.focus();n.setSelectionRange(p,p)}}}
