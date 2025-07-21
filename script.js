// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ハンバーガーメニュー
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const menuIcon = document.getElementById('menu-icon');
  let isOpen = false;

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menuIcon) {
      menuIcon.classList.remove('spin');
      setTimeout(() => menuIcon.classList.add('spin'), 10);
    }
    isOpen = !isOpen;
    if (navMenu) navMenu.style.display = isOpen ? 'flex' : 'none';
    if (!isOpen && menuIcon) {
      menuIcon.src = 'menu.png';
      menuIcon.alt = 'menu';
    }
  });

  // メニュー外クリックで閉じる
  window.addEventListener('click', (e) => {
    if (
      isOpen &&
      navMenu &&
      !navMenu.contains(e.target) &&
      hamburger &&
      !hamburger.contains(e.target)
    ) {
      navMenu.style.display = 'none';
      if (menuIcon) {
        menuIcon.src = 'menu.png';
        menuIcon.alt = 'menu';
      }
      isOpen = false;
    }
  });

  // タブ切り替え
  const tabs = document.querySelectorAll('.tab');
  const communities = document.querySelectorAll('.community');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelector('.tab.active')?.classList.remove('active');
      tab.classList.add('active');
      const group = tab.dataset.group;
      communities.forEach(sec => {
        sec.classList.toggle('active', sec.dataset.group === group);
      });
    });
  });

  // ゲスト横スクロール
  document.querySelectorAll('.community').forEach(section => {
    const container = section.querySelector('.card-container');
    const btnLeft  = section.querySelector('.scroll-btn.left');
    const btnRight = section.querySelector('.scroll-btn.right');
    const scrollAmount = 216;
    if (btnLeft && container) {
      btnLeft.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
    if (btnRight && container) {
      btnRight.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });

  // === Intersection Observerでアニメ制御 ===

  // main-message/fadein-text (ご挨拶のふわっと)
  document.querySelectorAll('.main-message, .fadein-text').forEach(el => {
    el.classList.remove('visible'); // 最初は非表示
    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
  });

  // schedule-row（タイムスケジュール画像アニメ）
  document.querySelectorAll('.schedule-row').forEach(row => {
    // 最初は止めておく
    row.querySelectorAll('.hop-img').forEach(img => {
      img.style.animationPlayState = 'paused';
    });
    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.hop-img').forEach(img => {
              img.style.animationPlayState = 'running';
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(row);
  });

});
