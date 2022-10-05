const cards = document.querySelectorAll('.card')
const timerText = document.querySelector('.timer span')
const matchedText = document.querySelector('.matched span')
const clickedText = document.querySelector('.clicked span')
const totlaScoreText = document.querySelector('.total-score span')

let matched = 0
let clicked = 0
let timer = 0
timerText.innerText = 0
let startTimer = false
let cardOne, cardTwo
let disableDeck = false
let inter

function setTimer() {
  if (startTimer) {
    inter = setInterval(() => {
      timer++
      timerText.innerText = timer
    }, 1000)
  }
  startTimer = false
}
function unsetTimer() {
  clearInterval(inter)
  timer = 0
  startTimer = true
}

function flipCard(e) {
  let clickedCard = e.target
  if (clickedCard !== cardOne && !disableDeck) {
    clicked++
    console.log('Clicked amount= ' + clicked)
    clickedText.innerText = clicked.toString()
    setTimer()

    clickedCard.classList.add('flip')
    if (!cardOne) {
      return (cardOne = clickedCard)
    }

    cardTwo = clickedCard
    disableDeck = true
    let cardOneImg = cardOne.querySelector('img').src
    let cardTwoImg = cardTwo.querySelector('img').src
    matchCards(cardOneImg, cardTwoImg)
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++
    console.log('matched= ' + matched)
    matchedText.innerHTML = matched.toString()

    if (matched == 8) {
      setTimeout(() => {
        return shuffleCard()
      }, 1000)
    }
    cardOne.removeEventListener('click', flipCard)
    cardTwo.removeEventListener('click', flipCard)
    cardOne = cardTwo = ''
    return (disableDeck = false)
  }

  setTimeout(() => {
    cardOne.classList.add('shake')
    cardTwo.classList.add('shake')
  }, 400)

  setTimeout(() => {
    cardOne.classList.remove('shake', 'flip')
    cardTwo.classList.remove('shake', 'flip')
    cardOne = cardTwo = ''
    disableDeck = false
  }, 1200)
}

function shuffleCard() {
  console.log('Total Score = ' + (16 / clicked / timer) * 100000)
  totlaScoreText.innerText = Math.ceil((16 / clicked / timer) * 100000)
  unsetTimer()
  matched = 0
  matchedText.innerText = 0
  clicked = 0
  clickedText.innerText = 0
  cardOne = cardTwo = 0
  disableDeck = false
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1))
  cards.forEach((card, index) => {
    card.classList.remove('flip')
    let imgTag = card.querySelector('img')
    imgTag.src = `img/img-${arr[index]}.png`
    card.addEventListener('click', flipCard)
  })
}

shuffleCard()
totlaScoreText.innerText = 0
cards.forEach(card => {
  card.addEventListener('click', flipCard)
})
