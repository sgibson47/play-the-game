class PileSerializer < ActiveModel::Serializer
  attributes :id, :asc, :game_id, :topMostCard

  # has_many :cards, polymorphic: true

  def topMostCard
    object.cards.mostRecentlyUpdated.one[0]
  end
end