const buttons = document.querySelectorAll('.mainBtn a');

buttons.forEach(btn => {
  const arrow = btn.querySelector('svg');

  btn.addEventListener('mouseenter', () => {
    arrow.classList.remove('fly', 'back');
    void arrow.offsetWidth;
    arrow.classList.add('fly');
  });

  btn.addEventListener('mouseleave', () => {
    arrow.classList.remove('fly');
    arrow.classList.add('back');
  });
});
