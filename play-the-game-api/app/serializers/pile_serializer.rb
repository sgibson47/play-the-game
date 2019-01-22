class PileSerializer < ActiveModel::Serializer
  attributes :id, :asc, :game_id, :topMostCard

  def topMostCard
    object.cards.mostRecentlyUpdated.one[0]
  end
end