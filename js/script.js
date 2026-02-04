const heroCard = document.querySelector(".hero-card");

window.addEventListener("scroll", () => {
  const position = heroCard.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight - 100) {
    heroCard.style.opacity = "1";
  }
});
