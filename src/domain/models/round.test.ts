import { describe, expect, test } from 'vitest'
import { Shoe } from './shoe'
import { Deck } from './deck'
import { Round } from './round'

describe('deal initial hands', () => {
  test('The dealer and all players are dealt a hand with two cards', () => {
    // Arrange
    const match = new Round(
      1,
      new Shoe(Deck.create().getCards()));

    // Act
    match.dealInitialHands();

    // Assert
    expect(match.getDealerHand().count()).toBe(2);
    expect(match.getPlayerHand().count()).toBe(2);
  })
})
