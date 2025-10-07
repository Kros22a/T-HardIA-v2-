// compare.js — carga componentes desde Firestore (con fallback)
(async function(){
  const typeSelect = document.getElementById('type-select');
  const compA = document.getElementById('comp-a');
  const compB = document.getElementById('comp-b');
  const btnCompare = document.getElementById('btn-compare');
  const resultBox = document.getElementById('compare-result');

  const fallback = {
    CPU: [
      { id:'i9-14900K', nombre:'Intel Core i9-14900K', nucleos:24, hilos:32, freq:'6.0 GHz', tdp:125, score:98 },
      { id:'ryzen9-7950X', nombre:'AMD Ryzen 9 7950X', nucleos:16, hilos:32, freq:'4.5 GHz', tdp:170, score:94 }
    ],
    GPU: [
      { id:'rtx4090', nombre:'NVIDIA RTX 4090', vram:'24 GB', tflops:82, tdp:450, score:99 },
      { id:'rx7900xt', nombre:'AMD RX 7900 XT', vram:'20 GB', tflops:61, tdp:300, score:92 }
    ]
  };

  async function loadComponents(type){
    compA.innerHTML = '<option value="">Cargando...</option>';
    compB.innerHTML = '<option value="">Cargando...</option>';
    let list = [];
    try {
      list = await window.appFetchComponents(type);
    } catch(e){ list = []; }
    if (!list || list.length === 0) list = fallback[type] || [];
    const makeOptions = (select) => {
      select.innerHTML = '<option value="">Selecciona...</option>';
      list.forEach(item => {
        const opt = document.createElement('option');
        opt.value = JSON.stringify(item);
        opt.textContent = item.nombre || item.id;
        select.appendChild(opt);
      });
    };
    makeOptions(compA);
    makeOptions(compB);
  }

  if (typeSelect) {
    loadComponents(typeSelect.value || 'CPU');
    typeSelect.addEventListener('change', () => loadComponents(typeSelect.value));
  }

  function renderComparison(a,b){
    if (!a || !b) return '<p>Selecciona dos componentes válidos.</p>';
    let html = `<h3>${a.nombre} vs ${b.nombre}</h3>`;
    html += '<table style="width:100%;border-collapse:collapse;margin-top:8px">';
    html += '<thead><tr><th style="text-align:left;padding:8px">Especificación</th><th style="padding:8px">A</th><th style="padding:8px">B</th><th style="padding:8px">Mejor</th></tr></thead><tbody>';
    const keys = ['nucleos','hilos','freq','tdp','vram','tflops','score'];
    keys.forEach(k=>{
      const va = a[k]===undefined?'-':a[k];
      const vb = b[k]===undefined?'-':b[k];
      if (va === '-' && vb === '-') return;
      let best = '-';
      if (k === 'tdp') {
        if (a[k] && b[k]) best = a[k] < b[k] ? 'A' : a[k] > b[k] ? 'B' : '-';
      } else if (k === 'freq') {
        const na = parseFloat((''+va).replace(/[^\d\.]/g,''))||0;
        const nb = parseFloat((''+vb).replace(/[^\d\.]/g,''))||0;
        best = na > nb ? 'A' : na < nb ? 'B' : '-';
      } else {
        const na = Number(a[k])||0;
        const nb = Number(b[k])||0;
        if (!isNaN(na) && !isNaN(nb)) best = na > nb ? 'A' : na < nb ? 'B' : '-';
      }
      html += `<tr><td style="padding:8px;border-top:1px solid #eef6ff">${k}</td><td style="padding:8px;border-top:1px solid #eef6ff">${va}</td><td style="padding:8px;border-top:1px solid #eef6ff">${vb}</td><td style="padding:8px;border-top:1px solid #eef6ff">${best}</td></tr>`;
    });
    html += '</tbody></table>';
    const scoreA = a.score||0, scoreB = b.score||0;
    const rec = (scoreA===scoreB)?'Empate técnico.':'Recomendación: ' + (scoreA>scoreB? a.nombre + ' es más potente.': b.nombre + ' es más potente.');
    html += `<p style="margin-top:12px">${rec}</p>`;
    return html;
  }

  btnCompare && btnCompare.addEventListener('click', async ()=>{
    const a = compA.value ? JSON.parse(compA.value) : null;
    const b = compB.value ? JSON.parse(compB.value) : null;
    if (!a || !b) { resultBox.innerHTML = '<p class="muted">Selecciona ambos.</p>'; return; }
    resultBox.innerHTML = '<p class="muted">Generando comparación...</p>';
    setTimeout(()=> resultBox.innerHTML = renderComparison(a,b), 700);
    // opcional: guardar comparacion en DB si usuario logueado
    const user = window.appCurrentUser();
    if (user) {
      window.appSaveComparison({ user: user.uid, a: a.nombre, b: b.nombre, a_data: a, b_data: b }).catch(()=>{});
    }
  });

})();
