// ======================================
// ELEMENTOS
// ======================================

const cards = document.querySelectorAll(".card");

const modal = document.getElementById("modal");

const modalImg = document.getElementById("modal-img");

const modalTitle = document.getElementById("modal-title");

const modalDescription =
document.getElementById("modal-description");

const closeModal =
document.getElementById("close-modal");

const player =
document.getElementById("music-player");

const clickSound =
document.getElementById("click-sound");

const counter =
document.getElementById("counter");

/*=======================================
SECRET
=======================================*/
const normalCards =
document.querySelectorAll(
    ".card:not(.secret-card)"
);

const secretCard =
document.querySelector(
    ".secret-card"
);

const openedCards =
new Set();

// ======================================
// ABRIR CARD
// ======================================

cards.forEach(card => {

    card.addEventListener("click", () => {

        if(!card.classList.contains("secret-card")){

            openedCards.add(card);

        }
        if(
            openedCards.size ===
            normalCards.length
        ){

            secretCard.style.display =
            "block";

            setTimeout(()=>{

                secretCard.classList.add(
                    "show"
                );

            },100);

        }

        clickSound.currentTime = 0;
        clickSound.play();

        const image =
        card.dataset.image;

        const title =
        card.dataset.title;

        const text =
        card.dataset.text;

        const music =
        card.dataset.music;

        modalImg.src = image;

        modalTitle.textContent =
        title;

        modalDescription.textContent =
        text;

        modal.classList.add("active");

        document.body.style.overflow =
        "hidden";

        // música do card

        if(music){

            player.pause();

            player.src = music;

            player.volume = 0.4;

            player.play().catch(() => {});

        }

    });

});

// ======================================
// FECHAR MODAL
// ======================================

function closeCard(){

    modal.classList.remove("active");

    document.body.style.overflow =
    "auto";

    player.pause();

    player.currentTime = 0;

}

closeModal.addEventListener(
"click",
closeCard
);

// fechar clicando fora

modal.addEventListener("click",(e)=>{

    if(e.target === modal){

        closeCard();

    }

});

// ESC

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        closeCard();

    }

});

// ======================================
// SCROLL REVEAL
// ======================================

const observer =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add(
                "show"
            );

        }

    });

},
{
    threshold:0.15
}

);

cards.forEach(card=>{

    observer.observe(card);

});

// ======================================
// CONTADOR DE TEMPO JUNTOS
// ======================================

// ALTERE A DATA AQUI

const startDate =
new Date("2024-10-17");

function updateCounter(){

    const now =
    new Date();

    const diff =
    now - startDate;

    const days =
    Math.floor(
        diff /
        (1000*60*60*24)
    );

    const years =
    Math.floor(days / 365);

    const remainingDays =
    days % 365;

    const months =
    Math.floor(
        remainingDays / 30
    );

    const finalDays =
    remainingDays % 30;

    counter.innerHTML =

    `❤️ Juntos há
    ${years} anos,
    ${months} meses
    e ${finalDays} dias ❤️`;

}

updateCounter();

// ======================================
// CORAÇÕES FLUTUANTES
// ======================================

const heartsContainer =
document.getElementById(
    "hearts-container"
);

function createHeart(){

    const heart =
    document.createElement("span");

    heart.innerHTML = "❤";

    heart.style.position =
    "absolute";

    heart.style.left =
    Math.random() * 100 + "%";

    heart.style.bottom =
    "-50px";

    heart.style.fontSize =
    (Math.random()*20+10)+"px";

    heart.style.opacity =
    Math.random()*0.4 + 0.2;

    heart.style.color =
    "rgba(255,120,150,.6)";

    heart.style.pointerEvents =
    "none";

    heart.style.transition =
    "transform linear";

    heartsContainer.appendChild(
        heart
    );

    const duration =
    Math.random()*6000 + 6000;

    const drift =
    (Math.random()-0.5)*150;

    requestAnimationFrame(()=>{

        heart.style.transform =

        `translate(${drift}px,-120vh)`;

        heart.style.transition =
        `transform ${duration}ms linear`;

    });

    setTimeout(()=>{

        heart.remove();

    },duration);

}

setInterval(createHeart,700);
