// Atos Milla: comportamento do site (sem animações)
(()=>{
  const WA='5547992841403';

  // links de WhatsApp com mensagem pronta
  document.querySelectorAll('[data-wa]').forEach(a=>{
    a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(a.dataset.wa);
    a.target='_blank';a.rel='noopener';
  });
  const ano=document.getElementById('ano');
  if(ano)ano.textContent=new Date().getFullYear();

  // menu do celular
  const nav=document.getElementById('gnav'),b=document.getElementById('burger');
  if(nav&&b){
    b.addEventListener('click',()=>{const o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    document.querySelectorAll('#gnav-links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');b.setAttribute('aria-expanded',false)}));
  }

  // carrosséis: setas que avançam um card e se desligam nas pontas
  document.querySelectorAll('[data-rail]').forEach(rail=>{
    const t=rail.querySelector('.rail-track'),p=rail.querySelector('[data-prev]'),n=rail.querySelector('[data-next]');
    if(!t||!p||!n)return;
    const step=()=>{const c=t.children[0];return c?c.getBoundingClientRect().width+20:400};
    const sync=()=>{p.disabled=t.scrollLeft<4;n.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4};
    p.addEventListener('click',()=>t.scrollBy({left:-step(),behavior:'auto'}));
    n.addEventListener('click',()=>t.scrollBy({left:step(),behavior:'auto'}));
    t.addEventListener('scroll',sync,{passive:true});addEventListener('resize',sync);sync();
  });

  // barrinha que mostra que dá para arrastar os ícones
  const icn=document.querySelector('.iconnav'),sw=document.querySelector('.swipe');
  if(icn&&sw){
    const thumb=sw.querySelector('.swipe-thumb'),trk=sw.querySelector('.swipe-track');
    const drawSwipe=()=>{
      const over=icn.scrollWidth-icn.clientWidth;
      sw.classList.toggle('on',over>4);
      if(over<=4)return;
      const tw=trk.clientWidth,w=Math.max(24,tw*icn.clientWidth/icn.scrollWidth);
      thumb.style.width=w+'px';
      thumb.style.transform='translateX('+((tw-w)*(icn.scrollLeft/over)).toFixed(1)+'px)';
    };
    icn.addEventListener('scroll',drawSwipe,{passive:true});
    addEventListener('resize',drawSwipe);drawSwipe();
  }

  // links que abrem em outra aba avisam isso para quem usa leitor de tela
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{
    const wa=a.href.indexOf('wa.me')>-1,txt=wa?'abre o WhatsApp em outra aba':'abre em outra aba';
    const nome=a.getAttribute('aria-label')||a.textContent.replace(/\s+/g,' ').trim();
    if(nome.indexOf(txt)<0)a.setAttribute('aria-label',nome+' ('+txt+')');
  });

  // carrosséis podem ser rolados pelo teclado (setas)
  document.querySelectorAll('.rail-track').forEach(t=>{
    const h=t.closest('section')&&t.closest('section').querySelector('.shelf-h .a');
    t.tabIndex=0;t.setAttribute('role','region');t.setAttribute('aria-label',h?h.textContent.replace(/\.$/,''):'Lista');
  });

  // Esc fecha o menu do celular
  if(nav&&b)document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');b.setAttribute('aria-expanded',false);b.focus()}});

  // aviso de cookies (só informa: o site não usa cookies de rastreamento)
  let visto=false;
  try{visto=localStorage.getItem('am-aviso')==='1'}catch(e){}
  if(!visto){
    const bar=document.createElement('div');
    bar.className='cookie-bar';bar.setAttribute('role','region');bar.setAttribute('aria-label','Aviso de cookies');
    bar.innerHTML='<p>Este site não usa cookies de rastreamento nem propaganda. <a href="cookies.html">Saiba mais</a></p><button type="button">Entendi</button>';
    bar.querySelector('button').addEventListener('click',()=>{try{localStorage.setItem('am-aviso','1')}catch(e){}bar.remove()});
    document.body.appendChild(bar);
  }

  // tudo aparece pronto, sem entrada animada
  document.querySelectorAll('.rv').forEach(e=>e.classList.add('in','settled'));
  document.querySelectorAll('[data-brand]').forEach(e=>e.classList.add('done'));
  document.querySelectorAll('[data-live]').forEach(e=>e.classList.add('live'));
})();
