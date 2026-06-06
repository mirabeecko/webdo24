/* ── CYBERPUNK EFFECTS ── */

/* PARTICLE CANVAS */
(function(){
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], symbols = ['01','10','11','00','{}','//','<>','&&','||','=>'];

  function resize(){
    const hero = document.getElementById('hero');
    if(!hero) return;
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.color = ['#00C4B5','#FF3366','#FF9500','#00e0d0'][Math.floor(Math.random()*4)];
      this.isSymbol = Math.random() > 0.85;
      this.symbol = symbols[Math.floor(Math.random()*symbols.length)];
      this.symbolSize = Math.random() * 8 + 6;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update(){
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if(this.life > this.maxLife || this.x < -20 || this.x > W+20 || this.y < -20 || this.y > H+20){
        this.reset();
      }
    }
    draw(){
      const fade = this.life < 30 ? this.life/30 : (this.life > this.maxLife-30 ? (this.maxLife-this.life)/30 : 1);
      ctx.globalAlpha = this.alpha * fade;
      if(this.isSymbol){
        ctx.font = `${this.symbolSize}px monospace`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  for(let i=0;i<60;i++) particles.push(new Particle());

  function drawConnections(){
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 120){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,196,181,${0.06 * (1-dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* GLITCH AUTO-TRIGGER */
(function(){
  const glitches = document.querySelectorAll('.glitch-text');
  if(!glitches.length) return;
  setInterval(() => {
    glitches.forEach(el => {
      el.classList.add('active');
      setTimeout(() => el.classList.remove('active'), 300);
    });
  }, 4500);
})();
