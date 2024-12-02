import { describe, expect, test } from 'vitest'
import { Shoe } from './shoe'
import { Card } from './card'
import { Rank } from './rank'
import { Suit } from './suit'

describe('peek', () => {
  test("It returns a same card every time.", () => {
    // Arrange
    const shoe = new Shoe([
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
  test("It creates a new shoe without the first card.", () => {
    // Arrange
    const firstShoe = new Shoe([
      new Card(Rank.Ace, Suit.Diamond),
      new Card(Rank.Two, Suit.Club)
    ])

    // Act
    const secondShoe = firstShoe.draw()

    // Assert
    expect(firstShoe.peek().equals(secondShoe.peek())).toBe(false)
  })
})
