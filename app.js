// STATE
let state = {
    player1: localStorage.player1 || 0,
    player2: localStorage.player2 || 0,
    currentQuestion: {},
    which: localStorage.which || true
}

if(localStorage.state) {
    state = JSON.parse(localStorage.getItem('state'))
    $('#yes').on('click', () => {
        $('.container').show()
        $('.continue-game').hide()
    })
    $('#no').on('click', () => {
        localStorage.clear();
        location.reload();
    })
} else {
    $('.container').show()
    $('.continue-game').hide()
}

let questions = []

// DOM ELEMENTS
const question = $('#question')
const a = $("#a")
const b = $("#b")
const c = $("#c")
const d = $("#d")

// Functions
const chooseAnswer = (event, question) => {
    if(event.target.innerText === question.answer) {
        if(state.which) {
            state.player1++
            state.which = !state.which
        } else {
            state.player2++
            state.which = !state.which
        }
        setBoard(questions)
    } else {
        state.which = !state.which
        localStorage.setItem('which', state.which)
        setBoard(questions)
    }
    localStorage.setItem('state', JSON.stringify(state))
    state = JSON.parse(localStorage.getItem('state'))
}

const setBoard = (q) => {
    // Getting a random question
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]
    question.text(randomQuestion.question)
    a.text(randomQuestion.a)
    b.text(randomQuestion.b)
    c.text(randomQuestion.c)
    d.text(randomQuestion.d)
    
    $("li").off()
    $("li").on("click", (event) => {
        chooseAnswer(event, randomQuestion)
    })
    if(state.which === true) {
        $('#current-player').text("Player 001's turn")
    } else {
        $('#current-player').text("Player 002's turn")
    }
    $('#player-1-score').text(state.player1)
    $('#player-2-score').text(state.player2)
}

// Logic
const url = "https://cdn.contentful.com/spaces/sii2g4c5fqq1/environments/master/entries?access_token=493oaWG0DstmT9tL_7obbiDy1CXARJPyZAv7rpjE-DM"

$.ajax(url).then((data) => {
    questions = data.items.map((q) => q.fields)

    setBoard(questions)
})