let deckId
const cardsRemaining = document.getElementById('cardsRemaining')
const newDeckBtn = document.getElementById('new-deck')
const drawCardsBtn = document.getElementById('draw-cards')
const cards = document.getElementById('cards')
const cardSlot = document.getElementsByClassName('cardSlot')
const winnerTextDisplay = document.getElementById('winnerTextDisplay')
const computerScoreDisplay = document.getElementById('computerScoreDisplay')
const userScoreDisplay = document.getElementById('userScoreDisplay')

function handleClick() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            drawCardsBtn.classList.remove('disabled')
            cardsRemaining.textContent = `Cards remaining: ${data.remaining}`
            cardsRemaining.style.visibility = 'visible'
            drawCardsBtn.disabled = false
        })
}

newDeckBtn.addEventListener('click', handleClick)

drawCardsBtn.addEventListener('click', () => {
    fetch(
        `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
        .then(res => res.json())
        .then(data => {
            cards.children[1].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `

            cards.children[2].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `

            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            winnerTextDisplay.textContent = winnerText
            cardsRemaining.textContent = `Cards remaining: ${data.remaining}`

            if (data.remaining === 0) {
                drawCardsBtn.disabled = true
                drawCardsBtn.classList.add('disabled')
                if (computerScore > userScore) {
                    winnerTextDisplay.textContent = 'Computer wins the game!'
                } else if (computerScore < userScore) {
                    winnerTextDisplay.textContent = 'You win the game!'
                } else if (computerScore === userScore) {
                    winnerTextDisplay.textContent = `It's a tie game!`
                }
            }

            for (let card of cardSlot) {
                card.style.border = 'none'
            }
        })
})

let computerScore = 0
let userScore = 0

function determineCardWinner(card1, card2) {
    // prettier-ignore
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore += 1
        computerScoreDisplay.textContent = computerScore
        return 'Computer wins!'
    } else if (card1ValueIndex < card2ValueIndex) {
        userScore += 1
        userScoreDisplay.textContent = userScore
        return 'You win!'
    } else {
        return `It's War!`
    }
}
