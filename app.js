const firstPage = document.querySelector(".first-page")
const nameInput = document.getElementById("player-name")
const btnFive = document.getElementById("5-dollar")
const btnFifty = document.getElementById("50-dollar")
const btnHundred = document.getElementById("100-dollar")
const submitBtn = document.getElementById("submit-btn")

const userName = document.getElementById("userName")
const userChips = document.getElementById("userChips")
const textDisplayed = document.getElementById("text")
const cardsEl = document.getElementById("cards-el")
const sumEl = document.getElementById("sum-el")
const startBtn = document.getElementById("start-game")
const draw = document.getElementById("draw")

let score = 0
let user = {
    currentMoney: 0,
    name: ""
}
let myArr = []
let myCards = []
let firstCard = 0
let secondCard = 0
let newCard = 0
let isAlive = false
let won = false
let sum = 0
let message = ""

btnFive.addEventListener("click", function () {
    score = 5
    btnFifty.classList.remove("clicked")
    btnFive.classList.add("clicked")
    btnHundred.classList.remove("clicked")
})

btnFifty.addEventListener("click", function () {
    score = 50
    btnFifty.classList.add("clicked")
    btnFive.classList.remove("clicked")
    btnHundred.classList.remove("clicked")
})

btnHundred.addEventListener("click", function () {
    score = 100
    btnFifty.classList.remove("clicked")
    btnFive.classList.remove("clicked")
    btnHundred.classList.add("clicked")
})

submitBtn.addEventListener("click", function (event) {
    if (nameInput.value && score) {
        event.preventDefault()
        user.name = nameInput.value
        user.currentMoney = score
        firstPage.classList.add("hide")
        userName.textContent = user.name
        userChips.textContent = user.currentMoney
    }
})

function getRandomNum() {
    return Math.floor(Math.random() * 11) + 1
}

startBtn.addEventListener("click", function () {
    isAlive = true
    if (isAlive /* && score > 0 */) {
        firstCard = getRandomNum()
        secondCard = getRandomNum()
        myCards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
})

function renderGame() {
    if (sum < 21) {
        message = "Draw more ?"
        won = false
        score--

    } else if (sum === 21) {
        message = "You've got a BLACKJACK!"
        won = true
        score += 10
    } else {
        message = "You're out of the game"
        isAlive = false
        won = false
        score -= 5
    }

    user.currentMoney = score
    userChips.textContent = user.currentMoney
    textDisplayed.textContent = message
    cardsEl.textContent = ": "
    myArr = myCards.join(" - ")
    cardsEl.textContent += myArr
    sumEl.textContent = `: ${sum}`
}

draw.addEventListener("click", function () {
    if (isAlive && won === false) {
        newCard = getRandomNum()
        myCards.push(newCard)
        sum += newCard
        renderGame()
    }
})