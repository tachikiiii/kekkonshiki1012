// ================================
// DOMContentLoadedイベントでまとめる
// ================================
document.addEventListener("DOMContentLoaded", () => {

  const splashScreen = document.getElementById('splash-screen');
  const mainContent = document.querySelector('.main-content');
  
  // 3秒後にスプラッシュスクリーンをフェードアウト
  setTimeout(() => {
    splashScreen.classList.add('fade-out');
    
    // フェードアウト完了後にメインコンテンツを表示
    setTimeout(() => {
      splashScreen.style.display = 'none';
      mainContent.classList.add('show');
    }, 1000); // CSS transitionと同じ時間
  }, 3000); // 3秒間表示

  // ---- ハンバーガーメニュー ----
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('sidebar');
  let isOpen = false;

  // メニューを閉じる関数
  function closeSidebar() {
    if (isOpen && navMenu && hamburger) {
      navMenu.style.display = 'none';
      hamburger.classList.remove('open');
      isOpen = false;
    }
  }

  // ハンバーガークリックでメニュー開閉・アニメーション
  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    hamburger.classList.toggle('open', isOpen);
    navMenu.style.display = isOpen ? 'flex' : 'none';
  });

  // サイドバーのメニュー項目をクリックした時にメニューを閉じる
  const menuLinks = navMenu?.querySelectorAll('a');
  menuLinks?.forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });

  // 画面どこかクリックでメニュー閉じ（サイドバーの外をクリックした場合）
  document.addEventListener('click', (e) => {
    if (
      isOpen &&
      navMenu &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  // ESCキーでメニュー閉じ
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && isOpen) {
      closeSidebar();
    }
  });

  // ================================
  // コミュニティ（サブタブ）切り替え
  // ================================
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

  // ================================
  // ゲスト横スクロール（必要な場合のみ）
  // ================================
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

  // ================================
  // Intersection Observerでアニメ制御
  // ================================
  document.querySelectorAll('.main-message, .fadein-text').forEach(el => {
    el.classList.remove('visible'); // 最初は非表示

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.remove('visible');
            void el.offsetWidth; // ←再発火の裏ワザ
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

  // ================================
  // schedule-row（タイムスケジュール画像アニメ）
  // ================================
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

  // ================================
  // 自己紹介モーダル
  // ================================

  
  const profiles = {
    shigeto: `
      <h3>繁戸 一輝（しげと かずき）</h3>
      <p>1993/10/8 生まれ<br>兵庫県出身　ESTJ</p>
      <p><b>「繁戸」</b><br>全国順位　32,108位<br>全国人数　約90人（珍！）</p>
      <p>→ 新婦友達に「しげとって<br>下の名前じゃないんだ」<br>とよく言われる</p>
    `,
    tachiki: `
      <h3>立木 仁実（たちき ひとみ）</h3>
      <p>1994/11/8 生まれ<br>千葉県出身　ENFP</p>
      <p><b>「立木」</b><br>全国順位　2,554位<br>全国人数　約5,400人</p>
      <p>→ 自分より珍しい名字の人に<br>出会ってしまった</p>
    `,
        cancelPolicy: `
      <h3>キャンセルポリシーについて</h3>
      <div style="text-align: left; font-size: 16px; line-height: 1.6;">
        <p><b>■ BEB5軽井沢</b></p>
        <p>・宿泊日の30日前まで：キャンセル料無料<br>
        ・31日前以降：規定のキャンセル料が発生</p>
        <p style="color: #e84a5f; font-weight: bold;">・各部屋での人数増減は各自で調整をお願いします</p>
        <br>
        <p><b>■ ポーラーハウス（コテージ）</b></p>
        ・チェックイン14日前まで：宿泊料金の50%返金<br>
        ・期限後：返金なし（オプション料金は手数料を引いて返金）<br>
        ・当日キャンセル：全額返金なし</p>
        
        <p><b>【天災の場合】</b><br>
        ・一年以内の別日振替可能（返金なし）<br>
        ・交通機関が通常運行の場合は通常のキャンセル料が発生<br>
        ・新型コロナ等パンデミック関連は天災扱い対象外</p>
        
        <p style="font-size: 14px; color: #666; margin-top: 20px;">
        ※ご質問等ございましたらご連絡ください
        </p>
      </div>
    `
  };

  const shigetoBtn = document.getElementById('shigeto');
  const tachikiBtn = document.getElementById('tachiki');
  const cancelPolicyLink = document.querySelector('.cancel-policy-link');
  const closeBtn = document.getElementById('closeBtn');
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modalText');

  if (shigetoBtn && tachikiBtn && closeBtn && modal && modalText) {
    shigetoBtn.onclick = () => showModal('shigeto');
    tachikiBtn.onclick = () => showModal('tachiki');
    if (cancelPolicyLink) {
      cancelPolicyLink.onclick = () => showModal('cancelPolicy');
    }
    closeBtn.onclick = closeModal;
    // モーダル外クリックで閉じる
    modal.onclick = (e) => {
      if (e.target.id === 'modal') closeModal();
    };
    // ESCキーで閉じる
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") closeModal();
    });

    function showModal(key) {
      modalText.innerHTML = profiles[key];
      modal.style.display = 'flex';
    }
    function closeModal() {
      modal.style.display = 'none';
    }
  }

  // ================================
  // Q&A 開閉
  // ================================

  const dts = document.querySelectorAll('dt');
  dts.forEach(dt => {
    dt.addEventListener('click', () => {
      dt.parentNode.classList.toggle('appear');

      dts.forEach(el => {
        if (dt != el) {
          el.parentNode.classList.remove('appear');
        }
      })
    });
  });

  // ================================
  // タイムラインが見えたときにアニメ開始
  // ================================
  const timeline = document.querySelector('.v-timeline');

  if (timeline) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timeline.classList.add('animate'); // 見えたら発火
          } else {
            timeline.classList.remove('animate'); // 見えなくなったら戻す
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(timeline);
  }

});

  // ご祝儀
   function toggleDetails(detailsId) {
            const details = document.getElementById(detailsId);
            const option = details.previousElementSibling;
            
            // 他の詳細を閉じる
            document.querySelectorAll('.payment-details').forEach(detail => {
                if (detail.id !== detailsId) {
                    detail.classList.remove('show');
                    detail.previousElementSibling.classList.remove('active');
                }
            });
            
            // 現在の詳細をトグル
            details.classList.toggle('show');
            option.classList.toggle('active');
        }