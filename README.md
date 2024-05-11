# practice_css_modules
CSS Modulesのキャッチアップリポジトリ

## CSS Modulesのメリット
- 立ち上げ時、必要なライブラリがsassだけのため楽にスタートできる
	- が、スタイルは自分たちで考えていく必要あり
	- これはCSS in JSでも一緒
	- 社内用システムの管理画面や自分好みのシステムを作るときはTailwindの方が早いかも
	- 共通値も簡単に管理できる
		- 参考: https://zenn.dev/catnose99/scraps/5e3d51d75113d3

- 運用上のメリット
	- スタイルの名前衝突を回避できる
	- クラス名が一意になるため、再利用性が高くなる
	- スタイルの変更に強い

- 運用上のデメリット
	- JSで書けず、動的なスタイル変更に弱い
	- バリエーションを持つコンポーネントは(好みだと思うが)styled-componentsの方が書きやすい
		- styled-componentsであればpropsや継承で簡単に書ける
		- CSS Modulesは共通レイアウトをextendsで、バリエーションごとのレイアウトは個別にクラスを作る

## Css in JSとの比較
- Css in JS
	- (Css Modulesと比較した)メリット
		- JSで書けるため動的なスタイルが書きやすい
			- propsでスタイルを調整したり、継承が書きやすい
	- (Css Modulesと比較した)デメリット
		- パフォーマンスを損ね得る
		- SSR非対応
		- stateによる再レンダリング
			- これはemotion

## CSS Modulesが適していそうな開発
- CSS周りの課題に対するアプローチはCSS ModulesでもCSS in JSでも大差なさそう
	- クラス名のグローバルスコープ化
- コーダが専属でいるチームではCSSをコンポーネントと分けて書けるので良さそう
