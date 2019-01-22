class Game < ApplicationRecord
  has_many :piles
  has_one :deck
  has_one :hand

  def playedAtLeastTwo
    self.moves <2 ? false : true
  end

  def topMostCardsAsc
    cards = []
    self.piles.each do |pile|
      if pile.asc == true
        cards << pile.cards.mostRecentlyUpdated.one[0]
      end
    end
    cards
  end

  def topMostCardsDesc
    cards = []
    self.piles.each do |pile|
      if pile.asc != true
        cards << pile.cards.mostRecentlyUpdated.one[0]
      end
    end
    cards
  end

  def playableOnAsc
    topCards = self.topMostCardsAsc
    array = []
    self.hand.cards.each do |card|
      if topCards[0] == nil || topCards[1] == nil
        array.push(true)
      elsif topCards[0] != nil && topCards[1] == nil 
        card.value < topCards[0].value ? array.push(false) : array.push(true)
      elsif topCards[0] == nil && topCards[1] != nil
        card.value < topCards[1].value ? array.push(false) : array.push(true)
      else 
        if card.value < topCards[0].value && card.value < topCards[1].value
          array.push(false)
        else
          array.push(true)
        end
      end
    end
    array
  end

  def playableOnDesc
    topCards = self.topMostCardsDesc
    array = []
    self.hand.cards.each do |card|
      if topCards[0] == nil || topCards[1] == nil
        array.push(true)
      elsif topCards[0] != nil && topCards[1] == nil 
        card.value > topCards[0].value ? array.push(false) : array.push(true)
      elsif topCards[0] == nil && topCards[1] != nil
        card.value > topCards[1].value ? array.push(false) : array.push(true)
      else 
        if card.value > topCards[0].value && card.value > topCards[1].value
          array.push(false)
        else
          array.push(true)
        end
      end
    end
    array
  end

  def validMoveAvailable
    !self.playableOnAsc.include?(true) && !self.playableOnDesc.include?(true) ? false : true
  end

  def canDealMoreCardsToHand
    if self.deck.cards.length < 1
      false
    else
      if self.playedAtLeastTwo
        true
      else
        false
      end
    end
  end 

  def over
    if self.deck.cards.length == 0 && self.hand.cards.length == 0
      true 
    elsif self.validMoveAvailable
      false
    elsif !self.validMoveAvailable && self.canDealMoreCardsToHand
      false
    elsif !self.validMoveAvailable && !self.canDealMoreCardsToHand
      true
    end
  end
end
