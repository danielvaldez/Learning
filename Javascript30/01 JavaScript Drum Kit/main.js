document.addEventListener("keydown", (event) => {
    let key = getKey();
    if (key.length === 0) return;
    key[0].classList.add('playing')
    key[1].currentTime = 0;
    key[1].play();

});

function getKey() {
    let key = document.querySelectorAll(`[data-key ="${event.keyCode}"]`);
    if (key === undefined) return;
    return key;

}

document.addEventListener("keyup", (event) => {
    let key = getKey();
    if (key.length === 0) return;
    setTimeout(() => { key[0].classList.remove('playing') }, 100);
    // key[1].pause();
});