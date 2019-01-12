Let the planning begin!

Big picture: 
  - use Rails api backend
  - use React (with Redux & Thunk) frontend

  to create the ability to:
    - play "The Game"
    - save a game in progress
    - retrieve an incomplete game & play through it
    - display a leader board of some sort 

The Game -- a card game developed by IDW Games
  Cards
    - 2 1 cards
    - 2 100 cards
    - 98 cards with the numbers 2-99
  
  Goal:
    Run out the deck by playing the cards dealt to you in ascending or descending order on 4 piles. 

  Basic Game Play:

    To start, the 1 & 100 cards are laid out to begin our piles and the user is dealt 7 cards. 

    Each turn, a player must play at least 2 cards from their hand. 

    A card is played by putting it on one of the four piles. 

    Cards placed on the 100 piles must be smaller in value than the pile's top most card. Cards placed on the 1 piles must be larger in value than the pile's top most card. 

    Except, a card may be played out of out of order if its value is exactly 10 greater or less than the pile's top most card. For example, if a 1 pile has a top most card of 45, instead of having to play a card with a value greater than 45, the player may play a card with a value of 35.  

    After the player plays at least 2 cards from their hand, they draw as many cards as needed to get back up to 7 cards in their hand. 

    The player takes turns until they cannot make any more valid plays (they lose or they run out the deck (they win).

Game Play in detail:
  - New Game initialized
  - deck shuffled
  - 7 cards dealt/move from deck to player's hand
  TURN
    Play
      - check if player has any possible moves
        - if yes
          continue on to player's turn
        - if not
          announce the loss to the player
          change game status to complete
      - player plays a card
        - selects a card from hand
        - selects a pile to play the card on
        - confirms move
          - if move is valid
            - card is moved from hand to pile
          - else
            - card in hand & pile are deselected
            - alert displayed to user that move cannot be made
    Repeat Play at least once more (must play at least 2 cards per turn)
        How to keep track of how many cards have been played to ensure player plays at least 2 cards?
         - some sort of counter that gets cleared when the player confirms that their turn is complete?
    Confirm turn is complete
      - after second play ask if player would like to play another card
        if yes,
          Repeat Play & end up back at this prompt after
        else,
          ask them to confirm that they're turn is over
    Draw up to 7
      - as many cards as need to bring the player's hand back up to 7 are moved from the deck to the hand
  Repeat TURN until game is complete (won or lost)


  maybe move Draw up to 7 to start of a turn? 

Initialize a game with a Deck containing 98 cards numbered 2-99, an empty hand, 2 empty ASC (1) piles, and 2 empty DESC (100) piles.

Move cards from the game's deck to hand to pile as the game is played.


NEXT STEPS:

1. Figure out how you want to update a game each time a card moves
    can we update the game 
    or 
    are there too many layers of data
      if so, maybe we set up a controller action that just changes the Deck, Pile & Hand?

2. Once you can move a card from deck to hand, hand to pile, ... etc., Figure out how you're going to build a turn
    at least 2 cards played
    check if game is over
    deal up to 7 cards to player

3. Separate button to save a game? or create upon starting a new game and save changes each turn

4. Index of all the games (click on a game and go to its show page where you can play it)



How're we gonna render a game?

App
  Game - needs to know all the things about a single game
    Deck -  needs to know how many cards remain
    Piles - needs to know about a collection of piles
      Pile 
      Pile
      Pile
      Pile
        needs to know its type (ASC/DESC) and the value of its top most card
        needs to listen for a click (selecting a pile to play a card on)
    Hand - needs to know about the cards it holds 0 - 7 
      Card 
      Card
      Card
      Card
      Card
      Card
      Card
        needs to know its value
        needs to listen for click (selecting the card to play)
        needs to indicate if a card has been played . . . 
          do I conditionally render the cards and then have them disappear/not render once they're played?
          nah, move the card (-- just move data around the store? interact with the backend? yuck, probably not interact with the backend each move, but maybe at the end of each turn? --) & have the components re render

  somebody 
    Deal 7 cards from the deck to Hand
    once a card and pile have been selected, pop up confirmation questions "Do you want to make this move?"
    check if move is valid
    move card
    check how many cards have been played this turn
    once two cards have been played, render button to end turn


Let's get a valid move working. 

We need to
    needs to listen for click on Card (selecting the card to play)
    needs to listen for a click on Pile (selecting a pile to play a card on)
    once both a pile and a card have been selected
        check to see if it's a valid move 
        If yes, 
          pop up confirmation questions "Do you want to make this move?"
          if yes,
            make move,
             ...
          if no,
            clear the sotre object holding selections
        If no, 
          alert "That's not a valid move."
          clear the store object holding selections



    ok how are we going to "make a move"
    we need to (this takes communicating with the db)
      update the card's whereIsCard_type attribute to "Pile"
      update the card's whereIsCard_id attribute to the Pile's Id
    update the cards played this turn counter (it reachign 2 should trigger rendering an "End Turn" that will reset the counter and deal up to 7 cards to the player ... dealing is also gonna take interaction with the db ... booo. I should have just had cards belong_to a game and a game has_many cards then given cards a deck, hand, pile1, pil2, pile3, and pile4 boolean attributes. Then I could indicate that a card is in the deck by setting card.deck = true & setting the rest of the possible locations to false.  Grrrr. . .  I made it more complicated.)

    But back, to the system you've set up. 
    You want to send info about a card and a pile, what do you want to get back after the request? The whole game again . . . that seems useless.  I'm starting to think we don't need to send all the cards in the deck or most of the cards in each pile up either.  

    you need the cards in Hand for sure, then you just need  a count of cards in the deck, and the top most card of each pile. yurp. 

    let's decide when we get to futzign with the back end. 
    For now, let's start with setting up our listeners, alerts, and storing selections in the redux store.

    ----------

    selected card and pile have been added to store

    need to ensure that when we select a second card or pile, the first one we selected in deselected

    --------

    maybe determine HandCardClassName based on id of selectedCard, not based on local state

    if(card.id === selectedCard.id){
      return "SelectedHandCard"
    }else{
      return "HandCard"
    }

    then if two cards are selected the first will go back to normal after the second is selected

    & same concept for Pile -- determine this at highest shared component & pass down?

    --------

    set up store.moves to hold card_id & pile_id so we have info to update db at end of each turn

    when store.moves.length >=2 render component with "End turn?"

    -------

    set up a component that renders when selectedCard & selectedPile's ids are !== 0 i.e. when a card and a pile have been selected

    it should ask if player wants to make this move, 
    if yes, 
      check if valid move
        if yes, 
          store move in store.moves
          update top most card of pile
            this is gonna take some adjusting b/c right now we're doing this based on pile from db
            we can change the store for sure
            but, maybe we also want to change what data the api is providing
            b/c we really don't need all the cards
          indicate that card has been played so it isn't shown to player any more
          deselectCard and deselectPile
        if no, 
          alert that move is invalid
          deselectCard and deselectPile
    if no, 
      deselectCard and deselectPile
      (this should make prompt go away)

 -----

 let's start today with rewrorking the data provided by our api to better fit our needs on the client side
    - just the number of cards in the deck
    - just the top most card of a pile (or even just its value)

------

What we can do now, 
  I store moves client side and persist them at the end of each turn.
  At the end of each turn I deal enough cards to ge the player back up to seven cards in their hand. 



  is it 12 commits that make the git hub tracker go slightly darker?

  -----

  when tryign to end a game to test if my async update to change the games status would work I realized a problem

  the problem: the game can end in the middle of a turn!
   I can't get to the end turn button b/c I've only played a single card
   BUT there aren't any more valid moves

  SO
  games#update needs to respond to :newMove and :endTurn; maybe change :over to :endGame for consistency

  clicking the "Play card" button should trigger a request to games#update that persists the move with move info in :newMove and increase a moves counter

  when the moves counter is 2 or greater the "End Turn" button should be rendered

  clicking "End Turn" should trigger a request to games#upte that deals up to 7 cards and should reset the moves counter

-- 
what's left toget basic game play working?

need to sort out who will be looking for whether the game has ended and get that working
 - I've set it up in both front & back end, but neither is sufficient
 just checking if there are legal moves remaining after each move 
 doesn't account for when there may be no remaining valid moves based on the current hand,
 but the player could end the turn and get dealt additional cards
 If we check whether the game is over only after a turn ends I'm not accounting for when 
 a game might end mid turn because the player can't play any more of the cards in her hand
 but she hasn't played at least two cards to complete her turn

 grrrrr

 alright, if the logic of whether the game is over depends how many cards have been played 
 then we need access to the store where we're counting the number of cards played
 so, front end it is!

 when is a game over? 
  when none of the cards in the player's hand are playable on any of the piles
  AND the player hasn't played at least two cards this turn 
  (i.e. they can't end their turn and possibly get playable cards from the deck)

--

I now have a function that accurately checks whether the game is over
When/where do we want to call it?
AND
what do should happen when it returns true, i.e. when a game is over
  need to change the game's status in the db to false
  ¿disable game play? 
    meh what's the harm in a player being able to select a card & pile?

---

well crud, I the game returned still has a status of true.

woo saving the game after changing the status fixed it!

--- 

What's left 
  X 1. checking to see if game is over -- i.e. deck runs out or no more possible moves
  X 2. behavior when game ends
      - update game's status attr to false
      - ¿is this when we'll ask for the player's name to display on a leader board?
      - some indication on the game's show page that the game cannot be played further
  3. routing
      - get to game's show page via client side routing
      - dynamically generate url to send get & put requests for games with different ids
  4. index
      - list of games indicating status, . . . ? deck's cardCount
      - or just have this be a list of active games
  5. leader board
      - list of completed games sorted by cards left in deck
      - display cards left in deck, playerName
  6. Link/button to create a new game 
      - spins up a new game (give it piles, a deck, a hand, give the deck card 2-99 & shuffle, deal 7 cards to the hand)
      - ask for playerName here?
  7. Header & footer with nav links
  8. ability to delete a game?

2019-1-4 Goals:
  1.
    GET /games/:gameId - displays the game whose id attribute matches the value of :gameId
  2.
    GET /games - displays a list of games from the db
  3.
    NavBar on all urls

Right now, 
GET /games/:gameId displays the game whose id attribute's value is 1 regardless of the value provided for gameId in the url. 

Let's find out when & where the fetch request to the backend is occurring.

mmk, we got these 2 in the Console:

1) Success: from endGame
tells me:
Navigating to /games/:gameId triggers endGame, a function that dispatches a PUT request to /games/1 via fetch.  


2) Error: Given action "GET_GAME_SUCCESS", reducer "game" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.

