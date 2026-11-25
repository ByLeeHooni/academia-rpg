/* Estado, persistência, versões, migrações, log de atividades e regras de acesso. */
let S={chars:[NC("Agente Exemplo")],camps:[{id:uid(),name:"Primeiro Julgamento",date:new Date().toLocaleDateString("pt-BR"),role:"Mestre",n:1}],threats:[],home:[],ranks:[{name:"Estudante",pts:0},{name:"Operador",pts:20}],combat:[],turn:0,rolls:[],versions:[]};
S.chars[0].talent="Detetive";
try{const r=localStorage.getItem("acad2");if(r)S=Object.assign(S,JSON.parse(r))}catch(e){}
S.lib=S.lib||{powers:[{name:"Contra-argumento",cat:"Julgamento",cost:"5 Concentração",cd:"1 turno",lvl:1,desc:"Anula uma afirmação falsa durante o julgamento."}],rit:[{name:"Cartucho de bala",cat:"Pista",loc:"Ginásio",rel:"Vítima",desc:"Encontrado perto do corpo. Calibre incompatível com a arma do suspeito."}],inv:[{name:"E-Handbook",cat:"Geral",qty:1,weight:1,desc:"Terminal de estudante da Academia."},{name:"Faca antiga",cat:"Arma",dmg:"1d4",crit:"x2",qty:1,weight:1}]};
for(const k in S.lib)S.lib[k].forEach(o=>o.id=o.id||uid());
S.chars.forEach(c=>{if(c.attrs&&c.attrs.map(a=>a.n).join()==="AGI,FOR,INT,PRE,VIG"){const o={},old=c.attrs.map(a=>a.n);c.attrs.forEach(a=>o[a.n]=a.v);c.attrs=ATTRS.map(([n,f])=>({n,f,v:o[n]??1}));(c.skills||[]).forEach(s=>{const j=c.attrs.findIndex(a=>a.n===old[s.a]);s.a=SK[s.n]??(j>=0?j:0)})}});
S.chars.forEach(c=>{if(c.quote==="A verdade sempre vem à tona.")c.quote="";(c.vit||[]).forEach(v=>{if(v.n==="Stamina")v.n="Concentração";if(v.n==="Mental")v.n="Esperança"});const RN={"Persuasão":"Argumentação","Combate":"Lógica","Percepção":"Atenção","Tecnologia":"Eletrônicos","Medicina":"Autópsia","Intimidação":"Pressão"};(c.skills||[]).forEach(k=>{if(RN[k.n]){k.n=RN[k.n];k.a=SK[k.n]??k.a}})});
S.pend=S.pend||[];S.log=S.log||[];
S.chars.forEach(c=>(c.bonds||[]).forEach(b=>{if(!b.st){b.st={};const f=S.chars.find(x=>x.id===b.id);((f&&f.rewards)||[]).forEach(r=>{if(b.hearts>=r.hearts)b.st[r.id]="ok"})}}));
let lf="todos",SN={},pulse="",fresh=0,rolled=0,tabanim=0,aed=false,lk="",mod=null,lt="powers",ct="idc",fsh=false,rt="powers",snd=false,cnt=0,tm,q="";
const isM=()=>$("#role").value==="m",hit=o=>!q||JSON.stringify(o).toLowerCase().includes(q.toLowerCase());
const save=()=>{clearTimeout(tm);$("#sv").textContent="salvando…";tm=setTimeout(()=>{try{diffLog()}catch(e){}try{localStorage.setItem("acad2",JSON.stringify(S))}catch(e){}if(++cnt%15===0)snap();window.syPush&&syPush();$("#sv").textContent="salvo ✓"},400)};
const snap=()=>{S.versions.unshift({t:new Date().toLocaleString("pt-BR"),d:JSON.stringify(Object.assign({},S,{versions:[],log:[],pend:[]}))});S.versions=S.versions.slice(0,10)};
const cur=()=>{const id=location.hash.slice(7);const i=S.chars.findIndex(c=>c.id===id);return i}
const arr=(ci,k)=>ci==="lib"?S.lib[k]:(S.chars[ci][k]=S.chars[ci][k]||[]);
function lg(ci,type,key,text,grp,val){const c=S.chars[ci];if(!c||!c.camp)return;const who=isM()?"Mestre":(S.me||c.player||c.name),now=Date.now(),L=S.log=S.log||[],l=L[L.length-1];
 if(l&&l.camp===c.camp&&l.who===who&&l.type===type&&l.key===key){l.n++;l.t1=now;l.text=text;l.vals.push(val)}else L.push({id:uid(),t0:now,t1:now,who,camp:c.camp,type,key,text,grp,n:1,vals:[val]});
 if(L.length>800)L.splice(0,L.length-800)}
