

// form section

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".containers");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
Shery.mouseFollower();
Shery.makeMagnet(".button,#menu-btn,.bts", {});
Shery.textAnimate(".head" /* Element to target.*/, {
  //Parameters are optional.
  style: 2,
  y: 10,
  delay: 0.1,
  duration: 1.5,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});

gsap.registerPlugin(ScrollTrigger);

var tl = gsap.timeline();
tl.from(".list", {
  y: -100,
  duration: 0.8,
  opacity: 0,
  stagger: 0.2,
});