When endGame's fetch function's promise resolves, endGame dispatches setGame with ...

oh, I see what caused this error.  
The anonymous function that logged 'Success: from endGame' and and the data returned from the server, did not pass the returned data on to the subsequent then call. As a result, setGame was dispatched with undefined as its argument instead of the expected data representing a game. 


mmk, back to the client to see when endGame is being triggered. 

/containers/Game:
  componentDidMount(){
    if(this.props.currentGame.status !== false){
      if(this.gameOver()){
        this.props.endGame()
      }
    }
  }

When the Game component mounts, 
check to see if the value of the Game component's props's currentGame's status isn't false.  
If it isn't, 
check to see if the gameOver function returns true. 
If it does, 
call the function endGame stored in the Game component's props.

hrm . . . 
The initial currentGame held in redux's store & mapped to the App component's props & passed down to Game via props has a status of true. 

Thus, when Game mounts, this.props.currentGame.status is indeed not false and the condition of the first if statement will evaluate to true. 

Because endGame is being called, we know that the initial currentGame must cause gameOver to evaluate to true.

/containers/Game:
  gameOver = () =>{
    if(this.playedAtLeastTwo()){
      // if player has played at least 2 cards, the game isn't over b/c they can get more cards to play
      return false
    }else{
      // if the player has played 0 or 1 cards, then the game is over 
      // if they cannot play any of the cards currently in their hand
      if(this.props.currentGame.deck.cards === 0 || 
        (!this.playableOnDesc().includes(true) && !this.playableOnAsc().includes(true))
      ){
        return true
      }else{
        return false
      }
    }
  }


