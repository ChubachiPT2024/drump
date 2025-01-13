// ラウンドリザルトモーダルを表示するためのプレイヤー情報の型定義
export interface RoundResultPlayer {
  name: string;
  result: "win" | "loss" | "push";
  credit: number;
}
