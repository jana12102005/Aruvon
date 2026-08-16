document.addEventListener('DOMContentLoaded', function(){
  // scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{threshold:0.15});
  document.querySelectorAll('.reveal, .reveal-stag').forEach(el=>io.observe(el));

  // mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.querySelector('.mobile-panel');
  if(toggle && panel){
    toggle.addEventListener('click', ()=> panel.classList.toggle('open'));
    panel.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> panel.classList.remove('open')));
  }

  // domain tab filter (courses page)
  const tabs = document.querySelectorAll('.domain-tab');
  const blocks = document.querySelectorAll('.domain-block');
  if(tabs.length){
    tabs.forEach(tab=>{
      tab.addEventListener('click', ()=>{
        tabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.domain;
        blocks.forEach(b=>{
          b.style.display = (target === 'all' || b.dataset.domain === target) ? '' : 'none';
        });
      });
    });
  }
});

// hero pixel-dissolve canvas — brand mark motif, echoes the logo's dissolve style
function initPixelHero(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h,dpr;
  function size(){
    dpr = Math.min(window.devicePixelRatio||1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w*dpr; canvas.height = h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  size();
  window.addEventListener('resize', size);

  const cell = 14, gap = 4;
  const cols = Math.floor(w/(cell+gap));
  const rows = Math.floor(h/(cell+gap));

  function inShape(cx, cy){
    const nx = cx/cols, ny = cy/rows;
    const apexX = 0.5, apexY = 0.08;
    const leftLegX = 0.18, rightLegX = 0.82, baseY = 0.86;
    const tLeft = (ny-apexY)/(baseY-apexY);
    const leftEdge = apexX + (leftLegX-apexX)*tLeft;
    const rightEdge = apexX + (rightLegX-apexX)*tLeft;
    const legWidth = 0.075;
    const onLeftLeg = Math.abs(nx-leftEdge) < legWidth && ny>apexY && ny<baseY;
    const onRightLeg = Math.abs(nx-rightEdge) < legWidth && ny>apexY && ny<baseY;
    const onSwoosh = ny>0.56 && ny<0.68 && nx>0.22 && nx<0.8;
    return onLeftLeg || onRightLeg || onSwoosh;
  }

  const particles = [];
  for(let y=0;y<rows;y++){
    for(let x=0;x<cols;x++){
      const target = inShape(x,y);
      particles.push({
        x, y, target,
        ox: Math.random()*cols, oy: Math.random()*rows,
        phase: Math.random()*Math.PI*2,
        speed: 0.006+Math.random()*0.01,
        alphaBase: target? (0.55+Math.random()*0.4) : (0.05+Math.random()*0.08),
        color: target ? (Math.random()>0.35 ? [47,224,198] : [22,48,87]) : [255,255,255]
      });
    }
  }

  let t = 0;
  function draw(){
    t += 1;
    ctx.clearRect(0,0,w,h);
    const settleProgress = Math.min(1, t/140);
    particles.forEach(p=>{
      const ease = 1 - Math.pow(1-settleProgress, 3);
      const curX = p.ox + (p.x - p.ox)*ease;
      const curY = p.oy + (p.y - p.oy)*ease;
      const bob = Math.sin(t*p.speed + p.phase)*(p.target?1.2:0.4);
      const px = curX*(cell+gap);
      const py = curY*(cell+gap) + bob;
      const flicker = p.target ? (0.75+0.25*Math.sin(t*0.02+p.phase)) : (0.5+0.5*Math.sin(t*0.015+p.phase));
      const a = p.alphaBase*flicker*ease + (p.target?0:0.02);
      ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${a})`;
      const s = p.target ? cell : cell*0.6;
      ctx.fillRect(px, py, s, s);
    });
    requestAnimationFrame(draw);
  }
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    requestAnimationFrame(draw);
  } else {
    t = 500; draw();
  }
}
document.addEventListener('DOMContentLoaded', ()=> initPixelHero('pixelCanvas'));
