// Loja: mostra os produtos de assets/produtos.js com busca e categorias
(()=>{
  const WA='5547992841403';
  const lista=Array.isArray(window.PRODUTOS)?window.PRODUTOS:[];
  const grid=document.getElementById('mk-grid'),vazio=document.getElementById('mk-empty'),nada=document.getElementById('mk-none');
  const busca=document.getElementById('mk-search'),conta=document.getElementById('mk-count');
  const chips=[...document.querySelectorAll('.mk-chip')];
  if(!grid)return;
  let cat='Todos';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s??'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');

  // número de produtos em cada categoria
  chips.forEach(c=>{
    const n=c.dataset.cat==='Todos'?lista.length:lista.filter(p=>p.categoria===c.dataset.cat).length;
    c.querySelector('i').textContent=n;
  });

  const card=p=>{
    const link='https://wa.me/'+WA+'?text='+encodeURIComponent(p.mensagem||('Oi Atos! Quero saber mais sobre '+p.nome+'.'));
    const img=p.imagem?'<img src="'+esc(p.imagem)+'" alt="" loading="lazy">':'<span class="mk-ph" aria-hidden="true"></span>';
    return '<article class="mk-card"><div class="mk-img">'+img+'</div><div class="mk-body">'+
      '<p class="mk-cat">'+esc(p.categoria)+'</p><h3>'+esc(p.nome)+'</h3><p class="mk-desc">'+esc(p.descricao)+'</p>'+
      '<div class="mk-foot"><b class="mk-price">'+esc(p.preco||'Sob consulta')+'</b>'+
      '<a class="btn mk-buy" href="'+link+'" target="_blank" rel="noopener" aria-label="Comprar '+esc(p.nome)+' (abre o WhatsApp em outra aba)">Comprar</a></div></div></article>';
  };

  const draw=()=>{
    const q=norm(busca.value.trim());
    const itens=lista.filter(p=>(cat==='Todos'||p.categoria===cat)&&(!q||norm(p.nome+' '+p.descricao+' '+p.categoria).includes(q)));
    grid.innerHTML=itens.map(card).join('');
    conta.textContent=itens.length===1?'1 produto':itens.length+' produtos';
    vazio.hidden=lista.length>0;
    nada.hidden=!(lista.length>0&&itens.length===0);
    grid.hidden=itens.length===0;
  };

  chips.forEach(c=>c.addEventListener('click',()=>{
    cat=c.dataset.cat;
    chips.forEach(x=>x.setAttribute('aria-pressed',x===c));
    draw();
  }));
  busca.addEventListener('input',draw);
  draw();
})();
