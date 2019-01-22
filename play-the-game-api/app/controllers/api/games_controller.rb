class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show, :update, :destroy]

  def index
    render json: Game.all, include: [:id, :playerName]
  end

  def show
    render json: @game
  end

  def create
    game = Game.create(game_params)
    setUpNewGame(game)
    
    if game.save
      @game = Game.find_by(id: game.id)
      render json: @game
    else
      render json:{message: game.errors}, status: 400
    end
  end

  def update
    if game_params[:newMove]
      makeMove(game_params[:newMove])
      @game.moves += 1 
      @game.save
      if @game.over
        @game.status = false
        @game.save
      end
    elsif game_params[:endTurn]
      dealUpToSeven(@game)
      @game.moves = 0 
      @game.save 
      if @game.over
        @game.status = false
        @game.save
      end
    end

    game = Game.find_by(id: @game.id)

    render json: game
  end

  def destroy
    if @game.destroy
      render status: 204
    else
      render json: {message: "Unable to delete game"}, status: 400
    end
  end

  private

  def set_game
    @game = Game.find_by(id: params[:id])
  end

  def game_params
    params.require(:game).permit(:status, :playerName,:endGame, :endTurn, {newMove: [:card_id, :pile_id]})
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

  def makeMove(move)
    card = Card.find_by(id: move[:card_id])
    pile = Pile.find_by(id: move[:pile_id])
    card.whereIsCard = pile
    card.save
    pile.save
  end

  def setUpNewGame(game)
    game.status = true

    game.moves = 0

    Deck.create(game_id: game.id)

    (2..99).to_a.shuffle!.each do |value|
      card = game.deck.cards.create({"value": value})
    end

    Hand.create(game_id: game.id)

    2.times{Pile.create({"asc":true, game_id: game.id})}
    2.times{Pile.create({"asc":false, game_id: game.id})}

    game.save
    dealUpToSeven(game)
  end

end