//Меня навигации и активность кнопочек
let i = 0;
let hm_height = 95;
function let_breakpoints() {
  return li_hm_scroll = [
    0,
    document.querySelector("section.services").offsetTop - hm_height,
    document.querySelector("section.portfolio").offsetTop - hm_height,
    document.querySelector("section.about").offsetTop - hm_height,
    document.querySelector("section.quote").offsetTop - hm_height
  ];
}
let_breakpoints();
// При изменении размера документа
window.addEventListener("resize", () => {
  let_breakpoints();
});

for (let item of document.querySelectorAll(".header li.hm-names")) {
  item.addEventListener('click', () => {
    i = Array.from(document.querySelectorAll(".header li.hm-names")).indexOf(item);
    window.scrollTo(0, li_hm_scroll[i]);
    console.log(i + " " + li_hm_scroll[i]);
  });
}

//Кнопочка меню при экране <768px
document.querySelector('.menu-singolo button').addEventListener('click', () => {
  document.querySelector('.main-menu-burger').classList.add("active");
  document.querySelector('div.dark').style.display = "block";
})
document.querySelector('.main-menu-burger button').addEventListener('click', () => {
  document.querySelector('.main-menu-burger').classList.remove("active");
  document.querySelector('div.dark').style.display = "none";
})
//Скролл для всплывающего меню
for (let item of document.querySelectorAll(".main-menu-burger li.hm-names")) {
  item.addEventListener('click', () => {
    console.log(li_hm_scroll);
    i = Array.from(document.querySelectorAll(".main-menu-burger li.hm-names")).indexOf(item);
    document.querySelector('.main-menu-burger').classList.remove("active");
    document.querySelector('div.dark').style.display = "none";
    window.scrollTo(0, li_hm_scroll[i]);
    console.log(i + " b " + li_hm_scroll[i]);
  });
}
//Активность кнопочек для бургер-меню
window.addEventListener('scroll', () => {
  for (i = 0; i < 4; i++) {
    if (window.scrollY >= li_hm_scroll[i] && window.scrollY < li_hm_scroll[i + 1]) {
      document.querySelectorAll(".main-menu-burger li.hm-names")[i].classList.add('active');
    } else {
      document.querySelectorAll(".main-menu-burger li.hm-names")[i].classList.remove('active');
    }
  }
  if (document.querySelectorAll(".main-menu-burger li.hm-names")[4].classList.contains('active')) { document.querySelectorAll(".main-menu-burger li.hm-names")[3].classList.remove('active'); }
  if (window.scrollY >= li_hm_scroll[3] && (window.scrollY + 1100) >= document.querySelector("footer").offsetTop) {
    document.querySelectorAll(".main-menu-burger li.hm-names")[4].classList.add('active');
  } else {
    document.querySelectorAll(".main-menu-burger li.hm-names")[4].classList.remove('active');
  }
})


//Активация кнопочек в меня во время листания страницы
window.addEventListener('scroll', () => {
  for (i = 0; i < 4; i++) {
    if (window.scrollY >= li_hm_scroll[i] && window.scrollY < li_hm_scroll[i + 1]) {
      document.querySelectorAll(".header li.hm-names")[i].classList.add('active');
    } else {
      document.querySelectorAll(".header li.hm-names")[i].classList.remove('active');
    }
  }
  if (document.querySelectorAll(".header li.hm-names")[4].classList.contains('active')) { document.querySelectorAll(".header li.hm-names")[3].classList.remove('active'); }
  if (window.scrollY >= li_hm_scroll[3] && (window.scrollY + 1100) >= document.querySelector("footer").offsetTop) {
    document.querySelectorAll(".header li.hm-names")[4].classList.add('active');
  } else {
    document.querySelectorAll(".header li.hm-names")[4].classList.remove('active');
  }
});

