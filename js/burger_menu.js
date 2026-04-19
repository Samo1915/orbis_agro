const burger = document.querySelector('.header__burger-menu');
const nav = document.querySelector('.header__navbar');

burger.addEventListener('click', () => {
   burger.classList.toggle('active');
   nav.classList.toggle('active');
   document.body.classList.toggle('lock');
});

document.querySelectorAll('.header__navbar a').forEach(link => {
   link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('lock');
   });
});