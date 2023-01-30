// 判断是否开启了网格工具
const fishnetToolIsActive = () => {
    const fishnet = $('#fishnet_tool')[0];
    if (!fishnet) {
        return false;
    }
    const fishnetStyleMap = fishnet.attributeStyleMap;
    if (fishnetStyleMap.size === 0) {
        return false;
    }
    return fishnetStyleMap.get('display').value !== 'none';

};
// 监听鼠标事件
window.onmousemove = () => {
    if(fishnetToolIsActive()){
        chrome.runtime.sendMessage({greet:'active'});
    }else {
        chrome.runtime.sendMessage({greet:'disable'});
    }
};
// 监听键盘快捷键
window.onkeydown = (event) => {
    if(!fishnetToolIsActive()){
        console.log('没有开启网格工具!');
    } else {
        // Ctrl
        if(event.ctrlKey) {
            // Ctrl + S 点击标记完成
            if ( event.keyCode === 83 ) {
                $('.wwch').click();
                console.log('标记成功!');
                return false;
            }
            // Ctrl + Shift + S 标记未完成-撤销标记完成
            if ( event.shiftKey && event.keyCode === 83 ) {
                $('.ywch').click();
                console.log('标记成功!');
                return false;
            }
            // Ctrl + A 点击全格
            if ( event.keyCode === 65 ) {
                $('.qt-grid-span').click();
                console.log('全格成功!');
                // 阻止事件冒泡
                return false;
            }
            // Ctrl + D 点击单格
            if ( event.keyCode === 68 ) {
                $('.fd-grid-span').click();
                console.log('单格成功!');
                // 阻止事件冒泡
                return false;
            }
            // Ctrl + Z 回退
            if ( event.keyCode === 90 ) {
                $('.tool-ht').click();
                console.log('回退成功!');
                // 阻止事件冒泡
                return false;
            }
        }
         // Alt
        if(event.altKey) {
            // Alt + S 撤销标记
            if ( event.keyCode === 83 ) {
                $('.ywch').click();
                console.log('标记成功!');
                // 阻止事件冒泡
                return false;
            }
        }
    }
};

