// マッチリザルトモーダルを表示するためのプレイヤー情報の型定義
export interface MatchResultPlayer {
  name: string;
  rounds: number[];
  finalCredit: number;
  balance: number;
}