// blog.js — carga artículos desde Firestore con fallback local
(async function(){
  const cont = document.getElementById('blog-list');
  if (!cont) return;

  // fallback articles
  const fallback = [
    { titulo:'CPU: Cómo elegir procesador en 2025', resumen:'Guía para elegir CPU según uso: gaming, creación o productividad.', contenido:'(contenido extenso...)', fecha:'2025-10-01', fuente:'Tom’s Hardware', imagen:'' },
    { titulo:'GPU: ¿NVIDIA o AMD?', resumen:'Comparativa general entre arquitecturas modernas.', contenido:'(contenido extenso...)', fecha:'2025-09-12', fuente:'AnandTech', imagen:'' },
    { titulo:'SSD NVMe vs SATA', resumen:'Por qué NVMe es el estándar actual.', contenido:'(contenido extenso...)', fecha:'2025-08-05', fuente:'Western Digital', imagen:'' }
  ];

  async function fetchArticles(){
    try {
      const snap = await window.appDB.collection('articles').orderBy('fecha','desc').get();
      const arr = []; snap.forEach(d=>arr.push({ id:d.id, ...d.data() })); return arr;
    } catch (e) { return []; }
  }

  let articles = await fetchArticles();
  if (!articles || articles.length === 0) articles = fallback;

  cont.innerHTML = '';
  articles.forEach(a=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.style.marginBottom = '12px';
    el.innerHTML = `<h3>${a.titulo}</h3><p class="small-muted">${a.fuente} — ${a.fecha}</p><p>${a.resumen}</p><div style="text-align:right"><button class="btn read-btn">Leer</button></div>`;
    const btn = el.querySelector('.read-btn');
    btn.addEventListener('click', ()=> alert(`${a.titulo}\n\nFuente: ${a.fuente}\n\n${a.contenido || a.resumen}`));
    cont.appendChild(el);
  });
})();
