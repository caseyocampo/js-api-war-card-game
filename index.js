let deckId
let drawCardsBtn = document.getElementById('draw-cards')
let cards = document.getElementById('cards')
let cardSlot = document.getElementsByClassName('cardSlot')

function handleClick() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            drawCardsBtn.classList.remove('disabled')
        })
}

document.getElementById('new-deck').addEventListener('click', handleClick)

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

            for (let card of cardSlot) {
                card.style.border = 'none'
            }
        })
})
