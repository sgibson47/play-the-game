class GameSerializer < ActiveModel::Serializer
  attributes :id, :status, :playerName, :moves

  has_many :piles, serializer: PileSerializer
  has_one :deck, serializer: DeckSerializer
  has_one :hand, serializer: HandSerializer
end