class Game < ApplicationRecord
  has_many :piles
  has_one :deck
  has_one :hand
end
