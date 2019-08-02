import { Directive, Input, Output, EventEmitter, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputText]'
})
export class InputTextDirective implements OnInit {

  /** 親コンポーネントから受け取るデータ appInputTextセレクタ */
  @Input('appInputText') text: string
  /** 親コンポーネントへデータを渡すためのハンドラ Input名 + Changeで双方向バインディングになる */
  @Output('appInputTextChange') textChange = new EventEmitter<string>()
  /** 親エレメント */
  parent: HTMLElement

  constructor(
    private el: ElementRef
  ) { }

  /**
   * 初期処理
   *
   * @memberof InputTextDirective
   */
  ngOnInit() {
    this.parent = this.el.nativeElement
    // コンポーネントからは直接値をセットしないため初期処理で親エレメントtextをセット
    this.parent.textContent = this.text
  }

  /**
   * ダブルクリックイベント
   *
   * @memberof InputTextDirective
   */
  @HostListener('dblclick') onDoubleclick() {
    // すでに子要素がある場合は何もしない
    if(this.parent.children.length != 0) return
    // input element作成
    let inputEl = document.createElement('input')
    // input type指定
    inputEl.type = 'text'
    // 値代入
    inputEl.value = this.parent.textContent
    // 幅調整
    const width = this.parent.offsetWidth - 8
    inputEl.style.width = width + 'px'
    // changeイベント検知追加
    inputEl.addEventListener('change', (e: Event) => {
      // 親要素へのイベント伝播を停止
      e.stopPropagation()
    })
    // blur(フォーカスアウト)イベント検知追加
    inputEl.addEventListener('blur', () => {
      // 追加したinput elementを削除
      this.parent.removeChild(inputEl)
      // 親コンポーネントにデータを渡す
      this.textChange.emit(inputEl.value)
      // 親エレメントtextをセット（これやりたくないけど、データバインディングのみだとDOMが更新されない…）
      this.parent.textContent = inputEl.value
    })
    // 親エレメントのテキスト削除
    this.parent.textContent = ''
    // 親エレメントの子にinput elementを追加
    this.parent.appendChild(inputEl)
    // 追加したinput elementにフォーカス
    inputEl.focus()
  }
}
