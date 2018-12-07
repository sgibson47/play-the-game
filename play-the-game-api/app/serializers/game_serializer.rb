class GameSerializer < ActiveModel::Serializer
  attributes :id, :status, :playerName

  has_many :piles, serializer: PileSerializer
  has_one :deck, serializer: DeckSerializer
  has_one :hand, serializer: HandSerializer
end