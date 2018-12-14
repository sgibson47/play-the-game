class PileSerializer < ActiveModel::Serializer
  attributes :id, :asc, :game_id, :topMostCard

  # has_many :cards, polymorphic: true

  def topMostCard
    object.cards.mostRecentlyUpdated.one[0]
    # nope, this didn't work
    # b/c scope methods work on the class Card, not on a collection of cards?

    # well it works in the console
    # it returns the collection of cards in order of most recently updated

    # lets go to rested & see what this is outputting
    # mmk, it's returning what we'd expect
    # BUT the topMostCard object is now the sole element in an array

    # we have what we want, let's just rework
    # the front end to expect an array instead of an object
    # OR 
    # could we access the first element of the array here
    # and just serialize an object?

    # groovy with [0] we send out jsut the object 

  end
end