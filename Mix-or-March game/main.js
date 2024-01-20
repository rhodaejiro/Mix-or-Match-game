const cardsContainer = document.querySelector(".cards")
const images = [
    "images/coffe.jpg",
    "images/domino.jpg",
    "images/jasmin-chew.jpg",
    "images/lady-hill.jpg",
    "images/mourad-saadi.jpg",
    "images/oli-bekh.jpg",
    "images/shoes.jpg",
    "images/white-can.jpg"
  ];
  const imagesPicklist = [...images, ...images];
  const cardCount = imagesPicklist.length;
  
  //Game state
  let revealedCount = 0;
  let activeCard = null;
  let awaitingEndOfMove = false;

  function buildCard(image) {
    const element = document.createElement("div")

    element.classList.add("card");
    element.setAttribute("data-image", image);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (
            awaitingEndOfMove
            || revealed === "true"
            || element === activeCard
        ) {
            return;
        }
        element.style.backgroundImage = 'url(' + image + ')';

        if (!activeCard) {
            activeCard = element;

            return;
        }

        const imageToMatch = activeCard.getAttribute("data-image")

        if (imageToMatch === image) {

            activeCard.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");

            awaitingEndOfMove = false;
            activeCard = null;
            revealedCount += 2;

            if (revealedCount === cardCount) {
                alert("You win! Refresh to play again.");
            }

            return;
        }

        //down here
        awaitingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundImage = null;
            activeCard.style.backgroundImage = null;

            awaitingEndOfMove = false;
            activeCard = null;
        }, 1000);

    
    });

    return element;
  }

  //Build up Cards
  for (let i = 0; i < cardCount; i++) {
    const randomIndex = Math.floor(Math.random() *imagesPicklist.length);
    const image = imagesPicklist[randomIndex];
    const card = buildCard(image);

    imagesPicklist.splice(randomIndex, 1);
    cardsContainer.appendChild(card);


  }