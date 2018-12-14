# Today's Problem:
  # If finish a turn and send a PUT request 
  # with info about the moves to persist to games#update
  # the controller action renders the data starting on 199
  # The game only has 5 cards in its hand. 
  # The game's deck' cardCount hasn't decreased.
  # But, if I refresh the page and fetch the same game 
  # from the games#show action I get the data starting on 18.
  # The game has 7 cards in its hand. 
  # The game's deck' cardCount has decreased.
  # but the game's piles' topMostCard has updated
  # and that card show's updated whereIsCard_type and whereIsCard_id attrs

  # why are only some of the changes performed in games#update 
  # getting rendered, but all of them are getting made and
  # rendered when a subsequent GET request is sent to games#show?


class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show, :update, :destroy]

  def index
    render json: Game.all, include: '**'
  end

  def show
    render json: @game, include: '**'
    # this is rendering:
    #     {
    #     "id": 1,
    #     "status": true,
    #     "playerName": "Sam",
    #     "piles": [
    #         {
    #             "id": 5,
    #             "asc": true,
    #             "game_id": 1,
    #             "topMostCard": {
    #                 "id": 198,
    #                 "value": 9,
    #                 "whereIsCard_type": "Pile",
    #                 "whereIsCard_id": 5,
    #                 "created_at": "2018-12-10T18:14:20.899Z",
    #                 "updated_at": "2018-12-13T21:59:20.900Z"
    #             }
    #         },
    #         {
    #             "id": 6,
    #             "asc": true,
    #             "game_id": 1,
    #             "topMostCard": {
    #                 "id": 196,
    #                 "value": 4,
    #                 "whereIsCard_type": "Pile",
    #                 "whereIsCard_id": 6,
    #                 "created_at": "2018-12-10T18:14:20.891Z",
    #                 "updated_at": "2018-12-13T22:06:00.251Z"
    #             }
    #         },
    #         {
    #             "id": 7,
    #             "asc": false,
    #             "game_id": 1,
    #             "topMostCard": {
    #                 "id": 192,
    #                 "value": 77,
    #                 "whereIsCard_type": "Pile",
    #                 "whereIsCard_id": 7,
    #                 "created_at": "2018-12-10T18:14:20.872Z",
    #                 "updated_at": "2018-12-13T23:17:33.631Z"
    #             }
    #         },
    #         {
    #             "id": 8,
    #             "asc": false,
    #             "game_id": 1,
    #             "topMostCard": {
    #                 "id": 193,
    #                 "value": 66,
    #                 "whereIsCard_type": "Pile",
    #                 "whereIsCard_id": 8,
    #                 "created_at": "2018-12-10T18:14:20.877Z",
    #                 "updated_at": "2018-12-13T23:24:02.331Z"
    #             }
    #         }
    #     ],
    #     "deck": {
    #         "id": 1,
    #         "game_id": 1,
    #         "cardCount": 60
    #     },
    #     "hand": {
    #         "id": 1,
    #         "game_id": 1,
    #         "cards": [
    #             {
    #                 "id": 184,
    #                 "value": 91,
    #                 "whereIsCard_type": "Hand",
    #                 "whereIsCard_id": 1,
    #                 "created_at": "2018-12-10T18:14:20.840Z",
    #                 "updated_at": "2018-12-13T23:17:33.675Z"
    #             },
    #             {
    #                 "id": 178,
    #                 "value": 86,
    #                 "whereIsCard_type": "Hand",
    #                 "whereIsCard_id": 1,
    #                 "created_at": "2018-12-10T18:14:20.815Z",
    #                 "updated_at": "2018-12-13T23:34:06.921Z"
    #             },
    #             {
    #                 "id": 173,
    #                 "value": 29,
    #                 "whereIsCard_type": "Hand",
    #                 "whereIsCard_id": 1,
    #                 "created_at": "2018-12-10T18:14:20.795Z",
    #                 "updated_at": "2018-12-13T23:38:59.146Z"
    #             },
    #             {
    #                 "id": 171,
    #                 "value": 26,
    #                 "whereIsCard_type": "Hand",
    #                 "whereIsCard_id": 1,
    #                 "created_at": "2018-12-10T18:14:20.785Z",
    #                 "updated_at": "2018-12-13T23:45:38.885Z"
    #             },
    #             {
    #                 "id": 169,
    #                 "value": 74,
    #                 "whereIsCard_type": "Hand",
    #                 "whereIsCard_id": 1,
    #                 "created_at": "2018-12-10T18:14:20.777Z",
    #                 "updated_at": "2018-12-13T23:47:28.922Z"
    #             },
    #             {
    #                 "id": 170,
    #                 "value": 34,
    #                 "whereIsCard_type": "Hand",
    #                 "whereIsCard_id": 1,
    #                 "created_at": "2018-12-10T18:14:20.780Z",
    #                 "updated_at": "2018-12-13T23:47:28.924Z"
    #             },
    #             {
    #                 "id": 168,
    #                 "value": 83,
    #                 "whereIsCard_type": "Hand",
    #                 "whereIsCard_id": 1,
    #                 "created_at": "2018-12-10T18:14:20.773Z",
    #                 "updated_at": "2018-12-13T23:48:36.806Z"
    #             }
    #         ]
    #     }
    # }
  end

  def create
    game = Game.new(game_params)
    if game.save
      render json: game
    else
      render json:{message: game.errors}, status: 400
    end

    # every new game
    # make a new game with the playerName
      # game = Game.new(game_params)
    # make a deck
      # game.deck.create
    # give the deck cards 2-99, already shuffled
      # (2..99).to_a.shuffle!.each do |value|
      #   game.deck.cards.create({"value": value})
      # end
    # make a hand
      # game.hand.create
    # make 2 asc piles
      # 2.times{game.piles.create({"asc":true})}
    # make 2 desc piles
      # 2.times{game.piles.create({"asc":false})}

  end

  def update
    # make this turn's moves
    makeMoves(game_params[:newMoves])

    # deal up to seven cards from deck to hand
    dealUpToSeven

    # let's try explicitly saving each of the game's pieces
    # that aren't coming through right
    # @game.hand.save

    # maybe if we tell the controller to go get the whole game again 
    # whole game again before rendering it'll grab updated
    # infor from the database
    game = Game.find_by(id: @game.id)
    render json: game, include: '**'
    # woooooooooooo
    # deck's cardCount went down and
    # hand has 7 cards!

    # if @game.save
    #   render json: @game, include: '**'
      # this is rendering:
      # {
      #   "id":1,
      #   "status":true,
      #   "playerName":"Sam",
      #   "piles":[
      #     {
      #       "id":5,
      #       "asc":true,
      #       "game_id":1,
      #       "topMostCard":
      #         {
      #           "id":198,
      #           "value":9,
      #           "whereIsCard_type":"Pile",
      #           "whereIsCard_id":5,
      #           "created_at":"2018-12-10T18:14:20.899Z",
      #           "updated_at":"2018-12-13T21:59:20.900Z"
      #         }
      #     },
      #     {
      #       "id":6,
      #       "asc":true,
      #       "game_id":1,
      #       "topMostCard":
      #         {
      #           "id":196,
      #           "value":4,
      #           "whereIsCard_type":"Pile",
      #           "whereIsCard_id":6,
      #           "created_at":"2018-12-10T18:14:20.891Z",
      #           "updated_at":"2018-12-13T22:06:00.251Z"
      #         }
      #     },
      #     {
      #       "id":7,
      #       "asc":false,
      #       "game_id":1,
      #       "topMostCard":
      #         {
      #           "id":192,
      #           "value":77,
      #           "whereIsCard_type":"Pile",
      #           "whereIsCard_id":7,
      #           "created_at":"2018-12-10T18:14:20.872Z",
      #           "updated_at":"2018-12-13T23:17:33.631Z"
      #         }
      #     },
      #     {
      #       "id":8,
      #       "asc":false,
      #       "game_id":1,
      #       "topMostCard":
      #         {
      #           "id":193,
      #           "value":66,
      #           "whereIsCard_type":"Pile",
      #           "whereIsCard_id":8,
      #           "created_at":"2018-12-10T18:14:20.877Z",
      #           "updated_at":"2018-12-13T23:24:02.331Z"
      #         }
      #     }
      #   ],
      #   "deck":
      #     {
      #       "id":1,
      #       "game_id":1,
      #       "cardCount":60
      #     },
      #   "hand":
      #     {
      #       "id":1,
      #       "game_id":1,
      #       "cards":
      #         [
      #           {
      #             "id":184,
      #             "value":91,
      #             "whereIsCard_type":"Hand",
      #             "whereIsCard_id":1,
      #             "created_at":"2018-12-10T18:14:20.840Z",
      #             "updated_at":"2018-12-13T23:17:33.675Z"
      #           },
      #           {
      #             "id":178,
      #             "value":86,
      #             "whereIsCard_type":"Hand",
      #             "whereIsCard_id":1,
      #             "created_at":"2018-12-10T18:14:20.815Z",
      #             "updated_at":"2018-12-13T23:34:06.921Z"
      #           },
      #           {
      #             "id":173,
      #             "value":29,
      #             "whereIsCard_type":"Hand",
      #             "whereIsCard_id":1,
      #             "created_at":"2018-12-10T18:14:20.795Z",
      #             "updated_at":"2018-12-13T23:38:59.146Z"
      #           },
      #           {
      #             "id":170,
      #             "value":34,
      #             "whereIsCard_type":"Hand",
      #             "whereIsCard_id":1,
      #             "created_at":"2018-12-10T18:14:20.780Z",
      #             "updated_at":"2018-12-13T23:47:28.924Z"
      #           },
      #           {
      #             "id":168,
      #             "value":83,
      #             "whereIsCard_type":"Hand",
      #             "whereIsCard_id":1,
      #             "created_at":"2018-12-10T18:14:20.773Z",
      #             "updated_at":"2018-12-13T23:48:36.806Z"
      #           }
      #         ]
      #       }
      #     }
    # else
    #   render json:{message: @game.errors}, status: 400
    # end

    
  end

  def destroy
    if @game.destroy
      render status: 204
    else
      render json: {message: "Unable to delete game"}, status: 400
    end
  end


  private

  def game_params
    params.require(:game).permit(
      :status, 
      :playerName, 
      {newMoves:[:card_id, :pile_id]}
      )
  end

  def set_game
    @game = Game.find_by(id: params[:id])
  end

  def dealUpToSeven
    numOfCardsInHand = @game.hand.cards.length
    if (numOfCardsInHand < 7)
      numToDeal = (7-numOfCardsInHand)
      numOfCardsInDeck = @game.deck.cards.length
      cardsToDeal = @game.deck.cards.slice(-numToDeal, (numOfCardsInDeck-1))
      cardsToDeal.each do |card|
        card.whereIsCard = @game.hand
        card.save
      end
      # @game.hand.save
    end
  end

  def makeMoves(moves)
    moves.each do |move| 
      card = Card.find_by(id: move[:card_id])
      pile = Pile.find_by(id: move[:pile_id])
      card.whereIsCard = pile
      card.save
    end
  end

end