import { describe, expect, test } from "vitest";
import { Card } from "../models/cards/card";
import { Rank } from "../models/ranks/rank";
import { Suit } from "../models/suits/suit";
import { RoundResult } from "../models/roundResults/roundResult";
import { RoundService } from "./roundService";
import { RoundPlayer } from "../models/roundPlayers/roundPlayer";
import { Dealer } from "../models/dealers/dealer";
import { DealerId } from "../models/dealers/dealerId";

describe("calculate result", () => {
  test.each([
    // プレイヤー: バスト, ディーラー: バスト
    {
      playersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Seven, Suit.Spade),
        new Card(Rank.Seven, Suit.Spade),
      ],
      expected: RoundResult.Loss,
    },
    // プレイヤー: バスト, ディーラー: ブラックジャック
    {
      playersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      expected: RoundResult.Loss,
    },
    // プレイヤー: バスト, ディーラー: ブラックジャック以外の 21 以下
    {
      playersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      expected: RoundResult.Loss,
    },
    // プレイヤー: ブラックジャック, ディーラー: バスト
    {
      playersCards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック, ディーラー: ブラックジャック以外の 21 以下
    {
      playersCards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック, ディーラー: ブラックジャック
    {
      playersCards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      expected: RoundResult.Push,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: バスト
    {
      playersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Seven, Suit.Spade),
        new Card(Rank.Seven, Suit.Spade),
      ],
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック
    {
      playersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      expected: RoundResult.Loss,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) > (ディーラーのトータル)
    {
      playersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Nine, Suit.Spade),
      ],
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) = (ディーラーのトータル)
    {
      playersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Nine, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Nine, Suit.Spade),
      ],
      expected: RoundResult.Push,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) < (ディーラーのトータル)
    {
      playersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Nine, Suit.Spade),
      ],
      dealersCards: [
        new Card(Rank.Ten, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      expected: RoundResult.Loss,
    },
  ] as {
    playersCards: Card[];
    dealersCards: Card[];
    expected: RoundResult;
  }[])("The result of a round.", ({ playersCards, dealersCards, expected }) => {
    // Arrange
    const roundService = new RoundService();
    const roundPlayer = RoundPlayer.create();
    for (const playersCard of playersCards) {
      roundPlayer.addCardToHand(playersCard);
    }
    const dealer = Dealer.create(new DealerId("dealerId"));
    for (const dealearsCard of dealersCards) {
      dealer.addCardToHand(dealearsCard);
    }

    // Act
    const result = roundService.calculateResult(
      roundPlayer.getHand(),
      dealer.getHand(),
    );

    // Assert
    expect(result).toBe(expected);
  });
});
