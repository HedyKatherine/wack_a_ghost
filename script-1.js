
        // ------------------------------------------------- Get the modal-----------------------------
        
        //appel modal tout ce qu'il y a dans la modal.
        let modal = document.getElementById("rules");

        //apres 1 seconde la modal apparait
        setTimeout(function openModal() {
            modal.style.display = "block";
        }, 1000);


                // -------------------------------------------------THE GAME -----------------------------

        const holes = document.querySelectorAll('.hole'); //tout ce qui a la classe hole = holes (list de div)
        const scoreBoard = document.querySelector('.score'); // appel scoreBoard la div score
        const moles = document.querySelectorAll('.mole'); // tout ce qui a la classe mole = moles (list de div)

        let lastHole; //defini laHole sans lui donner de valeur (toute suite)
        let timeUp = false; // determiner la boolean qui aura un effet sur le temps de jeu
        let score = 0; //score 

       //defini deux valeurs, les images aparaitront aleatoirement pendant un temps compris entre ces valeurs
        function randomTime(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        //on creer un tableau avec img source
        let molies = ["malus-1.svg", "malus-2.svg", "malus-3.svg", "malus-4.svg", "malus-5.svg", "ghost-1.svg", "ghost-2.svg", "ghost-3.svg", "ghost-4.svg", "ghost-5.svg", "bonus-1.png", "bonus-2.png"];


        //prend un argument (nom de list) et creer un index [random], choisi un element de la list sans jamais avoir les deux meme a la suite
        function randomHole(holes) {
            const idx = Math.floor(Math.random() * holes.length);
            const hole = holes[idx];
            if (hole === lastHole) {

                return randomHole(holes);
            }
            lastHole = hole;
            return hole;

        }

        function peep() {
            const time = randomTime(600, 1000);
            //choisi un element d'une liste au hazard
            const hole = randomHole(holes); //choix où dans la page?
            const molesChoice = randomHole(moles);//choix dans quelle div mole?
            const chosenMole = randomHole(molies);//choix quelle source img ?

            const iconSplit = chosenMole.split('-');//separer le nom de l'element choisi en deux sur apres "- ""
            const iconId = iconSplit[0];// return la premiere parti seulement du nom de la source img
console.log(iconId);//montre si l'image qui aparait actuellement est un malus/bonus/ghost

            hole.classList.add('up');//ajoute la class .up au trou choisi donc active le css .up (qui remonte donc l'image)

            //on ajoute un background image a la mole choisi, l'url de l'image est .image/ la source qu'on a choisi avec le function random donc ce que contient la variable chosenMole 
            molesChoice.style.background = `url("./images/${chosenMole}") bottom center no-repeat`;


            //si la premiere parti de la source de img est "malus" alors on demarre la function bonkMalus a chaque sur l'image
            //On retire tout autre evenement qui aurait pu etre lancer lors d'action precedente
            if (iconId === "malus") {
                molesChoice.removeEventListener('click', bonkGhost);
                molesChoice.removeEventListener('click', bonkBonus);
                molesChoice.addEventListener('click', bonkMalus);
            }

            else if (iconId === "bonus") {
                molesChoice.removeEventListener('click', bonkMalus);
                molesChoice.removeEventListener('click', bonkGhost);
                molesChoice.addEventListener('click', bonkBonus);
            }
           else if (iconId === "ghost") {
                molesChoice.removeEventListener('click', bonkMalus);
                molesChoice.removeEventListener('click', bonkBonus);
                molesChoice.addEventListener('click', bonkGhost);
            }

            setTimeout(() => {
                hole.classList.remove('up');//on enleve la classe up a chaque fois que le temps d'aparition de l'image est fini
                if (!timeUp) peep(); //si timeup = false on rejou la function peep
            }, time);



        }

        // function myFunction() {
        //     hole.classList.remove('up');
        //     if (!timeUp) peep();
        // }

// lance le jeu , remtes tout les comteur a 0, lance la function count-down, lance la function peep, fait disparaitre la modal et lance le "timer" en disant que au bout de 15 second timeup = true (si timeup =true alors la function peep s'arrete et donc les images arretes d'aparaitre.)
        function startGame() {
            scoreBoard.textContent = 0;
            timeUp = false;
            score = 0;
            launch_count_down();
            peep();
            modal.style.display = "none";
            setTimeout(() => timeUp = true, 15000)
        }
// ------------------------------------------------- click event -----------------------------
        function bonkGhost() {
            score++; //score +1
          this.parentNode.classList.remove('up'); //enleve la class up (donc fait diparaitre l'image des qu'elle est clicker)
            scoreBoard.textContent = score;//score aparait dans le text du scoreboard
            var sound = document.getElementById("sound1");
            sound.play();//play "sound" a chaque fois que l'image est clicker
        }
        function bonkMalus() {
            score -= 10;
          this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            var sound = document.getElementById("sound2");
            sound.play();
        }
        function bonkBonus() {
            score += 10;
            this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            var sound = document.getElementById("sound3");
            sound.play();
        }
//      // -------------------------------------------------CURSOR -----------------------------

        const cursor = document.querySelector(".cursor img")

        window.addEventListener("mousemove", (e) => {
            cursor.style.top = e.pageY + "px";//nombre pixel en partant de la vertical 
            cursor.style.left = e.pageX + "px";//nombre pixel en partant de la gauche

            window.addEventListener("click", () => {
                cursor.style.animation = "hit 0.1s ease"; //ajoute la proprieté animation avec la valeur hit 0.1s ease.
                setTimeout(() => {
                    cursor.style.removeProperty("animation") //apres 100millisecond on retire la proprieté animation qui pourra donc fonctionner a la chaine 
                }, 100);
            });
        });

        function heures_minutes_secondes(secondes) {
            let temps = new Date();// objet new date est un standard et se calque sur le navigateur
            temps.setTime(secondes * 1000);
            // if( secondes > 60 * 60) // supérieur à 1 heure
            // {
            //   return (temps.getHours()-1).toString().padStart(2,'0')+":"+temps.getMinutes().toString().padStart(2,'0')+":"+temps.getSeconds().toString().padStart(2,'0');
            // } else {
            return temps.getMinutes().toString().padStart(2, '0') + ":" + temps.getSeconds().toString().padStart(2, '0');
            //}
        }
        function launch_count_down() {
            //creation de la variable qui appelle la count_down_div
            let count_down_div = document.getElementById("count_down_div");
            // 1- le délai
            let total_delay = 15 * 1000; // toutes les 15 SECONDES
            //let total_delay = 30 * 60 * 1000; // toutes les 30 MINUTES
            // 2- Compte à rebours
            let count_down_delay = 1000 * 1; // affichage toutes les 1 secondes,
            let count_down = 0;
            count_down_div.textContent = heures_minutes_secondes((total_delay - count_down) / 1000);
            // setInterval pour que la fx se reitere 15 fois pour 15 sec
            let count_Interval = window.setInterval(function () {
                //iterration de +1 sur le count_down donc transform A REVOIR !!!
                count_down += count_down_delay;
                //count_down += 1000;
                count_down_div.textContent = heures_minutes_secondes((total_delay - count_down) / 1000);
                if (count_down >= total_delay) { count_down = 0; }
            }, count_down_delay);
            // 3- A LA FIN du compte à rebours
            setTimeout(function () {
                // on STOPPE
                clearInterval(count_Interval);
                // ICI : ACTION(S) à effectuer à la FIN du compte à rebours
                // ex : redirection
                // document.location.href='index.php';
                // ex : affichage
                count_down_div.textContent = 'game over';
            }, total_delay);
        }
