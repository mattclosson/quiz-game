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

Here's the chooseAnswer function. This accepts the click event and the current question. It will check the player's selction with the correct answer. If these match, the player will gain a point. If not, the next player is chosen and it goes on to the checkWinner function. 

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
    
    // Event Listeners
    $("li").off()
    $("li").on("click", (event) => {
        chooseAnswer(event, randomQuestion)
    })

    // Current Player
    if(state.which === true) {
        $('#current-player').text("Player 001's turn")
    } else {
        $('#current-player').text("Player 002's turn")
    }
    $('#player-1-score').text(state.player1)
    $('#player-2-score').text(state.player2)
}
```

Here is where the board is set. A random question out of the question data array is selection. The options are filled, and an event listener is placed on the buttons. The scoreboard is also filled, and we can see who's turn it is and each player's score. 

```js
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

The last function is checking the winner of the game. If a player reaches 10 points, the winner page is showed and the board is reset. If there's no winner, a new question appears and the game continues.

## Deployment URL

https://seir-penguin-project-1-mattwclosson.vercel.app/