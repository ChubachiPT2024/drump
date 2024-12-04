import { describe, expect, test } from 'vitest'
import { Shoe } from './shoe'
import { Card } from '../card/card'
import { Rank } from '../rank/rank'
import { Suit } from '../suit/suit'

describe('peek', () => {
  test("It returns a same card every time.", () => {
    // Arrange
    const shoe = new Shoe(
      1,
      [
        new Card(Rank.Ace, Suit.Diamond),
        new Card(Rank.Two, Suit.Club)
      ])

    // Act
    const first = shoe.peek()
    const second = shoe.peek()

    // Assert
    expect(first.equals(second)).toBe(true)
  })
})

describe('draw', () => {
  test("It changes the next card.", () => {
    // Arrange
    const shoe = new Shoe(
      1,
      [
        new Card(Rank.Ace, Suit.Diamond),
        new Card(Rank.Two, Suit.Club)
      ])
    const firstPeek = shoe.peek()

    // Act
    shoe.draw()

    // Assert
    expect(firstPeek.equals(shoe.peek())).toBe(false)
  })
})
