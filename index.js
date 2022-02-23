let deckId

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

let drawCardsBtn = document.getElementById('draw-cards')
drawCardsBtn.addEventListener('click', () => {
    fetch(
        `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            document.getElementById('cards').innerHTML = `
                <img src=${data.cards[0].image} />
                <img src=${data.cards[1].image} />
            `
        })
})