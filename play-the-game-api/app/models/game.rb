class Game < ApplicationRecord
  has_many :piles
  has_one :deck
  has_one :hand

  # instance methods that build the ability to tell if a game is over 

  def playedAtLeastTwo
    self.moves <2 ? false : true
  end

  def topMostCardsAsc
    # iterate over this game's piles
    # return a collection of the top most cards on the ascending piles
    cards = []
    self.piles.each do |pile|
      if pile.asc == true
        cards << pile.cards.mostRecentlyUpdated.one[0]
      end
    end
    cards
  end

  def topMostCardsDesc
    # iterate over this game's piles
    # return a collection of the top most cards on the descending piles
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
    # iterate over the cards in this game's hand
    self.hand.cards.each do |card|
      # if either top card is nil, i.e. no card has been played on the pile
      if topCards[0] == nil || topCards[1] == nil
        # add true to the array 
        # representing that the card could be played on an ascending pile
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
    # check if the cards in the game's hand can be played on any of the piles
    # if they can't be played on any pile (all falses in the collections returned by playableOnAsc & playableOnDesc)
    # there's no valid move (return false)
    # if there's a true in either collection returned by playableOnAsc & playableOnDesc
    # there's a valid move available (return true)
    !self.playableOnAsc.include?(true) && !self.playableOnDesc.include?(true) ? false : true
  end

  def canDealMoreCardsToHand
    # check if there are cards in the deck
    if self.deck.cards.length < 1
      # if there aren't cards in the deck, there are none to deal
      false
    # if there are cards in the deck  
    else
      # check to see how many cards have been played this turn
      # if player has played at least 2 cards this turn, they can have more cards
      self.playedAtLeastTwo ? true : false
    end
  end 

  def over
    # check if won
    if self.deck.cards.length == 0 && self.hand.cards.length == 0
      # if the game has been won it's over
      true 
    # check if there's a valid move available
    elsif self.validMoveAvailable
      # if there's a valid move available, game's not over
      false
    # check if there isn't a valid move and the player can get more cards to play?
    elsif !self.validMoveAvailable && self.canDealMoreCardsToHand
      # if the player can get more cards, the game's not over
      false
    # check if there isn't a valid move and the player can not get more cards to play?
    elsif !self.validMoveAvailable && !self.canDealMoreCardsToHand
      # if there's no valifd move and the player can not get more cards, the game's over
      true
    end
  end
end
