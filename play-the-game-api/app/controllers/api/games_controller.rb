class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show, :update, :destroy]

  def index
    render json: Game.all, include: '**'
    # , include: "hand.cards,deck.cards,piles.cards"
    # this ^ gets me a key of cards on each pile, deck & hand
    # BUT the cards key points at this object
    # {
    # type: "active_record/associations/collection_proxy",
    # active_record/associations/collection_proxy: [ ]
    # }
    # not serialized info about specific cards

    # , include: '**'
    # this ^ gives same result
    # I'm starting to think the issue isn't the serializer

    # ooo deleting the custom CardSerializer gets me 
    # this within the deck
    # cards: [
    #   {
    #     id: 1,
    #     value: null,
    #     whereIsCard_type: "Deck",
    #     whereIsCard_id: 1,
    #     created_at: "2018-12-07T22:15:03.092Z",
    #     updated_at: "2018-12-07T22:15:03.092Z"
    #   }
    # ]
    # & the piles and hand still have the collection_proxy nonsense

    # adding a card to a pile and the hand gets me normal card info!
    # I can work with this.
    # when there are cards in the pile, deck or hand I'll get info about them
    # and when they are empty I'll get the collection_proxy
  end

  def show
    render json: @game, include: '**'
    # render json: [@game, @game.deck]
    # this ^ does render the cards with @game.deck, 
    # BUT it looks funky 
    # cards: {
    #   type: "active_record/associations/collection_proxy",
    #   active_record/associations/collection_proxy: [
    #     {
    #     id: 1,
    #     value: null
    #     }
    #   ]
    # }
    # deleting the custom CardSerializer fixed the funky appearance
    # cards: [
    #   {
    #     id: 1,
    #     value: null,
    #     whereIsCard_type: "Deck",
    #     whereIsCard_id: 1,
    #     created_at: "2018-12-07T22:15:03.092Z",
    #     updated_at: "2018-12-07T22:15:03.092Z"
    #   }
    # ]
  end

  def create
    game = Game.new(game_params)
    if game.save
      render json: game
    else
      render json:{message: game.errors}, status: 400
    end
  end

  def update
    if @game.update(game_params)
      render json: @game
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
    params.require(:game).permit(:status, :playerName)
  end

  def set_game
    @game = Game.find_by(id: params[:id])
  end

end