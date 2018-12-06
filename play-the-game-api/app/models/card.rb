class Card < ApplicationRecord
  belongs_to :whereIsCard, polymorphic: true
end
