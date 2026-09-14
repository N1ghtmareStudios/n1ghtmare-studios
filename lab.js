/* ═══════════════════════════════════════════════════════════════════
   LAB CHROME, den lilla del som inte gar att gora i CSS.

   Reglagens spak visar hur langt de ar dragna genom en toning som
   bryter vid --f. CSS kan inte lasa ett input-varde, sa nagon maste
   satta talet, och det ar allt den har filen gor.

   Den ror inte sidornas egen logik och vet ingenting om vad reglagen
   betyder. Darfor kan den ligga i alla tre labben utan att nagon av dem
   behover andras.

   Tva vagar in, for de tacker olika fall:
     input-handelsen, som ger genast utslag medan man drar
     en langsam avsokning, som fangar de andringar koden gor sjalv nar
     en forinstallning klickas, eftersom programmatiska varden inte
     utloser nagon handelse
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";
  const panel = document.getElementById("panel");
  if(!panel) return;

  function fill(el){
    const min = parseFloat(el.min || 0), max = parseFloat(el.max || 100);
    const span = max - min;
    const f = span > 0 ? (parseFloat(el.value) - min) / span * 100 : 0;
    const s = (f < 0 ? 0 : f > 100 ? 100 : f).toFixed(2) + "%";
    if(el.dataset.f !== s){ el.dataset.f = s; el.style.setProperty("--f", s); }
  }
  function sweep(){
    const list = panel.querySelectorAll('input[type=range]');
    for(let i = 0; i < list.length; i++) fill(list[i]);
  }

  panel.addEventListener("input", e => {
    if(e.target && e.target.type === "range") fill(e.target);
  });
  // Sallan nog att kosta ingenting, ofta nog att inget star fel lange.
  setInterval(sweep, 140);
  sweep();
})();
