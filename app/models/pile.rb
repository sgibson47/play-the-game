class Pile < ApplicationRecord
  belongs_to :game
  has_many :cards, as: :whereIsCard
end
