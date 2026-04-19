const counters = document.querySelectorAll(".box__count");
const container = document.querySelector(".aboutUs__bottom-block");

let activated = false;

function updateCounter(counter) {
    const fullValue = counter.dataset.count;

    const number = parseInt(fullValue.replace(/\D/g, ""));
    const suffix = fullValue.replace(/\d/g, "");

    let count = 0;

    function animate() {
        if (count < number) {
            count = Math.min(count + Math.ceil(number / 300), number);
            counter.innerText = count + suffix;
            requestAnimationFrame(animate);
        } else {
            counter.innerText = number + suffix;
        }
    }

    animate();
}

window.addEventListener("scroll", () => {
    if (pageYOffset > container.offsetTop - container.offsetHeight - 600 && !activated) {
        activated = true;

        counters.forEach(counter => {
            counter.innerText = "0";
            updateCounter(counter);
        });
    }
});
