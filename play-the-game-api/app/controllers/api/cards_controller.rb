class Api::CardsController < ApplicationController

  def update
    @card = Card.find_by(id: params[:id])
    if @card.update(card_params)
      render json: @card
    else
      render json:{message: @card.errors}, status: 400
    end
  end

  private

  def card_params
    params.require(:card).permit(:id, :whereIsCard_type, :whereIsCard_id)
  end

end