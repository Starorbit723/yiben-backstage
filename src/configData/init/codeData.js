export const initHtml = `<div id="content">
  <div class="list scoped" scoped="1">
    <div class="list-item incontroll">落焦点-item-1</div>
    <div class="list-item incontroll">落焦点-item-2</div>
    <div class="list-item incontroll">落焦点-item-3</div>
  </div>
  <div class="list2 scoped" scoped="2">
    <div class="list2-item incontroll">落焦点-item-1</div>
    <div class="list2-item">非落焦点-item-2</div>
    <div class="list2-item">非落焦点-item-3</div>
    <div class="list2-item incontroll">落焦点-item-4</div>
  </div>
  <div class="list3 scoped" scoped="2.1">
    <div class="list3-item incontroll">落焦点-item-1</div>
    <div class="list3-item incontroll">落焦点-item-2</div>
    <div class="list3-item">非落焦点-item-3</div>
  </div>
</div>
`;

export const initJs = `import { ScopeController } from 'utils/scopeController';

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
    }
  });
}
...

// 回调预留方法，开发者自定义，并传入初始化
...
method: {
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
}
...

`;