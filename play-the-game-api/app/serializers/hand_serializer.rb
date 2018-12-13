class HandSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :cards

  has_many :cards, polymorphic: true

  def cards
    object.cards
  end
end