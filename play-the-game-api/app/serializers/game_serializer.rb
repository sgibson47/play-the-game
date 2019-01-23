class GameSerializer < ActiveModel::Serializer
  # serializer that Rails will use by default when asked to render Game objects
  
  # the model's attributes that should be serialized
  attributes :id, :status, :playerName, :moves

  # the model's associations that should be included when a game serialized
  has_many :piles, serializer: PileSerializer
  has_one :deck, serializer: DeckSerializer
  has_one :hand, serializer: HandSerializer
end