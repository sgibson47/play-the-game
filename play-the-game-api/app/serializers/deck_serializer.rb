class DeckSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :cardCount

  # has_many :cards, polymorphic: true

  def cardCount
    object.cards.length
  end
end