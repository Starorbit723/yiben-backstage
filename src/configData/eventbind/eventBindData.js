export const eventHtml = `<!--
  clickMe selfGoLeft selfGoRight selfGoUp selfGoDown 都是字符串，
  作为一个Key值，可以在selfDefinedCallBackFn中找到对应的方法
-->
<div id="content">
  <div class="list scoped" scoped="1">
    <div class="list-item incontroll" clickfocus="clickMe">落焦点-item-1</div>
    <div class="list-item incontroll" goleft="selfGoLeft" goright="selfGoRight">落焦点-item-2</div>
    <div class="list-item incontroll" goup="selfGoUp" godown="selfGoDown">落焦点-item-3</div>
  </div>
  <div class="list2 scoped" scoped="2">
    <div class="list2-item incontroll">落焦点-item-1</div>
    <div class="list2-item">非落焦点-item-2</div>
    <div class="list2-item">非落焦点-item-3</div>
    <div class="list2-item incontroll">落焦点-item-4</div>
  </div>
</div>
`;

export const eventJs = `import { ScopeController } from 'utils/scopeController';

const controllerCase = new ScopeController();

// Api: initController() 用于初始化，只需在DOM加载完成后调用一次即可
...
mounted() {
  controllerCase.initController({
    id: 'content',
    defaultPoint: { y: 1, x: 1 },
    callBackFn: {
      cbFocusUp: this.onFocusUpCallback,
      cbFocusDown: this.onFocusDownCallback,
      cbFocusLeft: this.onFocusLeftCallback,
      cbFocusRight: this.onFocusRightCallback,
      cbBackSpace: this.onBackSpaceClickCallback,
      cbFocusChange: this.onFocusChangeCallback,
    },
    selfDefinedCallBackFn: {
      clickMe: this.clickMeFn,
      selfGoLeft: this.selfGoLeftFn,
      selfGoRight: this.selfGoRightFn,
      selfGoUp: this.selfGoUpFn,
      selfGoDown: this.selfGoDownFn,
    },
  });
}
...

// 回调预留方法，开发者自定义，并传入初始化
...
method: {
  // 默认回调绑定的方法
  onFocusUpCallback(cbData) {
    console.log('焦点上移', cbData);
  },
  onFocusDownCallback(cbData) {
    console.log('焦点下移', cbData);
  },
  onFocusLeftCallback(cbData) {
    console.log('焦点左移', cbData);
  },
  onFocusRightCallback(cbData) {
    console.log('焦点右移', cbData);
  },
  onBackSpaceClickCallback(cbData) {
    console.log('按了后退/返回键', cbData);
  },
  onFocusChangeCallback(cbData) {
    console.log('焦点移动/改变', cbData);
  },
  // 自定义回调绑定的方法
  clickMeFn(cbData) {
    console.log('在这个Item点击了确认', cbData);
  },
  selfGoLeftFn(cbData) {
    console.log('在这个Item点击了左键', cbData);
  },
  selfGoRightFn(cbData) {
    console.log('在这个Item点击了右键', cbData);
  },
  selfGoUpFn(cbData) {
    console.log('在这个Item点击了上键', cbData);
  },
  selfGoDownFn(cbData) {
    console.log('在这个Item点击了下键', cbData);
  },
}
...

`;