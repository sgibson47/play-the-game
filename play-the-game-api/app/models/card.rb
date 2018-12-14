class Card < ApplicationRecord
  belongs_to :whereIsCard, polymorphic: true

  scope :mostRecentlyUpdated, -> { order(updated_at: :desc) }
  scope :one, -> { limit(1) }
end
