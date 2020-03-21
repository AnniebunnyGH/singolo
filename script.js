//Меня навигации и активность кнопочек
let i = 0;
let hm_height = 95;
let li_hm_scroll = [
  0,
  document.querySelector("section.services").offsetTop - hm_height,
  document.querySelector("section.portfolio").offsetTop - hm_height,
  document.querySelector("section.about").offsetTop - hm_height,
  document.querySelector("section.quote").offsetTop - hm_height
];
for (let item of document.querySelectorAll("li.hm-names")) {
  item.addEventListener('click', () => {
    i = Array.from(document.querySelectorAll(".hm-names")).indexOf(item);
    window.scrollTo(0, li_hm_scroll[i]);
    console.log(i + " " + li_hm_scroll[i]);
  });
}

window.addEventListener('scroll', () => {
  for (i = 0; i < 4; i++) {
    if (window.scrollY >= li_hm_scroll[i] && window.scrollY < li_hm_scroll[i + 1]) {
      document.querySelectorAll("li.hm-names")[i].classList.add('active');
    } else {
      document.querySelectorAll("li.hm-names")[i].classList.remove('active');
    }
  }
  if (document.querySelectorAll("li.hm-names")[4].classList.contains('active')) { document.querySelectorAll("li.hm-names")[3].classList.remove('active'); }
  if (window.scrollY >= li_hm_scroll[3] && (window.scrollY + 1100) >= document.querySelector("footer").offsetTop) {
    document.querySelectorAll("li.hm-names")[4].classList.add('active');
  } else {
    document.querySelectorAll("li.hm-names")[4].classList.remove('active');
  }
});

//слайдер
let slider_screens = ["slider_screen1", "slider_screen2"];
let slider_num = 0;
//анимация листания
function slider_animation(mode) {
  //создание боковых скринов
  let item_now = document.querySelector(".slider div");
  let item_left = item_now.cloneNode(true);
  let item_right = item_now.cloneNode(true);
  item_now.style.left = "";
  item_now.style.right = "";
  item_left.style.left = "";
  item_left.style.right = "";
  item_right.style.left = "";
  item_right.style.right = "";
  for (i = 0; i < slider_screens.length; i++) {
    if (item_now.classList.contains(slider_screens[i])) {
      item_left.classList.remove(slider_screens[i]);
      item_right.classList.remove(slider_screens[i]);
      if (i != 0 && i != slider_screens.length - 1) {
        item_left.classList.add(slider_screens[i - 1]);
        item_right.classList.add(slider_screens[i + 1]);
      } else if (i == 0) {
        item_left.classList.add(slider_screens[slider_screens.length - 1]);
        item_right.classList.add(slider_screens[i + 1]);
      } else if (i == slider_screens.length - 1) {
        item_right.classList.add(slider_screens[0]);
        item_left.classList.add(slider_screens[i - 1]);
      }
    }
  }
  item_left.style.zIndex = "5";
  item_right.style.zIndex = "5";
  item_right.style.right = "1020px";
  item_left.style.left = "1020px";
  document.querySelector("section.slider").prepend(item_left);
  document.querySelector("section.slider").append(item_right);
  //сама анимация
  let animation_velocity = 0.7;
  let animation_width = Number(String(getComputedStyle(item_now).width).match(/[0-9]+/));
  let animation_time = animation_width / animation_velocity;
  let start = performance.now();
  function draw(progress) {
    if (mode == "left") {
      item_now.style.left = animation_width * progress + "px";
      item_left.style.left = (-animation_width + animation_width * progress) + "px";
    }
    if (mode == "right") {
      item_now.style.right = (animation_width * progress) + "px";
      item_right.style.right = (-animation_width + animation_width * progress) + "px";
    }
  }
  let animation = window.setInterval(() => {
    let progress = (performance.now() - start) / animation_time;
    draw(progress);
    if (progress >= 1) {
      if (mode == "left") {
        item_now.remove();
        item_right.remove();
        item_left.style.zIndex = "4";
        item_left.style.left = "0px";
        document.querySelector("svg.arrow.left").addEventListener('click', () => {
          slider_animation("left");
        })
        document.querySelector("svg.arrow.right").addEventListener('click', () => {
          slider_animation("right");
        })
      } else if (mode = "right") {
        item_now.remove();
        item_left.remove();
        item_right.style.zIndex = "4";
        item_right.style.right = "0px";
        document.querySelector("svg.arrow.left").addEventListener('click', () => {
          slider_animation("left");
        })
        document.querySelector("svg.arrow.right").addEventListener('click', () => {
          slider_animation("right");
        })
      }
      clearInterval(animation);
    } else {
      draw(progress);
    }
  }, animation_velocity);
}
//стрелочки для переключения
document.querySelector("svg.arrow.left").addEventListener('click', () => {
  slider_animation("left");
})
document.querySelector("svg.arrow.right").addEventListener('click', () => {
  slider_animation("right");
})

//let static_anim = setInterval(slider_animation, 5000, "right");

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
    //document.querySelectorAll('.portfolio-img')[j].remove();
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
    //document.querySelectorAll('.portfolio-img')[j].remove();
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
    //document.querySelectorAll('.portfolio-img')[j].remove();
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
