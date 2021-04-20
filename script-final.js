
        // ------------------------------------------------- Get the modal-----------------------------
        //vanessa
        //appel modal tout ce qu'il y a dans la modal.
        let modal = document.getElementById("rules");

        //apres 1 seconde la modal apparait
        setTimeout(function openModal() {
            modal.style.display = "block";
        }, 1000);


         // -------------------------------------------------THE GAME -----------------------------

        const places = document.querySelectorAll('.place'); //tout ce qui a la classe place = les differentes place où les images peuvent apparaitre (list de div)
        const scoreBoard = document.querySelector('.score'); // appel scoreBoard la div score
        const image = document.querySelectorAll('.image'); // tout ce qui a la classe Image = les differentes images (ghost/ babie / jp) (list de div)

        let lastItem; //defini lastItem sans lui donner de valeur (variable vide)
        let timeUp = false; // determine la boolean (tre/false) qui aura un effet sur le temps de jeu (quand timeUp = true, le jeu se termine)
        let score = 0; //score 

       //defini deux parametres min/max ici (on leurs donnera une valeur quand la fonction sera appellée dans show()), les images aparaitront aleatoirement pendant le temps compris entre ces valeurs.
        function randomTime(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        //on creer un tableau avec toutes le nom des sources des images
        let sources = ["malus-1.svg", "malus-2.svg", "malus-3.svg", "malus-4.svg", "malus-5.svg", "ghost-1.svg", "ghost-2.svg", "ghost-3.svg", "ghost-4.svg", "ghost-5.svg", "bonus-1.png", "bonus-2.png"];

       // on choisi aleatoirement un item dans une liste 
        function randomItem(items) {
            const idx = Math.floor(Math.random() * items.length); //index aleatoire
            const item = items[idx]; 
            if (item === lastItem) { //si l'item choisi correspond au dernier item choisi on rejou la fonction

                return randomItem(items);
            }
            lastItem = item;
            return item;

        }

        function show() {
            const time = randomTime(600, 1000);// donne un chiffre entre 1/2 seconde et 1 seconde qui sera le temps d'aparition d'une image

            //choisi un element d'une liste au hazard
            const place = randomItem(places); //choix où aparait l'image dans la page
            const imageChoice = randomItem(image);//choix de l'Image (list dans html)
            const chosenImage = randomItem(sources);//choix la source de l'img 

            const iconSplit = chosenImage.split('-');//separer le nom de l'element choisi en deux apres "-"
            const iconId = iconSplit[0];// donne la premiere parti seulement du nom de la source img soit bonus soit malus soit ghost
            console.log(iconId);//montre si l'image qui aparait actuellement est un malus/bonus/ghost

            place.classList.add('up');//ajoute la class .up a l'emplacement(.place) choisi donc active le css .up (qui remonte l'image)

            //on donne un background random (choseImage) à la div 'image' qui est dans la div 'place'.
            imageChoice.style.background = `url("./images/${chosenImage}") bottom center no-repeat`;


            //si la premiere parti de la source de l'image est "malus" alors on demarre la function bonkMalus a chaque click sur l'image
            // et on retire tout autre evenement qui aurait pu etre lancer lors d'action precedente
            if (iconId === "malus") {
                imageChoice.removeEventListener('click', bonkGhost);
                imageChoice.removeEventListener('click', bonkBonus);
                imageChoice.addEventListener('click', bonkMalus);
            }
  //si la premiere parti de la source de l'image est "bonus" alors on demarre la function bonkMalus a chaque click sur l'image
            // et on retire tout autre evenement qui aurait pu etre lancer lors d'action precedente
            else if (iconId === "bonus") {
                imageChoice.removeEventListener('click', bonkMalus);
                imageChoice.removeEventListener('click', bonkGhost);
                imageChoice.addEventListener('click', bonkBonus);
            }
              //si la premiere parti de la source de l'image est "ghost" alors on demarre la function bonkMalus a chaque click sur l'image
            // et on retire tout autre evenement qui aurait pu etre lancer lors d'action precedente
           else if (iconId === "ghost") {
                imageChoice.removeEventListener('click', bonkMalus);
                imageChoice.removeEventListener('click', bonkBonus);
                imageChoice.addEventListener('click', bonkGhost);
            }
//la function setTimeout prend en compte deux choses: une action a faire et un temps. Apres que ce temps soit ecouler l'action demare. Ici la classe .up est retirer de la div 'place' apres "time" qui correspond a un chiffre random entre 600 et 1000 (const randomTime).
            setTimeout(() => {
                place.classList.remove('up');//on enleve la classe up a chaque fois que le temps d'aparition de l'image est fini
                if (!timeUp) show(); //si timeup = false on rejoue la function show si c'est true alors le jeu s'arrete
            }, time);

        }

  

// lance le jeu , remet tout les compteurs à 0, lance la function count-down, lance la function show, fait disparaitre la modal et lance le "timer" en disant que au bout de 15 second timeup = true (si timeup = true alors la function show s'arrete et donc les images arretes d'aparaitre.)
        function startGame() {
            scoreBoard.textContent = 0;
            timeUp = false;
            score = 0;
            launch_count_down();
            show();
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
                var synth = window.speechSynthesis;
            var utterance2 = new SpeechSynthesisUtterance("push");
            synth.speak(utterance2);
        }

 // -------------------------------------------------CURSOR -----------------------------
//vanessa

        const cursor = document.querySelector(".cursor img")

        window.addEventListener("mousemove", (e) => {
            cursor.style.top = e.pageY + "px";//nombre pixel en partant de la vertical 
            cursor.style.left = e.pageX + "px";//nombre pixel en partant de la gauche

            window.addEventListener("click", () => {
                cursor.style.animation = "hit 0.1s ease"; //ajoute la proprieté animation avec la valeur hit 0.1s ease.
                setTimeout(() => {
                    cursor.style.removeProperty("animation") //apres 100millisecond on retire la proprieté animation qui pourra donc fonctionner a la chaine 
                }, 100);
                //la fonction click est a l'interieur de la fonction mousemove. le curseur ne pourrait pas bouger sans la fonction mousemove
            });
        });


// ------------------------------------------------- TIMER -----------------------------

        function timer(secondes) {
            let temps = new Date();// objet new date est un standard et se calque sur le navigateur
            temps.setTime(secondes * 1000);
            return temps.getMinutes().toString().padStart(2, '0') + ":" + temps.getSeconds().toString().padStart(2, '0');
        }
        function launch_count_down() { //apelle la function timer 
            //creation de la variable qui appelle la count_down_div
            let count_down_div = document.getElementById("count_down_div");
            // 1- le délai
            let total_delay = 15 * 1000; // toutes les 15 SECONDES
            // 2- Compte à rebours
            let count_down_delay = 1000 * 1; // affichage toutes les 1 secondes,
            let count_down = 0;
            count_down_div.textContent = timer((total_delay - count_down) / 1000);
            // setInterval pour que la fx se reitere 15 fois pour 15 sec
            let count_Interval = window.setInterval(function () {
                //iterration de +1 sur le count_down donc transform A REVOIR !!!
                count_down += count_down_delay;
                //count_down += 1000;
                count_down_div.textContent = timer((total_delay - count_down) / 1000);
                if (count_down >= total_delay) { count_down = 0; }
            }, count_down_delay);
            // 3- A LA FIN du compte à rebours
            setTimeout(function () {
                // on STOPPE
                clearInterval(count_Interval);
                count_down_div.textContent = 'game over';//affiche game over a la fin du jeu 
                    var synth = window.speechSynthesis;
                var utterance1 = new SpeechSynthesisUtterance('game over');
                synth.speak(utterance1);
            }, total_delay);
        }
