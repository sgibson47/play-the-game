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
    moves = game_params[:newMoves]

    # make this turn's moves
    moves.each do |move| 
      card = Card.find_by(id: move[:card_id])
      pile = Pile.find_by(id: move[:pile_id])
      card.whereIsCard = pile
      card.save
    end 

    # deal up to seven cards from deck to hand
    dealUpToSeven

# 
    # render json: @game, include: '**'
    # {"newMoves":[{"card_id":104,"pile_id":8},{"card_id":105,"pile_id":8}]}
    # need to 
    # iterate through moves, changing each card's location
    # save changes
    # the updated game


    if @game.save
      render json: @game, include: '**'
    else
      render json:{message: @game.errors}, status: 400
    end

    
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
      @game.hand.save
    end
  end

end