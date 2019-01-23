class Card < ApplicationRecord
  # Card belongs_to Pile, Hand OR Deck on a single association
  belongs_to :whereIsCard, polymorphic: true

  # Scoping allows you to specify commonly-used queries which 
  # can be referenced as method calls on the association objects or models.
  # combining these like <collection of cards>.mostRecentlyUpdated.one
  # will return an array with a single element (the most recently updated card)
  scope :mostRecentlyUpdated, -> { order(updated_at: :desc) }
  scope :one, -> { limit(1) }
end
