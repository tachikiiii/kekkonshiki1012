// script.js
// 全体の初期化

document.addEventListener("DOMContentLoaded", () => {
  // ハンバーガーメニューの切り替え & アイコン回転
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const menuIcon = document.getElementById('menu-icon');
  let isOpen = false;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // 他のクリック干渉を防止

    // アイコンに回転アニメーションを付与
    if (menuIcon) {
      menuIcon.classList.remove('spin');
      setTimeout(() => menuIcon.classList.add('spin'), 10);
    }

    // メニュー表示をトグル
    isOpen = !isOpen;
    if (navMenu) navMenu.style.display = isOpen ? 'flex' : 'none';
    if (!isOpen && menuIcon) {
      menuIcon.src = 'menu.png';  // メニュー閉時の画像
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

  // ページ読み込み後 1.5秒でテキストをふわっと表示
  setTimeout(() => {
    const fadein = document.querySelector('.fadein-text');
    if (fadein) fadein.classList.add('visible');
  }, 1500);

  // タブ切り替え
  const tabs = document.querySelectorAll('.tab');
  const communities = document.querySelectorAll('.community');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 既存の active タブをリセット
      const current = document.querySelector('.tab.active');
      if (current) current.classList.remove('active');
      // クリックされたタブを active 化
      tab.classList.add('active');

      // 対応するコミュニティ表示
      const group = tab.dataset.group;
      communities.forEach(sec => {
        sec.classList.toggle('active', sec.dataset.group === group);
      });
    });
  });

  // ゲスト紹介：横スクロールボタン制御
  document.querySelectorAll('.community').forEach(section => {
    const container = section.querySelector('.card-container');
    const btnLeft  = section.querySelector('.scroll-btn.left');
    const btnRight = section.querySelector('.scroll-btn.right');
    const scrollAmount = 216; // カード幅(200px) + margin(16px)

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
});
