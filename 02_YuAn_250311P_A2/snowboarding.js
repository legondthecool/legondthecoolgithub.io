document.addEventListener("DOMContentLoaded", function() {
    // Page switching
    const page1Btn = document.getElementById("page1btn");
    const page2Btn = document.getElementById("page2btn");
    const page3Btn = document.getElementById("page3btn");
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");

    function showPage(pageToShow) {
        page1.style.display = (pageToShow === 1) ? "block" : "none";
        page2.style.display = (pageToShow === 2) ? "block" : "none";
        page3.style.display = (pageToShow === 3) ? "block" : "none";
    }
    // snowboarding game variables
    const snowboarder = document.querySelector("#snowboarder");
    const scrapeAudio = new Audio("img2/scrape-101141.mp3");
    const leftBtn = document.querySelector("#leftBtn");
    const rightBtn = document.querySelector("#rightBtn");
    const upBtn = document.querySelector("#upBtn");
    const downBtn = document.querySelector("#downBtn");
    const resetBtn = document.querySelector("#resetBtn");
    const stopBtn = document.querySelector("#stopBtn");
    const tree = document.querySelector("#tree");
    let score = 0;
    let treeX = 0, treeY = 700; 
    snowboarder.style.left = "0px"; 
    snowboarder.style.top = "0px"; 
    snowboarder.innerText = "0,0"; 
    let SBX = 0;
    let SBY = 0;
    // show pages
    showPage(1);
    page1Btn.addEventListener("click", function() {
        showPage(1);
    });
    page2Btn.addEventListener("click", function() {
        showPage(2);
    });
    page3Btn.addEventListener("click", function() {
        showPage(3);
         // Snowboarding game functionality
        function ResetPos() {
            SBX = SBY = 0; 
            snowboarder.style.left = SBX + "px"; 
            snowboarder.style.top = SBY + "px"; 
            snowboarder.innerText = SBX + "," + SBY; 
            treeX = GetRandom(0, window.innerWidth - 100);
            treeY = 700;
            tree.style.left =treeX + "px";
            tree.style.top =treeY + "px";
            snowboarder.innerText = treeX + "," + treeY; 
        }
        stopBtn.addEventListener("click", function() {
            clearInterval(treeMove);
            snowboarder.style.left = "0px"; 
            snowboarder.style.top = "0px"; 
            tree.style.left = "0px";
            tree.style.top = "700px";
        });
        function MovePos(x, y) {
            SBX += x; 
            SBY += y; 
            snowboarder.style.left = SBX + "px"; 
            snowboarder.style.top = SBY + "px"; 
            snowboarder.innerText = SBX + "," + SBY; 
            scrapeAudio.play();
        }
        // Event listeners for keyboard and button controls
        document.addEventListener('keydown', function (kbEvt) {
            console.log(kbEvt); 
            if (kbEvt.code === "ArrowRight"){
                MovePos(10,0);
            }
            if (kbEvt.code === "ArrowLeft"){
                MovePos(-10, 0);
            }
            if (kbEvt.code === "ArrowDown"){
                MovePos(0, 10);
            }
            if (kbEvt.code === "ArrowUp"){
                MovePos(0, -10);
            }
        });
        leftBtn.addEventListener("click", function () {
            MovePos(-10, 0);
        }); 
        rightBtn.addEventListener("click", function () {
            MovePos(10, 0);
        });
        upBtn.addEventListener("click", function () {
            MovePos(0, -10);
        });
        downBtn.addEventListener("click", function () {
            MovePos(0, 10);
        });
        resetBtn.addEventListener("click", ResetPos);
        function GetRandom(min,max){
                let treeX = Math.floor(Math.random() *(max - min)) + min; 
                return treeX;
        }
        // Move the tree up the screen
        let treeMove = setInterval(function() {
            treeY -= 10;
            tree.style.left = treeX + "px";
            tree.style.top = treeY + "px";
            tree.style.top = treeY + "px";
            if (SBX + 40 >= treeX + tree.offsetWidth  && SBX - 40 <= treeX + tree.offsetWidth && 
                SBY >= treeY  && SBY <= treeY) {
                alert("You hit a tree! Game over.");
                ResetPos();
            }
            if (SBX < -20 || SBX > window.innerWidth) 
            {
                alert("You went off the mountain! Game over.");
                ResetPos();
            }
            if (SBY < 0 ) {
                SBY = 0;
            }
            if (SBY > 750) {
                SBY = 750;
            }
            if (treeY < 0) {
                treeY = 700; 
                treeX = GetRandom(0, window.innerWidth - 50); 
                score= score + 1; 
                document.querySelector("#scoreBox").innerText = "Score: " + score; 
            }
        }, 100);
    });
    // Hamburger menu functionality
    const hamBtn = document.getElementById("hambtn");
    const navList = document.querySelector("nav ul");
    const hamImg = hamBtn.querySelector("img");
    hamBtn.addEventListener("click", function() {
        if (window.innerWidth <= 800) { 
            navList.classList.toggle("menuShow");
            if (navList.classList.contains("menuShow")) {
                hamImg.alt = "close menu";
            }
        }
        else {
            hamImg.src = "img2/hambtn.png";
            hamImg.alt = "hamburger icon";
        }
    });
    // responsive design 
    window.addEventListener("resize", function() {
        if (window.innerWidth < 800) {
            navList.classList.remove("menuShow");
            hamImg.src = "img2/hambtn.png"; 
            hamImg.alt = "hamburger icon";
        }
     });
});



