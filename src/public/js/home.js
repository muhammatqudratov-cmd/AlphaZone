console.log("Home frontend javascript file");

function animateHeroCounters() {
  const counters = document.querySelectorAll(".hero-stat-num[data-target]");
  if (!counters.length) return;

  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-target") || 0);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target.toString();
      }
    }

    requestAnimationFrame(tick);
  });
}

(function () {
  const sphereEl = document.querySelector(".sphere-animation");
  if (!sphereEl || typeof anime === "undefined") {
    animateHeroCounters();
    return;
  }

  function fitElementToParent(el, padding) {
    let timeout = null;

    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, { scale: 1 });
      const pad = padding || 0;
      const parentEl = el.parentNode;
      const elOffsetWidth = el.offsetWidth - pad;
      const parentOffsetWidth = parentEl.offsetWidth;
      const ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(() => anime.set(el, { scale: ratio }), 10);
    }

    resize();
    window.addEventListener("resize", resize);
  }

  const spherePathEls = sphereEl.querySelectorAll(".sphere path");
  const pathLength = spherePathEls.length;
  const animations = [];

  fitElementToParent(sphereEl);

  const breathAnimation = anime({
    begin: function () {
      for (let i = 0; i < pathLength; i++) {
        animations.push(
          anime({
            targets: spherePathEls[i],
            stroke: {
              value: ["rgba(255,75,75,1)", "rgba(80,80,80,.35)"],
              duration: 500,
            },
            translateX: [2, -4],
            translateY: [2, -4],
            easing: "easeOutQuad",
            autoplay: false,
          })
        );
      }
    },
    update: function (ins) {
      animations.forEach(function (animation, i) {
        const percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false,
  });

  const introAnimation = anime.timeline({ autoplay: false }).add(
    {
      targets: spherePathEls,
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 3900,
        easing: "easeInOutCirc",
        delay: anime.stagger(190, { direction: "reverse" }),
      },
      duration: 2000,
      delay: anime.stagger(60, { direction: "reverse" }),
      easing: "linear",
    },
    0
  );

  const shadowAnimation = anime(
    {
      targets: "#sphereGradient",
      x1: "25%",
      x2: "25%",
      y1: "0%",
      y2: "75%",
      duration: 30000,
      easing: "easeOutQuint",
      autoplay: false,
    },
    0
  );

  introAnimation.play();
  breathAnimation.play();
  shadowAnimation.play();
})();
