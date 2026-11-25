/* Fundo animado de Monokumas (posições fixas). */
const bg=document.createElement("div");bg.id="bg";document.body.prepend(bg);
let sd=20260;const rnd=()=>{sd=sd+0x6D2B79F5|0;let t=Math.imul(sd^sd>>>15,1|sd);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
for(let i=0;i<18;i++){const m=document.createElement("div"),z=70+rnd()*130;m.className="mk";
m.style.cssText=`width:${z}px;height:${z}px;left:${rnd()*100}%;top:${rnd()*100}%;--dx:${(rnd()-.5)*180}px;--dy:${(rnd()-.5)*180}px;--r:${(rnd()-.5)*50}deg;opacity:${.07+rnd()*.1};animation-duration:${45+rnd()*50}s;animation-delay:-${rnd()*60}s`;bg.append(m)}
