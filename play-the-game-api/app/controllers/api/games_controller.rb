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
      render json: game, include: '**'
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
    if @game.update(game_params)
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
    params.require(:game).permit(:status, :playerName, 
      piles_attributes:[
        :id,
        :asc,
        :game_id,
        cards_attributes: [
          :id,
          :value,
          :whereIsCard_type,
          :whereIsCard_id
        ]
      ],
      deck_attribues:[
        :id,
        :game_id
      ],
      hand_attribues:[
        :id,
        :game_id
      ]
    )
  end

  def set_game
    @game = Game.find_by(id: params[:id])
  end

end