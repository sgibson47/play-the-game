class Card < ApplicationRecord
  belongs_to :whereIsCard, polymorphic: true

  scope :mostRecetlyUpdated, -> { order(updated_at: :desc) }
  scope :one, -> { limit(1) }
end
