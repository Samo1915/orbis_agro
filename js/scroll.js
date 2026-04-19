// window.addEventListener('scroll', () => {
//    const inner = document.querySelectorAll('.burger__inner');
//    const menu = document.querySelector('.header__navbar-list')
   
//    if (window.pageYOffset > 100) {
//      inner.forEach(span => {
//        span.style.background = '#000';
//      });
//    } else {
//       inner.forEach(span => {
//          span.style.background = '#fff';
//       });   }
// });
(function () {
	const header = document.getElementById('siteHeader');
	if (!header) return;

	const SCROLL_OFFSET = 1; // момент "початку" скролу

	function updateHeaderState() {
		if (window.scrollY > SCROLL_OFFSET) {
			header.classList.add('is-scrolled');
		} else {
			header.classList.remove('is-scrolled');
		}
	}

	// ініціалізація при завантаженні
	updateHeaderState();

	// реакція на скрол
	window.addEventListener('scroll', updateHeaderState, { passive: true });
})();