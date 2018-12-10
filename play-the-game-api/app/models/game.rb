class Game < ApplicationRecord
  has_many :piles
  has_one :deck
  has_one :hand
  has_many :cards, :through => :piles
  has_many :cards, :through => :deck
  has_many :cards, :through => :hand

  accepts_nested_attributes_for :piles
  accepts_nested_attributes_for :deck
  accepts_nested_attributes_for :hand
  accepts_nested_attributes_for :cards
end
