class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show, :update, :destroy]

  def index
    render json: Game.all, include: '**'
  end

  def show
    render json: @game, include: '**'
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
    makeMoves(game_params[:newMoves])

    dealUpToSeven(@game)

    game = Game.find_by(id: @game.id)

    render json: game, include: '**' 

    # hahahaha 
    # the pile's topMostCard isn't updating
    # to the rails console!
    # let's figure out if the piles table of the db
    # isn't getting changed with each move, or if
    # the inf isn't getting out properly

    # ok the extra cards played are there
    # so let's look at what we're retrieving
    # and storing in topMostCard when we serialize a pile
    # pile.cards.last
    # SELECT  "cards".* FROM "cards" WHERE "cards"."whereIsCard_id" = $1 AND "cards"."whereIsCard_type" = $2 ORDER BY "cards"."id" DESC LIMIT $3  [["whereIsCard_id", 5], ["whereIsCard_type", "Pile"], ["LIMIT", 1]]
    # <Card id: 198, value: 9, whereIsCard_type: "Pile", whereIsCard_id: 5, created_at: "2018-12-10 18:14:20", updated_at: "2018-12-13 21:59:20"
    # mmk, I'm grabbing the first card 
    # whose whereIsCard_type and _id match the pile 
    # from all the cards in descending order by id
    # not the card most recently assigned to that pile

    # Instead, retrieve the card based on most recent updated_at attr?
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

  def dealUpToSeven(game)
    numOfCardsInHand = game.hand.cards.length
    if (numOfCardsInHand < 7)
      numToDeal = (7-numOfCardsInHand)
      numOfCardsInDeck = game.deck.cards.length
      cardsToDeal = game.deck.cards.slice(-numToDeal, (numOfCardsInDeck-1))
      cardsToDeal.each do |card|
        card.whereIsCard = game.hand
        card.save
      end
    end
  end

  def makeMoves(moves)
    moves.each do |move| 
      card = Card.find_by(id: move[:card_id])
      pile = Pile.find_by(id: move[:pile_id])
      card.whereIsCard = pile
      card.save
      pile.save
    end
  end

end