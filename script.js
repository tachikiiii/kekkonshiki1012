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
    const btnLeft = section.querySelector('.scroll-btn.left');
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
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // ★見えたらクラス付与→アニメーション
            el.classList.remove('visible');
            // クラスを一旦外して即再付与で毎回アニメをリセット
            void el.offsetWidth; // reflow
            el.classList.add('visible');
          } else {
            // ★画面外に出たら消す（次回再びアニメ発火のため）
            el.classList.remove('visible');
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
  });


  // schedule-row（タイムスケジュール画像アニメ）
  document.querySelectorAll('.schedule-row').forEach(row => {
  const imgs = row.querySelectorAll('.hop-img');
  // 一度だけじゃなく毎回コントロール
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imgs.forEach(img => {
            img.classList.remove('animated');
            void img.offsetWidth;
            img.classList.add('animated');
          });
        } else {
          imgs.forEach(img => {
            img.classList.remove('animated');
          });
        }
      });
    },
    { threshold: 0.35 }
  );
  observer.observe(row);
});




});

// 自己紹介データ
const profiles = {
  shigeto: `
    <h3>繁戸 一輝（しげと かずき）</h3>
    <p>1993/10/8 生まれ<br>神戸出身　ESTJ</p>
    <p><b>「繁戸」</b><br>全国順位　32,108位<br>全国人数　約90人（珍！）</p>
  `,
  tachiki: `
    <h3>立木 仁実（たちき ひとみ）</h3>
    <p>1994/11/8 生まれ<br>千葉出身　ENFP</p>
    <p><b>「立木」</b><br>全国順位　2,554位<br>全国人数　約5,400人</p>
    <p>→91人目の繁戸へ</p>
  `
};

document.getElementById('shigeto').onclick = () => showModal('shigeto');
document.getElementById('tachiki').onclick = () => showModal('tachiki');
document.getElementById('closeBtn').onclick = closeModal;
document.getElementById('modal').onclick = (e) => {
  if (e.target.id === 'modal') closeModal();
};

function showModal(key) {
  document.getElementById('modalText').innerHTML = profiles[key];
  document.getElementById('modal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