Yup, that checks out. 

The initial moves count in redux's store is 0, so the this.playedAtLeastTwo will evaluate to false.

As a result, gameOver will check the size of the currentGame's deck and whether any of the curentGame's hand's cards could be played on the game's piles. 

The initial currentGame's deck has a cardCount of -1, thus the first option of if statement's conditional will be false.

The initial currentGame's hand's cards collection is empty, thus the collections resulting from playableOnDesc() & playableOnAsc() won't include any true elements. 

The client thinks the initial game is over & telss the backend to update the databse to reflect that conclusion. 

I need to update gameOver to enable it to recognize that the initial currentGame isn't over. 



Scenarios & desired result from gameOver:
1. initial currentGame

this.props.currentGame.deck.cardCount === -1 
&& 
(
!this.playableOnDesc().includes(true) 
&& 
!this.playableOnAsc().includes(true)
)

expect to return false

2. Game over buy win
currentGame.deck.cardCount === 0 
&&
currentGame.hand.cards.length === 0

expect to return true

3. out of playable cards, but can get more

expect to return false


4. out of playable cards & cannot get more 

expect to return true


2019-1-10:
  X1.
    GET /games/:gameId - displays the game whose id attribute matches the value of :gameId
  X2.
    GET /games - displays a list of games from the db
  X 3.
    NavBar on all urls
  4. set up form | button to creat a new game from ?
        ¿ /games | / | all (¿ somewhere on each page | in navbar)
  5. 
    enable GET /games/:gameId to 
    display some warning/ notification to the user when they browse to a :gameId that doesn't have a game in the db associated with it ( game was deleted or hasn't been created )

