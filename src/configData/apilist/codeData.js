export const initControllerJs = `import { ScopeController } from 'utils/scopeController';

const controllerCase = new ScopeController();

// Api: initController() 用于初始化，只需在DOM加载完成后调用一次即可
...
mounted() {
  controllerCase.initController({
    id: 'content',
    defaultPoint: { y: 1, x: 1 },
    needScroll: true,
    scrollDirection: 'vertical', // horizontal vertical
    scrollBarConfig: {
      showScrollBar: true,
      trackWidth: '8px',
      trackBackground: 'rgba(255,255,255,0)',
      trackBorderRadius: '0',
      thumbColor: 'rgb(25, 170, 6)',
      thumbBorderWidth: '2px',
      thumbBorderColor: 'rgb(25, 170, 6)',
      thumbBorderRadius: '4px',
      thumbHoverColor: 'rgb(25, 170, 6)',
    },
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
    }
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

export const addNewControllerHtml = `<div id="App">

  <!-- 主内容图层 -->
  <div id="content">
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

  <!-- 对话弹框图层 -->
  <div id="dialog-content" v-show="showDialog">
    <div className='dialog-bg'></div>
    <div className='dialog-innerwrapper'>
        <div className='btn-zone scoped' scoped={1}>
          <div className='diabtn incontroll' clickfocus="onCloseDialog">返回</div>
          <div className='diabtn incontroll' clickfocus="onEnsureDialog">确认</div>
        </div>
    </div>
  </div>

</div>
`;

export const addNewControllerJs = `...
mounted() {
  controllerCase.addNewController({
    id: 'dialog-content',
    defaultPoint: { y: 1, x: 2 },
    needScroll: false,
    selfDefinedCallBackFn: {
      onCloseDialog: this.onCloseDialogFn,
      onEnsureDialog: this.onEnsureDialogFn,
    }
  });
  // 展示/隐藏还是要开发者自己控制的
  this.showDialog = true;
}
...
data() {
  return {
    showDialog: false
  }
}
...
// 回调预留方法，开发者自定义，并传入初始化
...
method: {
  // 自定义回调绑定的方法
  onEnsureDialogFn(cbData) {
    console.log('在对话框，点击了确认', cbData);
  },
  onCloseDialogFn(cbData) {
    console.log('在对话框，点击了关闭', cbData);
  }
}
...
`;

export const wakeUpHtml = `<div id="App">

  <!-- 主内容图层 -->
  <div id="content">
    <div class="list scoped" scoped="1">
      <div class="list-item incontroll">落焦点-item-1</div>
      <div class="list-item incontroll">落焦点-item-2</div>
    </div>
    <div class="list2 scoped" scoped="2">
      <div class="list2-item incontroll">落焦点-item-1</div>
      <div class="list2-item incontroll">落焦点-item-2</div>
      <div class="list2-item incontroll" clickfocus="openAside">落焦点-item-3</div>
      <div class="list2-item incontroll">落焦点-item-4</div>
    </div>
    <div class="list3 scoped" scoped="2.1">
      <div class="list3-item incontroll">落焦点-item-1</div>
      <div class="list3-item incontroll">落焦点-item-2</div>
      ...
      <div class="list3-item incontroll"">落焦点-item-12</div>
    </div>
  </div>

  <!-- 侧浮层图层 -->
  <div id="aside-content" v-show="showAside">
    <div className='aside-bg'></div>
    <div className='aside-innerwrapper'>
      <div class="list scoped" scoped="1">
        <div class="list-item incontroll">落焦点-item-1</div>
        <div class="list-item incontroll">落焦点-item-2</div>
      </div>
      <div class="list2 scoped" scoped="2">
        <div class="list-item incontroll">落焦点-item2-1</div>
        <div class="list-item incontroll" clickfocus="closeAside">落焦点-item2-2</div>
        <div class="list-item incontroll">落焦点-item2-3</div>
        <div class="list-item incontroll">落焦点-item2-4</div>
      </div>
    </div>
  </div>

</div>
`;

export const wakeUpJs = `...
mounted() {
  // 初始化
  controllerCase.initController({
    id: 'content',
    defaultPoint: { y: 1, x: 1 },
    needScroll: false,
    selfDefinedCallBackFn: {
      openAside: this.openAsideFn,
    }
  });

  // 添加新的图层
  controllerCase.addNewController({
    id: 'aside-content',
    defaultPoint: { y: 1, x: 1 },
    needScroll: false,
    selfDefinedCallBackFn: {
      closeAside: closeAsideFn,
    }
  });
  
}
...
data() {
  return {
    showAside: false
  }
}
...
// 回调预留方法，开发者自定义，并传入初始化
...
method: {
  // 点击打开侧浮层
  openAsideFn(cbData) {
    // 展示/隐藏还是要开发者自己控制的
    this.showAside = true;
    // 唤醒该图层
    controllerCase.wakeUp({
      id: 'aside-content',
      targetY: 2,
      targetX: 2
    });
  },
  // 点击关闭侧浮层
  closeAsideFn(cbData) {
    // 展示/隐藏还是要开发者自己控制的
    this.showAside = false;
    // 唤醒之前的页面主体图层
    controllerCase.wakeUp({
      id: 'content'
    });
  }
}
...
`;


export const gotoFocusHtml = `<div id="App">

  <!-- 主内容图层 -->
  <div id="content">
    <div class="list scoped" scoped="1">
      <div class="list-item incontroll">落焦点-item-1</div>
      <div class="list-item incontroll">落焦点-item-2</div>
    </div>
    <div class="list2 scoped" scoped="2">
      <div class="list2-item incontroll">落焦点-item-1</div>
      <div class="list2-item incontroll">落焦点-item-2</div>
      <div class="list2-item incontroll" clickfocus="handleChangeFocus">落焦点-item-3</div>
      <div class="list2-item incontroll">落焦点-item-4</div>
    </div>
    <div class="list3 scoped" scoped="3">
      <div class="list3-item incontroll">落焦点-item-1</div>
      <div class="list3-item incontroll">落焦点-item-2</div>
      ...
      <div class="list3-item incontroll">落焦点-item-7</div>
      <div class="list3-item incontroll">落焦点-item-8</div>
      ...
      <div class="list3-item incontroll"">落焦点-item-12</div>
    </div>
  </div>

