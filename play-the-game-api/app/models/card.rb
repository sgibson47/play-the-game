class Card < ApplicationRecord
  belongs_to :pile
  belongs_to :hand
  belongs_to :deck
end
