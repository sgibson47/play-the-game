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

How am I gonna model this stuff?
  - Game
    id
    status: boolean
    playerName  
      -- for the leader board?
        Ask for at outset of game? 
        or 
        Ask for when game is completed?    
      -- maybe later 
        set up a player/user model
        set up log in
        make games 
          public (other users can play on your saved game) 
          or 
          private (only the creator may view & play)

  has_many :piles
  has_one :deck
  has_one :hand
  
  - Card
    id
    value
    whereIsCard_id
    whereIsCard_type

  belongs_to :whereIsCard, polymorphic: true

  - Pile
    id
    type: [ASC, DESC]
    gameId
  
  belongs_to :game
  has_many :cards, as: :whereIsCard

  - Deck
    id
    gameId
  
  belongs_to :game
  has_many :cards, as: :whereIsCard

  - Hand
    id
    gameId
  
  belongs_to :game
  has_many :cards, as: :whereIsCard

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


Store?
  {
    game: {
      {
        id: 1,
        status: null,
        playerName: null,
        piles: [
          {
          id: 1,
          asc: null,
          game_id: 1,
          cards: [
            {
              id: 2,
              value: 43,
              whereIsCard_type: "Pile",
              whereIsCard_id: 1,
              created_at: "2018-12-07T22:34:28.507Z",
              updated_at: "2018-12-07T22:34:43.423Z"
            }
          ]
          }
        ],
        deck: {
          id: 1,
          game_id: 1,
          cards: [
            {
            id: 1,
            value: null,
            whereIsCard_type: "Deck",
            whereIsCard_id: 1,
            created_at: "2018-12-07T22:15:03.092Z",
            updated_at: "2018-12-07T22:15:03.092Z"
            }
          ]
        },
        hand: {
          id: 1,
          game_id: 1,
          cards: {
            type: "active_record/associations/collection_proxy",
            active_record/associations/collection_proxy: [ ]
          }
        }
      }
    },
    card:
  }

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




