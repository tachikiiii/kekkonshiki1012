document.addEventListener("DOMContentLoaded", () => {
  // --- ハンバーガーメニュー ---
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

  // === コミュニティ（サブタブ）切り替え ===
  // 各.tab_contentごとに独立して切り替える
  document.querySelectorAll('.tab_content').forEach(tabContent => {
    const tabs = tabContent.querySelectorAll('.tab');
    const communities = tabContent.querySelectorAll('.community');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // タブactive切替
        tabContent.querySelectorAll('.tab.active').forEach(a => a.classList.remove('active'));
        tab.classList.add('active');
        // コミュニティ切替
        const group = tab.dataset.group;
        communities.forEach(comm => {
          comm.classList.toggle('active', comm.dataset.group === group);
        });
      });
    });
  });

  // --- ゲスト横スクロール（必要な場合のみ） ---
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
  document.querySelectorAll('.main-message, .fadein-text').forEach(el => {
    el.classList.remove('visible'); // 最初は非表示

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.remove('visible');
            void el.offsetWidth; // reflow
            el.classList.add('visible');
          } else {
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

  // === 自己紹介モーダル ===
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
      <p>→91人目の繁戸へ...！</p>
    `
  };

  const shigetoBtn = document.getElementById('shigeto');
  const tachikiBtn = document.getElementById('tachiki');
  const closeBtn = document.getElementById('closeBtn');
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modalText');

  if (shigetoBtn && tachikiBtn && closeBtn && modal && modalText) {
    shigetoBtn.onclick = () => showModal('shigeto');
    tachikiBtn.onclick = () => showModal('tachiki');
    closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target.id === 'modal') closeModal();
    };

    function showModal(key) {
      modalText.innerHTML = profiles[key];
      modal.style.display = 'flex';
    }
    function closeModal() {
      modal.style.display = 'none';
    }
  }
});
