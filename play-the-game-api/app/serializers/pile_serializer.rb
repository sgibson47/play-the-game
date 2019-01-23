class PileSerializer < ActiveModel::Serializer
  # serializer that Rails will use by default when asked to render Pile objects
  
  # the model's attributes that should be serialized
  attributes :id, :asc, :game_id, :topMostCard

  # custom method to return the Pile's top most (most recently updated card)
  # when displaying a pile during game play I only need the topMost card
  def topMostCard
    object.cards.mostRecentlyUpdated.one[0]
  end
end