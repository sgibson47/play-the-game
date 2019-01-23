class DeckSerializer < ActiveModel::Serializer
  # serializer that Rails will use by default when asked to render Deck objects
  
  # the model's attributes that should be serialized
  attributes :id, :game_id, :cardCount

  # custom method to return the number of cards in the Deck
  # when displaying the deck during game play 
  # I only need to know how many cards are left in it
  def cardCount
    object.cards.length
  end
end