export const dataHtml = `<!--
  Attribute只能接收字符串，因此binddata只能传字符串类型，为了保证数据的类型不会在绑定过程中改变，建议使用Object包裹
-->
<div id="content">
  <div class="list scoped" scoped="1">
    <div class="list-item incontroll" binddata={JSON.stringify(dataObject1)}>落焦点-item-1</div>
    <div class="list-item incontroll" binddata={JSON.stringify(dataObject2)}>落焦点-item-2</div>
  </div>
  <div class="list2 scoped" scoped="2">
    <div
      v-for="item in dataList"
      :key="item.id"
      class="list-item incontroll"
      binddata={JSON.stringify(item)}>{{item.name}}</div>
  </div>
</div>
`;

export const dataJs = `import { ScopeController } from 'utils/scopeController';

const controllerCase = new ScopeController();
...
data() {
  return {
    dataObject1: {
      id: 1,
      age: 23,
    },
    dataObject2: {
      id: 2,
      sex: "male"
    },
    dataList: [{
      id: 4,
      name: "Jack"
    },{
      id: 5,
      name: "Tom"
    },{
      id: 6,
      name: "Michael"
    }]
  }
}

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
  // 默认回调绑定的方法
  onFocusUpCallback(cbData) {
    console.log('焦点上移', cbData.);
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