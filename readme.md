# Project 1 Documentation
## by Matt Closson

## Introduction

This is a two player TV trivia game. 

## Technologies Used

- HTML
- CSS 
- JS
- jQuery

## Code

Here are the functions that make the application work. 

```js
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
        if(state.which) {
            $('.player-1').addClass('animate-color')
        } else {
            $('.player-2').addClass('animate-color')
        }
        state.which = !state.which
        localStorage.setItem('which', state.which)
    }
    localStorage.setItem('state', JSON.stringify(state))
    state = JSON.parse(localStorage.getItem('state'))
    checkWinner()
}
```


```js
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
```

```
const checkWinner = () => {
    if(state.player1 === 10) {
        $('.container').hide();
        $('.winner').show();
        $('#winning-player').text('Player 1 is the winner');
        state.player1 = 0;
        state.player2 = 0;
        state.which = true;
        localStorage.clear();
    } else if(state.player2 === 10) {
        $('.container').hide()
        $('.winner').show()
        $('#winning').text('Player 2 is the winner')
        state.player1 = 0;
        state.player2 = 0;
        state.which = true;
        localStorage.clear();
    } else {
        setBoard(questions)
    }
}
```