2:
I've made a start on #2.

I have code that creates a list of links to react routes generated based on hardcoded data saved in App's state and passed down to GamesList via props. But, I'm getting this 'Warning: Each child in an array or iterator should have a unique "key" prop.' when the code runs. 

I want to sort this. Then, make it so the list of links is based on data fetched from the db. 

After lots of futzing and trying to get fix this, I discovered the issue was in my hardcoded data.  I had given two of the game the same id. 

So now it works, but there's no reason to have changed the way I did it.  I'm gonna leave it b/c it works so I see no reason to change it back. 


3:
What do I want in my NavBar?
Links to:
  - /games/new; "New Game"
    displays a form to create a new game that when submitted creates a new game in the database and redirects the user to the new game's show page so that she may begin to play
  - /games; "Index of Games"
    displays a list of links to the show pages of existing games in the database
  - /rules; "Rules"
    displays the rules re how to play The Game

4:
Ok, so the back end is all set to take in a playerName and return a game ready to play. 

Next I need to make the front end POST the playerName data to /games and redirect to the new game's show page -- the show page could handle retreiving and setting the currentGame

.... how do I get the page to redirect?

start with this example tomorrow:
https://reacttraining.com/react-router/web/example/auth-workflow

2019-1-11:
  1. 
    set up form | button to creat a new game from ?
          ¿ /games | / | all (¿ somewhere on each page | in navbar)   
  2. 
    enable GET /games/:gameId to 
    display some warning/ notification to the user when they browse to a :gameId that doesn't have a game in the db associated with it ( game was deleted or hasn't been created )
  3. 
    Review assignment requirements&&checklist to see if this is sufficient.
  Add additional functionality to meet project requirements before moving on to styling. 

  4. 
    style the whole thing 
  5. 
    make it clear who developed the game(IDW Games) on the root url & on the rules page -- maybe link to their website?
    and why you chose it (in the readMe)


2019-1-12:
  X 1. 
    set up form | button to creat a new game from ?
          ¿ /games | / | all (¿ somewhere on each page | in navbar)   
  X 2. 
    refactor makeMove to take in a gameId & make PUT request to games/:gameId
  X 3. 
    refactor endTurn to take in a gameId & make PUT request to games/:gameId
  X 4. 
    refactor endGame to take in a gameId & make PUT request to games/:gameId
  5. 
    new problem:
      the app breaks when using ¿some? games' link on the games index. I get 'TypeError: Cannot read property 'value' of null'.
      But, when I refresh the browser the app works fine

    all of the games, not all of the time

    /games to /games/:gameId
      - successful for:
        - Sam's (id: 1)
        - Steve's (id: 13)
        - Greg's (id: 15)
      - TypeError for:
        - Dave's (id: 14)
        - Pearl's (id: 16)

    Game._this.playableOnDesc doesn't deal with when the top most card on a deck is 'null' i.e. there isn't one

  6. 
    Review assignment requirements&&checklist to see if this is sufficient.
    Add additional functionality to meet project requirements before moving on to styling. 
  7. 
    style the whole thing 
  8. 
    make it clear who developed the game(IDW Games) on the root url & on the rules page -- maybe link to their website?
    and why you chose it (in the readMe)
  9. 
    enable GET /games/:gameId to 
    display some warning/ notification to the user when they browse to a :gameId that doesn't have a game in the db associated with it ( game was deleted or hasn't been created )









