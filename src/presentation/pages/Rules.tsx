export const RulesPage = () => {
  return (
    <div className="relative WhiteDot p-6 min-h-screen overflow-hidden">
      <div className="bg-white w-4/5 content-center mx-auto p-6 rounded-lg shadow-lg text-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-center">
          ブラックジャックの遊び方
        </h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            ブラックジャックの基本ルール
          </h2>
          <ul className="list-disc pl-5">
            <li>エースは「1」か「11」のどちらか好きな方で数えます</li>
            <li>ジャック、クイーン、キングはすべて「10」として数えます</li>
            <li>2から10はそのまま数えます</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">ゲームの始め方</h3>
          <p>プレイヤーがチップを賭けるとゲームが始まります</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">カードの配り方</h3>
          <ul className="list-disc pl-5">
            <li>プレイヤーには2枚の表向きカードが配られます</li>
            <li>
              ディーラーには1枚が表向き、もう1枚が裏向きのカードが配られます
            </li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">プレイヤーの行動</h3>
          <ul className="list-disc pl-5">
            <li>
              <strong>スタンド</strong>:
              これ以上カードを引かず、今の手札で勝負します
            </li>
            <li>
              <strong>ヒット</strong>: カードを1枚引きます
            </li>
            <li>
              <span>本ゲームでは、ダブルとスプリットはできません。</span>
            </li>
            {/* <li>
              <s>ダブル</s>:
              賭け金を2倍にして、カードをもう1枚だけ引きます（本ゲームではサポートされていません）
            </li>
            <li>
              <s>スプリット</s>:
              同じ数字のカードが2枚あるとき、それを2つの手として分けて遊びます（本ゲームではサポートされていません）
            </li> */}
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">ディーラーの動き</h3>
          <p>
            プレイヤーの番が終わると、ディーラーが裏向きのカードを表にします。ディーラーはカードの合計が17になるまでカードを引きます。
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">勝ち負けの決め方</h3>
          <ul className="list-disc pl-5">
            <li>
              21を超えずに、ディーラーより合計が多ければ、プレイヤーの勝ちです！
            </li>
            <li>
              ディーラーが21を超えた（バスト）場合もプレイヤーの勝ちです！
            </li>
            <li>
              ただし、ディーラーとプレイヤーの両方が21を超えた（バスト）場合はプレイヤーの負けです
            </li>
            <li>
              プレイヤーがブラックジャックの場合はプレイヤーの勝ちとなります。ただし、ディーラーもブラックジャックだった場合は引き分けとなります
            </li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">チップの獲得</h3>
          <ul className="list-disc pl-5">
            <li>
              プレイヤーが勝った場合、ベットしたチップ額と同じだけチップを獲得します
            </li>
            <li>プレイヤーが負けた場合、ベットしたチップは没収されます</li>
            <li>
              プレイヤーがブラックジャックで勝った場合、ベットしたチップ額の1.5倍のチップを獲得します
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">ディーラーとの勝負</h2>
          <p>
            ゲームの目的はできるだけ21に近づけることではなく、ディーラーに勝ちチップを獲得することです。（他のプレイヤーではなく、ディーラーと勝負します。）
          </p>
          <p>プレイヤーの手持ちチップは50,000チップから始まります。</p>
          <p>
            プレイヤーはディーラーと10回勝負し、より多くのチップを獲得することを目指します。
          </p>
          <p>
            最後に持っていたチップが最初に持っていたチップの量より多ければプレイヤーの勝ちです！
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">プレイヤーとの対戦</h2>
          <p>
            ゲームの目的はできるだけ21に近づけることではなく、他のプレイヤーより多くのチップを獲得することです。（ディーラーではなく他のプレイヤーとチップの獲得数を競います。）
          </p>
          <p>各プレイヤーの手持ちチップは50,000チップから始まります。</p>
          <p>
            各プレイヤーはディーラーと10回勝負し、より多くのチップを獲得することを目指します。
          </p>
          <p>
            10回勝負が終了した時点で最も多くのチップを獲得したプレイヤーの勝ちです！
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">用語説明</h2>
          <ul className="list-disc pl-5">
            <li>
              <strong>ブラックジャック</strong>
              ：最初の2枚のカードの合計が「21」になること。ブラックジャックで勝った場合はベットしたチップの1.5倍のチップを獲得します。(ベットしたチップと合わせて2.5倍のチップを獲得します。)
            </li>
            <li>
              <strong>バスト</strong>
              ：手札の合計が「21」を超えてしまうこと。バストになると即座に負けになります
            </li>
            <li>
              <strong>ヒット</strong>
              ：追加でカードを1枚引くこと。合計が21を超えない限り、何度でも引くことができます
            </li>
            <li>
              <strong>スタンド</strong>
              ：これ以上カードを引かずに現在の手札で勝負すること
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