</div>
`;

export const gotoFocusJs = `...
mounted() {
  // 初始化
  controllerCase.initController({
    id: 'content',
    defaultPoint: { y: 2, x: 3 },
    needScroll: false,
    selfDefinedCallBackFn: {
      handleChangeFocus: this.handleChangeFocusFn,
    }
  });
}
...
method: {
  // 当【落焦点-item-3】点击确认时，手动移动焦点到指定位置
  handleChangeFocusFn(cbData) {
    controllerCase.goToFocus({
      targetY: 3,
      targetX: 8,
    });
  }
}
...
`;

export const getLocationInfoHtml = `<div id="App">

  <!-- 主内容图层 -->
  <div id="content">
    <div class="list scoped" scoped="1">
      <div class="list-item incontroll">落焦点-item-1</div>
      <div class="list-item incontroll">落焦点-item-2</div>
    </div>
    <div class="list2 scoped" scoped="2">
      <div class="list2-item incontroll">落焦点-item-1</div>
      <div class="list2-item incontroll">落焦点-item-2</div>
      <div class="list2-item incontroll focus">落焦点-item-3</div>
      <div class="list2-item incontroll">落焦点-item-4</div>
    </div>
    <div class="list3 scoped" scoped="3">
      <div class="list3-item incontroll">落焦点-item-1</div>
      <div class="list3-item incontroll">落焦点-item-2</div>
      ...
      <div class="list3-item incontroll"">落焦点-item-12</div>
    </div>
  </div>

</div>
`;

export const getLocationInfoJs = `...
mounted() {
  // 初始化
  controllerCase.initController({
    id: 'content',
    defaultPoint: { y: 2, x: 3 },
    needScroll: false
  });
  this.getCurrentFocusInfo();
}
...
method: {
  // 手动查询当前坐标
  getCurrentFocusInfo() {
    console.log('当前焦点信息 ===>', controllerCase.getLocationInfo());
  }
}
...

/*
  控制台输出:  当前焦点信息 ===> { currentX: 3, currentY: 2, lastX: -1, lastY: -1 }
  由于没有上一个落焦点，所以上一个点坐标都是-1
*/ 

`;


export const setScopeSelectedItemHtml = `<div id="App">

  <!-- 主内容图层 -->
  <div id="content">
    <!-- Tab切换导航 -->
    <div class="tab-list scoped" scoped="1">
      <div class="list-item incontroll selected">Tab-item-1</div>
      <div class="list-item incontroll">Tab-item-2</div>
      <div class="list-item incontroll">Tab-item-3</div>
    </div>

    <div class="content-list scoped" scoped="2">
      <!-- Tab对应的内容 -->
      <ul>
        <li v-for="item in pageData[currentTab].dataList" class="list-item incontroll">{{item.name}}</li>
      </ul>
    </div>

  </div>

</div>
`;

export const setScopeSelectedItemJs = `...
data () {
  return {
    currentTab: 0,
    pageData: [
      {
        name: 'Tab-item-1',
        dataList: [
          { name:'content-item-1-1' },
          ...
        ]
      },{
        name: 'Tab-item-2',
        dataList: [
          { name:'content-item-2-1' },
          ...
        ]
      },{
        name: 'Tab-item-3',
        dataList: [
          { name:'content-item-3-1' },
          ...
        ]
      }
    ]
  }
},
mounted() {
  // 初始化
  controllerCase.initController({
    id: 'content',
    defaultPoint: { y: 1, x: 1 },
    needScroll: true,
    scrollDirection: 'vertical'
  });

  // 默认是第一个Tab被选中
  controllerCase.setScopeSelectedItem({
    id: 'content',
    targetY: 1,
    targetX: 1,
  });


  // 模拟一下：5秒后触发一次页面Tab切换
  setTimeout(() => {
    // 切换到第二个TAB，添加一个css: selected，同时移除之前元素的selected
    controllerCase.setScopeSelectedItem({
      id: 'content',
      targetY: 1,
      targetX: 2,
    });

    // 切换显示的内容数据, 更新DOM
    this.currentTab = 1;

    // DOM更新后，要调用update() 方法来通知更新controllerCase数据
    this.$nextTick(() => {

      controllerCase.update({
        id: 'content',
        needUpdateScoped: 2,
      });

      // 切换TAB后指定落焦到第三个Item
      controllerCase.goToFocus({
        targetY: 2,
        targetX: 3,
      });

    });
  }, 5000);
}

...

`;