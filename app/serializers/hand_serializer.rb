class HandSerializer < ActiveModel::Serializer
  # serializer that Rails will use by default when asked to render Hand objects
  
  # the model's attributes that should be serialized
  attributes :id, :game_id, :cards

  # using the has_many association bc when sending up data about a game's hand 
  # we want all the cards in the hand so we can display them all 
  has_many :cards, polymorphic: true
end