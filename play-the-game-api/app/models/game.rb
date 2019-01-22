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
        # evaluate if card can be played on topCards[0]
        card.value < topCards[0].value ? array.push(false) : array.push(true)
      elsif topCards[0] == nil && topCards[1] != nil
        # evaluate if card can be played on topCards[1]
        card.value < topCards[1].value ? array.push(false) : array.push(true)
      else # if neither topCards are nil 
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
        # evaluate if card can be played on topCards[0]
        card.value > topCards[0].value ? array.push(false) : array.push(true)
      elsif topCards[0] == nil && topCards[1] != nil
        # evaluate if card can be played on topCards[1]
        card.value > topCards[1].value ? array.push(false) : array.push(true)
      else # if neither topCards are nil 
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
    if !self.playableOnAsc.include?(true) && !self.playableOnDesc.include?(true)
      false
    else 
      true
    end
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
      # win
      true 
    elsif self.validMoveAvailable
      # if there's a valid move, game's not over 
      false
    elsif !self.validMoveAvailable && self.canDealMoreCardsToHand
      # if you don't have a valid move in hand, but can get additional cards
      # game's not over
      false
    elsif !self.validMoveAvailable && !self.canDealMoreCardsToHand
      # if you don't have a valid move in hand and can't get additional cards
      # game's over
      true
    end
  end
end
