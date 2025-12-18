window.addEventListener('load', () => {
    Swal.fire({
        title: 'Включити музику?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Так',
        cancelButtonText: 'Ні',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
        }
        animationTimeline();
    });
});

const animationTimeline = () => {
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
    const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

    const tl = new TimelineMax();

    tl.to(".container", 0.6, { visibility: "visible" })
      .from(".one", 0.7, { opacity: 0, y: 10 })
      .from(".two", 0.4, { opacity: 0, y: 10 })
      .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
      .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
      .from(".three", 0.7, { opacity: 0, y: 10 })
      .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
      .from(".four", 0.7, { scale: 0.2, opacity: 0 })
      .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
      .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
      .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" }, "+=4")
      .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
      .from(".idea-1", 0.7, ideaTextTrans)
      .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-2", 0.7, ideaTextTrans)
      .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-3", 0.7, ideaTextTrans)
      .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-4", 0.7, ideaTextTrans)
      .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=1.5")
      .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
      .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
      .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
      .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, "+=1.5")
      .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
      .from(".profile-picture", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
      .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
      .from(".cake-section", 1, { opacity: 0, y: 50, ease: Expo.easeOut })
      .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
      .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
      .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
      .call(generateConfetti)
      .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
      // Показати блок nine в кінці
      .call(() => {
          const nineBlock = document.querySelector(".nine");
          nineBlock.style.display = "block";
          gsap.to(nineBlock, { opacity: 1, duration: 1 });
          
          // Додати функціонал кнопок
          const replayBtn = document.querySelector(".nine button:nth-child(2)");
          replayBtn.addEventListener("click", () => tl.restart());

          const cakeBtn = document.querySelector(".nine button:nth-child(1)");
          cakeBtn.addEventListener("click", () => { window.location.href = 'cake.html'; });
      });
}

function generateConfetti() {
    const confettiContainer = document.querySelector(".confetti");
    const colors = ["#ff0a54","#ff477e","#ff7096","#ff85a1","#fbb1b1","#f9bec7","#f7cad0","#fae0e4"];

    for(let i=0; i<100; i++){
        const confetti = document.createElement("div");
        confetti.classList.add("confetti-piece");
        confetti.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        confetti.style.width = `${Math.random()*8 + 4}px`;
        confetti.style.height = `${Math.random()*8 + 4}px`;
        confetti.style.left = `${Math.random()*100}vw`;
        confetti.style.top = `${Math.random()*-100}vh`;
        confetti.style.position = "absolute";
        confetti.style.opacity = Math.random();
        confetti.style.borderRadius = "50%";
        confettiContainer.appendChild(confetti);

        gsap.to(confetti, {
            y: "110vh",
            x: "+=" + (Math.random()*100-50),
            rotation: Math.random()*360,
            duration: Math.random()*3 + 2,
            repeat: -1,
            ease: "linear"
        });
    }
}