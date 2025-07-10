document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const menuImg = hamburger.querySelector("img");

  let isOpen = false;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // 他のクリックイベントとの干渉防止

    isOpen = !isOpen;
    if (isOpen) {
      navMenu.style.display = "flex";
      menuImg.src = "close.png"; // ← メニュー開時の画像
      menuImg.alt = "close";
    } else {
      navMenu.style.display = "none";
      menuImg.src = "menu.png";  // ← メニュー閉時の画像
      menuImg.alt = "menu";
    }
  });

  // メニュー外をクリックで閉じる
  window.addEventListener("click", (e) => {
    if (
      isOpen &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navMenu.style.display = "none";
      menuImg.src = "menu.png";
      menuImg.alt = "menu";
      isOpen = false;
    }
  });
});
