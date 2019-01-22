class DeckSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :cardCount

  def cardCount
    object.cards.length
  end
end