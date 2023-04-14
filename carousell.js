const CAROUSELL_IMG = document.querySelector(".carousell__image")
const CAROUSELL_FORWARD = document.querySelector(".carousell__forwardButton")
const CAROUSELL_BACK = document.querySelector(".carousell__backButton")
const SLIDEINDICATOR = document.querySelector(".slideindicator")
const IMAGES = ["https://placekitten.com/400", "https://picsum.photos/400/400", "https://picsum.photos/400/400?grayscale", "https://picsum.photos/400/400", "https://picsum.photos/400/400/"];
// brugt til at holde styr på om vi animerer, så vi kan afbryde click events for at holde animationen smooth
var isAnimating = false 
var index = 0
CAROUSELL_IMG.src = IMAGES[index]






// vi løber igennem array'et af images for at få deres index til click handler'en
   IMAGES.forEach((_,itemIndex)=>{
    const CLICKON = document.createElement("div")
    CLICKON.classList.add("clickon")
    
    // hvis det nuværende index er dette item, så marker det som aktivt fra starten af
    if (index === itemIndex) {
        CLICKON.classList.add("active")
    }

    // slide indicator click handler
    CLICKON.addEventListener("click", () => {
        // hvis den "prik" vi har klikket på er den samme som det nuværende eller vi allerede animere, så annullerer vi eventet
        if (itemIndex === index || isAnimating) return
        // find den tidligere aktive "prik"
        const PREVIOUS_CLICKON = document.querySelector('.slideindicator .clickon.active')
        // fjern "active" klassen fra den tidligere "prik"
        PREVIOUS_CLICKON.classList.remove('active')
        // tilføj "active" klassen til den nuværende "prik"
        CLICKON.classList.add("active")

        // hvis itemIndex er mindre end det nuværende index, så skal vi animere baglæns
        if (itemIndex < index) {
            CAROUSELL_IMG.classList.add('carousell__image--animatingBack');
            // halvdelen af animations-tiden er gået, så vi skal skifte billedet ud mens det ikke er synligt
            setTimeout(() => {
                CAROUSELL_IMG.src = IMAGES[itemIndex]

            }, 1000)
            setTimeout(() => {
                // animationen er færdig så vi kan fjerne klassen og sætte isAnimating til false nu
                CAROUSELL_IMG.classList.remove('carousell__image--animatingBack');
                isAnimating = false 
            }, 2000);
        }
        
        // hvis itemIndex er større end det nuværende index, så skal vi animere forlæns
        if (itemIndex > index) {
            CAROUSELL_IMG.classList.add('carousell__image--animatingForward');
            setTimeout(() => {
                CAROUSELL_IMG.src = IMAGES[itemIndex]

            }, 1000)
            setTimeout(() => {
                CAROUSELL_IMG.classList.remove('carousell__image--animatingForward');
                isAnimating = false
            }, 2000);
        }

        // til sidst, sætter vi itemIndex til at være det nuværende for at kunne tjekke op imod det ved næste klik
        index = itemIndex
    })

    // tilføj "prikken" til sidst i rækken af child elementer for SLIDEINDICATOR
    // append child metoden bliver brugt til at indsætte elementer i DOM'en 
    SLIDEINDICATOR.appendChild(CLICKON)
})

CAROUSELL_FORWARD.addEventListener("click", shuffleForward)
CAROUSELL_BACK.addEventListener("click", shuffleBack)



function shuffleForward(event) {
    if (isAnimating) return
    index++ 
    if (IMAGES.length === index) {
        index = 0
    }
   
    const clickonList = document.querySelectorAll('.slideindicator .clickon')
    clickonList.forEach(function(el) {
        if (el.classList.contains('active')) {
            el.classList.remove('active')
        }
    })

    clickonList[index].classList.add('active')

    isAnimating = true 
    CAROUSELL_IMG.classList.add('carousell__image--animatingForward');
    setTimeout(() => {
        CAROUSELL_IMG.src = IMAGES[index]
    }, 1000)
    setTimeout(() => {
        CAROUSELL_IMG.classList.remove('carousell__image--animatingForward');
        isAnimating = false 
    }, 2000);


    }




function shuffleBack(event){
    if (isAnimating) return
    index--
    if (index < 0) {
        index = IMAGES.length - 1 
    }
    

    
    const clickonList = document.querySelectorAll('.slideindicator .clickon')
    clickonList.forEach(function(el) {
        if (el.classList.contains('active')) {
            el.classList.remove('active')
        }
    })

    clickonList[index].classList.add('active')


    isAnimating = true 
    CAROUSELL_IMG.classList.add('carousell__image--animatingBack');
    setTimeout(() => {
        CAROUSELL_IMG.src = IMAGES[index]
    }, 1000)
    setTimeout(() => {
        CAROUSELL_IMG.classList.remove('carousell__image--animatingBack');
        isAnimating = false 
    }, 2000);

    
   
}

