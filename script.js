
// =================================
// A LITTLE WORLD FOR GENTLEMAN
// =================================

let currentPage = 1;
const totalPages = 9;

// PAGE NAVIGATION

function showPage(pageNumber) {

  if (pageNumber < 1 || pageNumber > totalPages) {
    return;
  }

  const targetPage = document.getElementById("page" + pageNumber);

  if (!targetPage) {
    console.error("Page " + pageNumber + " not found!");
    return;
  }

  currentPage = pageNumber;

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  targetPage.classList.add("active");

  // PROGRESS BAR

  const progress = (pageNumber / totalPages) * 100;

  document.getElementById("progressBar")
    .style.width = progress + "%";

  document.getElementById("pageCount").textContent =
    "Page " + pageNumber + " of " + totalPages;

  // SCROLL TO TOP

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

// NEXT BUTTONS

document.querySelectorAll("[data-next]").forEach(button => {

  button.addEventListener("click", () => {

    const nextPage = Number(button.dataset.next);

    showPage(nextPage);

  });

});

// BACK BUTTONS

document.querySelectorAll(".page").forEach((page, index) => {

  if (index === 0) return;

  const backButton = document.createElement("button");

  backButton.className = "back-btn";
  backButton.textContent = "← Go Back";
  backButton.type = "button";

  backButton.addEventListener("click", () => {
    showPage(currentPage - 1);
  });

  const nextButton = page.querySelector(".next-btn");

  if (nextButton) {
    page.insertBefore(backButton, nextButton);
  } else {
    page.appendChild(backButton);
  }

});

// ENVELOPE ANIMATION

const envelope = document.getElementById("envelope");

if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
}

// SECRET MESSAGE

const secretBtn = document.getElementById("secretBtn");
const secretMessage = document.getElementById("secretMessage");
const secretNext = document.getElementById("secretNext");
const secretEnvelope = document.getElementById("secretEnvelope");

if (secretBtn && secretMessage && secretNext && secretEnvelope) {

  secretBtn.addEventListener("click", () => {

    secretMessage.classList.remove("hidden");
    secretNext.classList.remove("hidden");
    secretBtn.classList.add("hidden");
    secretEnvelope.classList.add("hidden");

  });

}

// MUSIC PLAYER

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (music && musicBtn) {

  musicBtn.addEventListener("click", async () => {

    if (music.paused) {

      try {

        await music.play();
        musicBtn.textContent = "♫ Pause Music";

      } catch (error) {

        musicBtn.textContent = "Music unavailable";

        alert("Please add your lofi.mp3 music file first.");

      }

    } else {

      music.pause();
      musicBtn.textContent = "♫ Play Music";

    }

  });

  music.addEventListener("ended", () => {
    musicBtn.textContent = "♫ Play Music";
  });

}

// FLOATING HEARTS

function createHeart() {

  const heart = document.createElement("span");

  heart.className = "floating-heart";

  const heartTypes = ["♡", "♥", "💕", "💗"];

  heart.textContent =
    heartTypes[Math.floor(Math.random() * heartTypes.length)];

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.fontSize =
    (12 + Math.random() * 18) + "px";

  const duration = 5 + Math.random() * 5;

  heart.style.animationDuration = duration + "s";

  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);

}

setInterval(createHeart, 700);

// SPARKLES

function createSparkle() {

  const sparkle = document.createElement("span");

  sparkle.className = "sparkle";
  sparkle.textContent = "✧";

  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";

  sparkle.style.fontSize =
    (10 + Math.random() * 12) + "px";

  document.getElementById("sparkles").appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 4000);

}

setInterval(createSparkle, 900);

// RESTART WEBSITE

const restartBtn = document.getElementById("restartBtn");

if (restartBtn) {

  restartBtn.addEventListener("click", () => {

    showPage(1);

    if (envelope) {
      envelope.classList.remove("open");
    }

    if (secretMessage) {
      secretMessage.classList.add("hidden");
    }

    if (secretBtn) {
      secretBtn.classList.remove("hidden");
    }

    if (secretNext) {
      secretNext.classList.add("hidden");
    }

    if (secretEnvelope) {
      secretEnvelope.classList.remove("hidden");
    }

    if (music && !music.paused) {
      music.pause();
      musicBtn.textContent = "♫ Play Music";
    }

  });

}

// INITIAL PAGE

showPage(1);
