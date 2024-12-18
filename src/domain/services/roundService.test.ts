import { describe, expect, test } from "vitest";
import { Hand } from "../models/hands/hand";
import { Card } from "../models/cards/card";
import { Rank } from "../models/ranks/rank";
import { Suit } from "../models/suits/suit";
import { RoundResult } from "../models/roundResults/roundResult";
import { RoundService } from "./roundService";

describe("calculate result", () => {
  test.each([
    // プレイヤー: バスト, ディーラー: バスト
    {
      playersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
        ],
        false,
      ),
      dealersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Seven, Suit.Spade),
          new Card(Rank.Seven, Suit.Spade),
        ],
        false,
      ),
      expected: RoundResult.Loss,
    },
    // プレイヤー: バスト, ディーラー: ブラックジャック
    {
      playersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
        ],
        false,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      expected: RoundResult.Loss,
    },
    // プレイヤー: バスト, ディーラー: ブラックジャック以外の 21 以下
    {
      playersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
        ],
        false,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Loss,
    },
    // プレイヤー: ブラックジャック, ディーラー: バスト
    {
      playersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      dealersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
        ],
        false,
      ),
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック, ディーラー: ブラックジャック以外の 21 以下
    {
      playersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック, ディーラー: ブラックジャック
    {
      playersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      expected: RoundResult.Push,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: バスト
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Seven, Suit.Spade),
          new Card(Rank.Seven, Suit.Spade),
        ],
        false,
      ),
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      expected: RoundResult.Loss,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) > (ディーラーのトータル)
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) = (ディーラーのトータル)
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Push,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) < (ディーラーのトータル)
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Loss,
    },
  ] as {
    playersHand: Hand;
    dealersHand: Hand;
    expected: RoundResult;
  }[])("The result of a round.", ({ playersHand, dealersHand, expected }) => {
    // Arrange
    const roundService = new RoundService();

    // Act
    const result = roundService.calculateResult(playersHand, dealersHand);

    // Assert
    expect(result).toBe(expected);
  });
});
