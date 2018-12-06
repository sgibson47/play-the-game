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

  has many cards through Piles, Hands, and Decks
  
  - Card
    id
    number
    pileId
    handId
    deckId
  belongs to deck
  belongs to hand
  belongs to pile

  - Pile
    id
    type: [ASC, DESC]
    gameId
  belongs to game
  has many cards

  - Deck
    id
    gameId
  belongs to game
  has many cards

  - Hand
    id
    gameId
  belongs to game
  has many cards

Initialize a game with a Deck containing 98 cards numbered 2-99, an empty hand, 2 ASC (1) piles, and 2 DESC (100) piles.

Move cards from the game's deck to hand to pile as the game is played.