//Слайдер-экраны телефонов
function iphone_activation() {
  for (i = 0; i < document.querySelectorAll("svg.phone-button").length; i++) {
    let item = document.querySelectorAll("svg.phone-button")[i];
    let item_screen = document.querySelectorAll("svg.phone-button + div")[i];
    item.addEventListener('click', () => {
      if (item_screen.classList.contains("screen-off")) {
        item_screen.classList.remove("screen-off");
      } else {
        item_screen.classList.add("screen-off");
      }
    })
  }
}
//Слайдер-смена слайдов
function arrow_left_click() {
  slider_animation("left", "div.slider-screen");
}
function arrow_right_click() {
  slider_animation("right", "div.slider-screen");
}
document.querySelector("svg.arrow.left").addEventListener('click', arrow_left_click);
document.querySelector("svg.arrow.right").addEventListener('click', arrow_right_click);
let slider_screens_classes = ["slider-screen-1", "slider-screen-2"];
let slider_screen1 = document.querySelector("div.slider-screen-1").cloneNode(true);
let slider_screen2 = document.querySelector("div.slider-screen-2").cloneNode(true);
let slider_screens = [slider_screen1, slider_screen2];
document.querySelector("div.slider-screen").append(slider_screen1);
iphone_activation();
//Функция создания боковых слайдов
//item = "div.slider-screen-1";
function add_slides(item) {
  let item_now = document.querySelector(item);
  let item_left = item_now.cloneNode(true);
  let item_right = item_now.cloneNode(true);
  for (i = 0; i < slider_screens_classes.length; i++) { //создание нужных классов у боковых экранов
    if (item_now.classList.contains(slider_screens_classes[i])) {
      item_left.classList.remove(slider_screens_classes[i]);
      item_right.classList.remove(slider_screens_classes[i]);
      if (i != 0 && i != slider_screens_classes.length - 1) {
        item_left.classList.add(slider_screens_classes[i - 1]);
        item_right.classList.add(slider_screens_classes[i + 1]);
      } else if (i == 0) {
        item_left.classList.add(slider_screens_classes[slider_screens_classes.length - 1]);
        item_right.classList.add(slider_screens_classes[i + 1]);
      } else if (i == slider_screens_classes.length - 1) {
        item_right.classList.add(slider_screens_classes[0]);
        item_left.classList.add(slider_screens_classes[i - 1]);
      }
    }
  }
  for (i = 0; i < slider_screens_classes.length; i++) {// создание соответсвующих клонов
    if (item_left.classList.contains(slider_screens_classes[i])) {
      item_left = slider_screens[i].cloneNode(true);
    }
    if (item_right.classList.contains(slider_screens_classes[i])) {
      item_right = slider_screens[i].cloneNode(true);
    }
  }
  item_left.style.zIndex = "6";
  item_right.style.zIndex = "6";
  document.querySelector("div.slider-screen").prepend(item_left);
  document.querySelector("div.slider-screen").append(item_right);
}

//Функция анимации перехода(можно менять функцию прогресса ^^)
//slide_block="div.slider-screen"
function slider_animation(mode, slide_block) {
  let window_width_normalize = Number(String(getComputedStyle(document.documentElement).width).match(/[0-9]+/));
  if (window_width_normalize > 1020) { window_width_normalize = 1020; }
  document.querySelector("svg.arrow.left").removeEventListener('click', arrow_left_click);
  document.querySelector("svg.arrow.right").removeEventListener('click', arrow_right_click);
  add_slides(slide_block + ">div");
  document.querySelector("div.slider-screen").style.transform = "translateX(-" + window_width_normalize + ")px";
  let item_left = document.querySelectorAll(slide_block + ">div")[0];
  let item_now = document.querySelectorAll(slide_block + ">div")[1];
  let item_right = document.querySelectorAll(slide_block + ">div")[2];
  let animation_velocity = 0.5;
  let animation_width = Number(String(getComputedStyle(document.querySelector(slide_block)).width).match(/[0-9]+/)) / 3;
  let animation_time = animation_width / animation_velocity;
  function draw(progress) {
    if (mode == "left") {
      document.querySelector(slide_block).style.transform = "translateX(" + (-window_width_normalize + animation_width * progress) + "px)";
    }
    if (mode == "right") {
      document.querySelector(slide_block).style.transform = "translateX(" + (-window_width_normalize - animation_width * progress) + "px)";
    }
  }
  let start = performance.now();
  let animation = requestAnimationFrame(function animate() {
    let time = (performance.now() - start) / animation_time;
    let progress = time;
    if (progress >= 1) {
      cancelAnimationFrame(animation);
      if (mode == "left") {
        item_now.remove();
        item_right.remove();
        item_left.style.zIndex = "4";
      }
      if (mode == "right") {
        item_now.remove();
        item_left.remove();
        item_right.style.zIndex = "4";
      }
      document.querySelector(slide_block).style.transform = "translateX(0px)";
      document.querySelector("svg.arrow.left").addEventListener('click', arrow_left_click);
      document.querySelector("svg.arrow.right").addEventListener('click', arrow_right_click);
      iphone_activation()
    } else {
      draw(progress);
      requestAnimationFrame(animate)
    }
  })
}

