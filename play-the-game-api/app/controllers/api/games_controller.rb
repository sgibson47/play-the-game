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