class HandSerializer < ActiveModel::Serializer
  attributes :id, :game_id

  has_many :cards, polymorphic: true
end