//Меню навигации портфолио и составление портфолио
let portfolio_img = document.querySelectorAll(".portfolio-img");

//первая кнопочка
document.querySelectorAll(".portfolio-menu li")[0].addEventListener('click', () => {
  for (let item of document.querySelectorAll(".portfolio-menu li")) {
    item.classList.remove('active');
  }
  document.querySelectorAll(".portfolio-menu li")[0].classList.add('active');
  i = 0;
  while (document.querySelectorAll('.portfolio-img').length != 0) {
    document.querySelectorAll('.portfolio-img')[0].remove();
  }
  for (i = 0; i < portfolio_img.length; i++) {
    document.querySelector(".portfolio-pictures").append(portfolio_img[i]);
  }
});
//Вторая
document.querySelectorAll(".portfolio-menu li")[1].addEventListener('click', () => {
  for (let item of document.querySelectorAll(".portfolio-menu li")) {
    item.classList.remove('active');
  }
  document.querySelectorAll(".portfolio-menu li")[1].classList.add('active');
  for (i = document.querySelectorAll('.portfolio-img').length - 1; i >= 0; i--) {
    let j = Math.floor(i + Math.random() * (document.querySelectorAll('.portfolio-img').length - i));
    document.querySelectorAll('.portfolio-img')[document.querySelectorAll('.portfolio-img').length - 1].after(document.querySelectorAll('.portfolio-img')[j]);
  }
});
//Третья
document.querySelectorAll(".portfolio-menu li")[2].addEventListener('click', () => {
  for (let item of document.querySelectorAll(".portfolio-menu li")) {
    item.classList.remove('active');
  }
  document.querySelectorAll(".portfolio-menu li")[2].classList.add('active');
  for (i = document.querySelectorAll('.portfolio-img').length - 1; i >= 0; i--) {
    let j = Math.floor(i + Math.random() * (document.querySelectorAll('.portfolio-img').length - i));
    document.querySelectorAll('.portfolio-img')[document.querySelectorAll('.portfolio-img').length - 1].after(document.querySelectorAll('.portfolio-img')[j]);
  }
});
//Четверая
document.querySelectorAll(".portfolio-menu li")[3].addEventListener('click', () => {
  for (let item of document.querySelectorAll(".portfolio-menu li")) {
    item.classList.remove('active');
  }
  document.querySelectorAll(".portfolio-menu li")[3].classList.add('active');
  for (i = document.querySelectorAll('.portfolio-img').length - 1; i >= 0; i--) {
    let j = Math.floor(i + Math.random() * (document.querySelectorAll('.portfolio-img').length - i));
    document.querySelectorAll('.portfolio-img')[document.querySelectorAll('.portfolio-img').length - 1].after(document.querySelectorAll('.portfolio-img')[j]);
  }
});

//Подсветка картинок
for (let item of document.querySelectorAll('.portfolio-img')) {
  item.addEventListener('click', () => {
    for (let item1 of document.querySelectorAll('.portfolio-img')) {
      item1.classList.remove('active');
    }
    item.classList.add('active');
  });
}

//Подсветка картинок
for (let item of document.querySelectorAll('.portfolio-img')) {
  item.addEventListener('click', () => {
    for (let item1 of document.querySelectorAll('.portfolio-img')) {
      item1.classList.remove('active');
    }
    item.classList.add('active');
  });
}

//Отправка формы
document.forms[0].onsubmit = () => {
  let subj = "";
  let descr = "";
  if (document.forms[0].elements.Subject.value == "") {
    subj = "Без темы";
  } else { subj = "Тема: " + document.forms[0].Subject.value; }
  if (document.forms[0].elements.Text.value == "") {
    descr = "Без описания";
  } else { descr = "Описание: " + document.forms[0].Text.value; }
  alert("Письмо отправлено\n" + subj + "\n" + descr);
  document.forms[0].elements.User_name.value = "";
  document.forms[0].elements.User_email.value = "";
  document.forms[0].elements.Subject.value = "";
  document.forms[0].Text.value = "";
  return false;
};
