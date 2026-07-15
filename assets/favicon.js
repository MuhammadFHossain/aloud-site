/* aloud — gently rotating tomato favicon.
   Redraws a canvas each frame and points the icon <link> at it. The static
   assets/fav-tomato.png is the fallback when JS is off. Pauses in a hidden tab. */
(function () {
  try {
    var link = document.querySelector('link[rel~="icon"]');
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    var S = 64;
    var cv = document.createElement('canvas'); cv.width = cv.height = S;
    var ctx = cv.getContext('2d');
    if (!ctx) return;

    var img = new Image(), ready = false;
    img.onload = function () { ready = true; requestAnimationFrame(loop); };
    img.src = 'assets/fav-tomato-ink.png';

    var angle = 0, last = 0, SPEED = 0.85; // radians/sec (~7.4s per turn)

    function roundRect(c, x, y, w, h, r) {
      c.beginPath(); c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    }
    function draw() {
      ctx.clearRect(0, 0, S, S);
      ctx.fillStyle = '#FCFBF8'; roundRect(ctx, 0, 0, S, S, 12); ctx.fill();
      ctx.save();
      ctx.translate(S / 2, S / 2); ctx.rotate(angle);
      var d = S * 0.72; ctx.drawImage(img, -d / 2, -d / 2, d, d);
      ctx.restore();
      try { link.href = cv.toDataURL('image/png'); } catch (e) {}
    }
    function loop(t) {
      if (!ready) { requestAnimationFrame(loop); return; }
      if (document.hidden) { last = t; requestAnimationFrame(loop); return; }
      if (!last) last = t;
      if (t - last >= 60) {                     // ~16 fps is plenty for a tab icon
        angle += SPEED * ((t - last) / 1000);
        if (angle > Math.PI * 2) angle -= Math.PI * 2;
        draw(); last = t;
      }
      requestAnimationFrame(loop);
    }
  } catch (e) {}
})();
