class PileSerializer < ActiveModel::Serializer
  attributes :id, :asc, :game_id

  has_many :cards, polymorphic: true
end