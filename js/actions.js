/* Ações (botões), eventos globais, versões e som. */
const ACT={
lf:e=>{lf=e.k;render()},
hstep:e=>{const c=S.chars[e.ci],b=c.bonds[e.bi];b.hearts=Math.max(0,Math.min(HM,b.hearts+ +e.d));hchk(c,b);pendToasts();render()},
pok:e=>{const q=S.pend.find(x=>x.id===e.pid);if(!q)return;S.pend=S.pend.filter(x=>x!==q);const c=S.chars.find(x=>x.id===q.cid),b=(c.bonds||[]).find(x=>x.id===q.fid),f=S.chars.find(x=>x.id===q.fid),r=(f.rewards||[]).find(x=>x.id===q.rid);if(b){b.st=b.st||{};b.st[q.rid]="ok"}lg(S.chars.indexOf(c),"amizade","ok:"+q.rid,`liberou “${r.name}” (vínculo com ${f.name})`,"liberou habilidades de amizade",r.name);pendToasts();render()},
pno:e=>{const q=S.pend.find(x=>x.id===e.pid);if(!q)return;S.pend=S.pend.filter(x=>x!==q);const c=S.chars.find(x=>x.id===q.cid),b=(c.bonds||[]).find(x=>x.id===q.fid),f=S.chars.find(x=>x.id===q.fid),r=(f.rewards||[]).find(x=>x.id===q.rid);if(b){b.st=b.st||{};b.st[q.rid]="no"}lg(S.chars.indexOf(c),"amizade","no:"+q.rid,`recusou liberar “${r.name}” (vínculo com ${f.name})`,"recusou habilidades de amizade",r.name);pendToasts();render()},
rel:e=>{const c=S.chars[e.ci],b=c.bonds[e.bi];b.st=b.st||{};b.st[e.rid]="ok";S.pend=S.pend.filter(q=>!(q.cid===c.id&&q.fid===b.id&&q.rid===e.rid));pendToasts();render()},
addbond:e=>{const id=$("#fr")?.value;if(!id)return;const c=S.chars[e.ci],f=S.chars.find(x=>x.id===id);if(!c.camp||!f||f.camp!==c.camp)return;(c.bonds=c.bonds||[]).push({id,hearts:0,claimed:[]});render()},
heart:e=>{const c=S.chars[e.ci],b=c.bonds[e.bi],n=+e.n;b.hearts=b.hearts===n?n-1:n;if(b.hearts===n)pulse=`[data-a=heart][data-ci="${e.ci}"][data-bi="${e.bi}"][data-n="${n}"]`;hchk(c,b);pendToasts();render()},
rmbond:e=>{const b=S.chars[e.ci].bonds;if(isM()||!b[e.bi].hearts){b.splice(e.bi,1);render()}},
claim:e=>{const c=S.chars[e.ci],b=c.bonds[e.bi],f=S.chars.find(x=>x.id===b.id),r=(f.rewards||[]).find(x=>x.id===e.rid);if(!can(c)||!r||(b.claimed||[]).includes(r.id)||b.hearts<r.hearts||(b.st||{})[r.id]!=="ok")return;(b.claimed=b.claimed||[]).push(r.id);arr(e.ci,"powers").push({id:uid(),name:r.name,cat:"Amizade",desc:`${r.desc||""}\n(Vínculo com ${f.name}, ${r.hearts} ♥)`});toast(r.name,"Adicionada aos seus Talentos",null,0,null,"♥","NOVA");render()},
aed:()=>{aed=!aed;render()},trn:e=>{S.chars[e.ci].skills[e.i].t=+e.v;render()},
lt:e=>{lt=e.k;render()},open:e=>{mod={k:e.k,ci:e.ci,cat:"",q:""};render()},close:()=>{mod=null;render()},mcat:e=>{mod.cat=e.v;render()},
mtake:e=>{const o=S.lib[mod.k].find(x=>x.id===e.id);if(o)arr(mod.ci,mod.k).push({...o,id:uid()});render()},
addcat:e=>{fresh=1;arr(e.ci,"inv").push({cat:e.c,name:"Novo item",qty:1});render()},
rollx:()=>{const c=S.chars[cur()],t=$("#ex").value,r=rx(t);if(!r)return toast("Formato inválido","Use o formato 2d6+3");const k=t.replace(/\s/g,"");toast(k.toUpperCase(),c?.name,r.r,r.k,r.tot,(r.r.length>1?r.r.length:"")+"D"+r.d);lg(cur(),"dado","x:"+k,`rolou ${k}: ${r.tot}`,`rolou ${k}`,r.tot)},
rollatk:e=>{const c=S.chars[e.ci],a=arr(e.ci,"atk")[e.i],t=Math.ceil(Math.random()*20),b=+a.bonus||0,dm=rx(a.dmg||"");toast(a.name||"Ataque",`${c.name} · Dano ${dm?dm.txt:a.dmg||"-"}`,[t],b,t+b,"D20",t>=(+a.crit||20)?"CRÍTICO":"");lg(+e.ci,"dado","atk:"+(a.name||""),`atacou com ${a.name||"ataque"}: ${t+b}${dm?" (dano "+dm.tot+")":""}`,`atacou com ${a.name||"ataque"}`,t+b)},
ct:e=>{tabanim=1;ct=e.k;render()},fmt:e=>document.execCommand(e.c),
shield:e=>{fsh=e.v==="1";$("#sh0").style.opacity=fsh?.4:1;$("#sh1").style.opacity=fsh?1:.4},
savecamp:e=>{const n=$("#fn").value.trim();if(!n)return;const d=clean($("#fd").innerHTML),i=+e.i;if(i>=0)Object.assign(S.camps[i],{name:n,desc:d,shield:fsh});else S.camps.push({id:uid(),name:n,desc:d,shield:fsh,date:new Date().toLocaleDateString("pt-BR"),role:"Mestre",players:[],combats:[],notes:""});location.hash="campanhas"},
delcamp:e=>{if(confirm("Excluir esta campanha?")){const id=S.camps[+e.i].id;S.chars.forEach(c=>{if(c.camp===id)c.camp=""});S.camps.splice(+e.i,1);location.hash="campanhas"}},
cover:e=>{const f=document.createElement("input");f.type="file";f.accept="image/*";f.onchange=()=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement("canvas"),k=Math.min(1,600/im.width);c.width=im.width*k;c.height=im.height*k;c.getContext("2d").drawImage(im,0,0,c.width,c.height);S.camps[e.i].cover=c.toDataURL("image/jpeg",.8);save();render()};im.src=r.result};r.readAsDataURL(f.files[0])};f.click()},
invite:e=>{const n=prompt("Nome do jogador (convite temporário, até existir login):");if(n){S.camps[e.i].players.push(n.trim());ct="jog";render()}},
newcmb:e=>{const n=prompt("Nome do combate:");if(n){S.camps[e.i].combats.push({name:n,date:new Date().toLocaleDateString("pt-BR"),parts:[]});ct="cmb";render()}},
addpart:e=>{S.camps[e.i].combats[e.k].parts.push({n:"Novo",c:50,ini:0});render()},
rmcmb:e=>{S.camps[e.i].combats.splice(+e.k,1);render()},rmp:e=>{S.camps[e.i].players.splice(+e.j,1);render()},
addcamp:e=>{const c=S.chars.find(x=>x.id===$("#addc").value);if(c){c.camp=S.camps[e.i].id;render()}},
rmcamp:e=>{const c=S.chars.find(x=>x.id===e.id);if(c){c.camp="";render()}},
rt:e=>{tabanim=1;rt=e.k;render()},newc:()=>{if(S.chars.length>=15)return;const c=NC();c.player=S.me||"";S.chars.push(c);location.hash="ficha-"+c.id},
delc:e=>{if(confirm("Excluir este ID Card?")){S.chars.splice(+e.i,1);render()}},
newcamp:()=>{const n=prompt("Nome da campanha:");if(n){S.camps.push({id:uid(),name:n,date:new Date().toLocaleDateString("pt-BR"),role:"Mestre"});render()}},
add:e=>{fresh=1;arr(e.ci,e.k).push(e.ci==="lib"?{id:uid()}:e.k==="rewards"?{id:uid(),hearts:1}:{});render()},del:e=>{(e.ci!==undefined?arr(e.ci,e.k):S[e.k]).splice(+e.i,1);render()},
fav:e=>{const o=arr(e.ci,e.k)[e.i];o.fav=!o.fav;render()},
addsk:e=>{S.chars[e.ci].skills.push({n:"Nova perícia",a:0,t:0,o:0});render()},
addvit:e=>{S.chars[e.ci].vit.push({n:"Corrupção",c:0,m:10,k:"#f2f2f2"});render()},
adj:e=>{const v=S.chars[e.ci].vit[e.i];v.c=Math.max(0,Math.min(v.m,v.c+ +e.d));render()},
addth:()=>{S.threats.push({name:"Nova ameaça"});render()},addrank:()=>{S.ranks.push({name:"Nova",pts:0});render()},
addc:()=>{S.combat.push({n:"Novo",c:50,m:50,ini:0});render()},next:()=>{S.turn++;render()},
addcloud:()=>{const n=$("#cn").value.trim();if(n){S.home.push({t:$("#ct").value,n,d:$("#cd").value});render()}},
take:e=>{const o=S.home[e.i],c=S.chars[cur()>=0?cur():0];if(o.t==="Poder")c.powers.push({name:o.n,desc:o.d});else if(o.t==="Item")c.inv.push({name:o.n,desc:o.d,qty:1});else if(o.t==="Perícia")c.skills.push({n:o.n,a:0,t:0,o:0});else c.cls=o.n;beep(880);alert("Adicionado a "+c.name)},
roll:e=>{const d=+e.d;if(!d||d<2)return;const r=Math.ceil(Math.random()*d),c=S.chars[cur()];toast("D"+d,c?.name,[r],0,r,"D"+d,r===d?"MÁXIMO":"");lg(cur(),"dado","d"+d,`rolou D${d}: ${r}`,`rolou D${d}`,r)},
rollsk:e=>{const c=S.chars[e.ci],s=c.skills[e.i],r=Math.ceil(Math.random()*20),t=tot(c,s);toast(s.n,c.name,[r],t,r+t,"D20",r===20?"20 NATURAL":r===1?"FALHA":"");lg(+e.ci,"dado","sk:"+s.n,`rolou ${s.n}: ${r+t}`,`rolou ${s.n}`,r+t)},
av:e=>{const f=document.createElement("input");f.type="file";f.accept="image/*";f.onchange=()=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement("canvas"),k=Math.min(1,400/im.width);c.width=im.width*k;c.height=im.height*k;c.getContext("2d").drawImage(im,0,0,c.width,c.height);S.chars[e.ci].avatar=c.toDataURL("image/jpeg",.8);save();render()};im.src=r.result};r.readAsDataURL(f.files[0])};f.click()}};
document.addEventListener("click",ev=>{const b=ev.target.closest("[data-a]");if(!b)return;if(/^(fav|rollatk)$/.test(b.dataset.a))ev.preventDefault();beep();ACT[b.dataset.a]?.(b.dataset);if(b.dataset.a!=="rt")save()});
document.addEventListener("input",ev=>{const t=ev.target,p=t.dataset.p;if(!p)return;setP(p,t.type==="number"||t.dataset.num?+t.value:t.value);save()});
document.addEventListener("change",ev=>{const t=ev.target;if(t.dataset.r||t.dataset.p?.startsWith("chars")&&t.tagName==="SELECT")render()});
window.onhashchange=()=>{mod=null;render();scrollTo(0,0);const a=$("#app");a.classList.add("pg");setTimeout(()=>a.classList.remove("pg"),400)};$("#me").value=S.me||"";$("#me").oninput=e=>{S.me=e.target.value;save()};$("#me").onchange=render;$("#role").onchange=()=>{beep(440);render()};
$("#snd").onclick=()=>{snd=!snd;$("#snd").textContent=snd?"🔊":"🔇";beep()};
$("#ver").onclick=()=>{snap();save();const v=S.versions,i=prompt("Versões salvas (digite o número para restaurar):\n"+v.map((x,j)=>`${j+1}) ${x.t}`).join("\n")),o=v[(+i||0)-1];if(o){const keep=S.versions;S=Object.assign(S,JSON.parse(o.d),{versions:keep,log:S.log,pend:S.pend});snapAll();save();render()}};