function snapC(c){return{vit:(c.vit||[]).map(v=>({n:v.n,c:v.c,m:v.m})),sk:(c.skills||[]).map(k=>({n:k.n,a:k.a,t:k.t,o:k.o})),at:(c.attrs||[]).map(a=>({n:a.n,v:a.v})),pw:(c.powers||[]).map(x=>x.name||""),inv:(c.inv||[]).map(x=>x.name||""),tx:{hist:c.hist||"",notes:c.notes||"",look:c.look||"",pers:c.pers||"",obj:c.obj||""},bd:Object.fromEntries((c.bonds||[]).map(b=>[b.id,b.hearts]))}}
function snapAll(){SN={};S.chars.forEach(c=>SN[c.id]=snapC(c))}
function diffLog(){const TL={hist:"o Histórico",notes:"as Anotações",look:"a Aparência",pers:"a Personalidade",obj:"o Objetivo"};S.chars.forEach((c,ci)=>{const p=SN[c.id],n=snapC(c);SN[c.id]=n;if(!p)return;
 n.vit.forEach((v,j)=>{const o=p.vit[j];if(!o||o.n!==v.n)return;if(v.c!==o.c){const d=v.c-o.c;lg(ci,d>0?"vida":"dano","v:"+v.n+(d>0?"+":"-"),`${d>0?"recuperou":"perdeu"} ${Math.abs(d)} de ${v.n} (${o.c} → ${v.c})`,`${d>0?"recuperou":"perdeu"} ${v.n}`,d)}if(v.m!==o.m)lg(ci,"vida","m:"+v.n,`${v.n} máximo ${o.m} → ${v.m}`,`ajustou o máximo de ${v.n}`,v.m-o.m)});
 n.sk.forEach((k,j)=>{const o=p.sk[j];if(!o){if(k.n)lg(ci,"pericia","sn","adicionou a perícia “"+k.n+"”","adicionou perícias",k.n);return}if(o.t!==k.t||o.o!==k.o||o.a!==k.a||o.n!==k.n)lg(ci,"pericia","s:"+k.n,`alterou a perícia ${k.n} (treino ${o.t} → ${k.t}, outros ${o.o} → ${k.o})`,`alterou ${k.n}`,`${o.t}→${k.t}`)});
 n.at.forEach((a,j)=>{const o=p.at[j];if(o&&o.v!==a.v)lg(ci,"pericia","a:"+a.n,`alterou o atributo ${a.n} (${o.v} → ${a.v})`,`alterou o atributo ${a.n}`,`${o.v}→${a.v}`)});
 n.pw.filter(x=>x&&!p.pw.includes(x)).forEach(x=>lg(ci,"talento","pw:"+x,`adicionou o talento “${x}”`,"adicionou talentos",x));
 n.inv.filter(x=>x&&!p.inv.includes(x)).forEach(x=>lg(ci,"item","iv:"+x,`adicionou o item “${x}”`,"adicionou itens",x));
 for(const k in TL)if(n.tx[k]!==p.tx[k])lg(ci,"historia","h:"+k,`editou ${TL[k]}`,`editou ${TL[k]}`,n.tx[k].length+" car.");
 for(const id in n.bd){const f=S.chars.find(x=>x.id===id),fn=f?f.name:"?";if(p.bd[id]===undefined)lg(ci,"amizade","nb:"+id,`iniciou amizade com ${fn}`,"iniciou amizade",fn);else if(p.bd[id]!==n.bd[id])lg(ci,"amizade","b:"+id,`amizade com ${fn}: ♥ ${p.bd[id]} → ${n.bd[id]}`,`mudou a amizade com ${fn}`,`${p.bd[id]}→${n.bd[id]}`)}})}
function hchk(c,b){const f=S.chars.find(x=>x.id===b.id);if(!f)return;b.st=b.st||{};S.pend=S.pend||[];
 (f.rewards||[]).forEach(r=>{const rc=b.hearts>=r.hearts,st=b.st[r.id];
  if(rc&&!st){if(isM())b.st[r.id]="ok";else{b.st[r.id]="pending";S.pend.push({id:uid(),cid:c.id,fid:f.id,rid:r.id})}}
  if(!rc&&st==="pending"){delete b.st[r.id];S.pend=S.pend.filter(q=>!(q.cid===c.id&&q.fid===f.id&&q.rid===r.id))}})}
const can=c=>isM()||!c.player||(S.me||"").trim().toLowerCase()===c.player.trim().toLowerCase();
const cidx=()=>S.camps.findIndex(o=>o.id===location.hash.split("-")[1]);
