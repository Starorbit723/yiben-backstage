export const scrollHtml = `<div id="content">
  <div class="map-incontroll-scroll">
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
  </div>
</div>
`;

export const scrollJs = `import { ScopeController } from 'utils/scopeController';

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
  });
}
...

`;

export const scrollzoneHtml = `<div id="content">
  <div class="map-incontroll-scroll">
    <div class="list scoped scrollzone" scoped="1">
      <div class="scoped-incontroll-scroll">
        <div class="list-item incontroll">滚动区落焦点-item-1</div>
        <div class="list-item incontroll">滚动区落焦点-item-2</div>
        <div class="list-item incontroll">滚动区落焦点-item-3</div>
      </div>
    </div>
    <div class="list2 scoped" scoped="2">
      <div class="list2-item incontroll">落焦点-item-1</div>
      <div class="list2-item">非落焦点-item-2</div>
      <div class="list2-item">非落焦点-item-3</div>
      <div class="list2-item incontroll">落焦点-item-4</div>
    </div>
  </div>
</div>
`;

export const scrollzoneCss = `.scrollzone::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.scrollzone::-webkit-scrollbar-track {
  background: none;
  border-radius: 0;
}
.scrollzone::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0);
  border-radius: 4px;
  border-width: 0;
  border-color: none;
  border-style: solid;
}
.scrollzone::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0);
}
`;