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

const image = document.getElementById("menu-icon");
image.addEventListener("click", function () {
  // 既に回転中なら一度外して再付与して何度でも回転できるように
  image.classList.remove("spin");
  // 次のフレームでclassを再追加
  setTimeout(() => {
    image.classList.add("spin");
  }, 10);
});
