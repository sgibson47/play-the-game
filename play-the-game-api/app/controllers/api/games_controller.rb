class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show, :update, :destroy]

  def index
    render json: Game.all, include: '**'
  end

  def show
    # @game = Game.find_by(id: params[:id])
    render json: @game, include: '**'
  end

  def create
    game = Game.new(game_params)
    if game.save
      render json: game
    else
      render json:{message: game.errors}, status: 400
    end

  #   # every new game
  #   # make a new game with the playerName
  #     # game = Game.new(game_params)
  #   # make a deck
  #     # game.deck.create
  #   # give the deck cards 2-99, already shuffled
  #     # (2..99).to_a.shuffle!.each do |value|
  #     #   game.deck.cards.create({"value": value})
  #     # end
  #   # make a hand
  #     # game.hand.create
  #   # make 2 asc piles
  #     # 2.times{game.piles.create({"asc":true})}
  #   # make 2 desc piles
  #     # 2.times{game.piles.create({"asc":false})}
  end

  def update
    if game_params[:newMove]
      makeMove(game_params[:newMove])
      if !gameOver(@game)
        @game.status = false
      end
    elsif game_params[:endTurn]
      dealUpToSeven(@game)
      if !gameOver(@game)
        @game.status = false
      end
    end

    game = Game.find_by(id: @game.id)

    render json: game, include: '**' 
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
    params.require(:game).permit(:status, :playerName, :endTurn, {newMove: [:card_id, :pile_id]})
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

  def topMostCardsAsc(game)
    cards = []
    game.piles.each do |pile|
      if pile.asc == true
        cards << pile.cards.mostRecentlyUpdated.one[0]
      end
    end
    return cards
  end

  def topMostCardsDesc(game)
    cards = []
    game.piles.each do |pile|
      if pile.asc != true
        cards << pile.cards.mostRecentlyUpdated.one[0]
      end
    end
    return cards
  end

  def playableOnAsc(game)
    topCards = topMostCardsAsc(game)
    array = []
    game.hand.cards.each do |card|
      if topCards[0] == nil || topCards[1] == nil 
        array << true
      elsif card.value < topCards[0].value && card.value < topCards[1].value
        array << false
      else
        array << true
      end
    end
    return array
  end

  def playableOnDesc(game)
    topCards = topMostCardsDesc(game)
    array = []
    game.hand.cards.each do |card|
      if topCards[0] == nil || topCards[1] == nil 
        array << true
      elsif card.value > topCards[0].value && card.value > topCards[1].value
        array << false
      else
        array << true
      end
    end
    return array
  end


  def gameOver(game)
    if game.deck.cards.length == 0 || (playableOnDesc(game).include?(true) && !playableOnAsc(game).include?(true))
      return true
    else 
      return false
    end
  end



end