// ==UserScript==
// @name         图斑监测助手
// @namespace    https://gongdear.com/
// @version      0.2.0
// @description  林草湿图斑监测判读小助手
// @author       GongDear
// @license      GPLv3.0
// @homepage     https://gongdear.com/
// @supportURL   https://github.com/gongdear/forest-resource-monitoring-helper
// @match        *://www.stgz.org.cn/yjjc*
// @require      https://cdn.jsdelivr.net/npm/jquery.min.js@3.5.1/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/geotiff@2.1.3/dist-browser/geotiff.min.js
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC/0lEQVRYhcWXXWjPURjHP1sbajN/yVu0G1LLlDUjYkZcoOzKzebGS3ZBSZIbCSXk5WKlaVKiEGHKS4nMorSN1FyI5mXI28W8rNjCdOp71um38/v9ji1869c5/+c853m+5/k/5znn8L+RZfwXXiqM0igHjgAfgVfAO+CN2vvAEw/vncD2iOwRUAL88K2zo7KDHI98InAOGAMUecabgVke+XKPrBhYq8V4kR0RDgHOynkcZsqwRRlwF5geo78LGBFKoBaYneDc4iIwWv25wJwE3QwwPoTAaqAmwLnBZGCx+p0punuAxyEE9gY6t/is9lOCThuwO8mIm4QmuZYFOO5UYl1xnBwAChTu4eqbdg3QE0qgMZDASeCC87sd2BIwL5XAzcA5XR7ZBqBS/S/AT6AF2P8nBB4Ck4DjwLyEOeM8siXAoohshbamKWR3gMvALWAHcNsquUnYCzwDhqaQ9u2WshjdKmCrE50K/dWGyPwoAQuz+o0qu3Ew9WKhxrKUiEkYqbEFWr0l0o9Ajqphrcrw8xijRue86oGJ3ErgQwKBjNpGOe+DJWAMrtMhc0wys7/vpRi9BgwD3gKHAyLQDzYJn5pDUeGpc5TiImCRB3SrXzIYAvY8roiMt6cQuKG/IDtl52TiBnxJ6OKESumvmPHraqcCoxLsfBsoAXOR2Abs84z1KgJ4IhdFXdxAGgELXz1vc7Zqecrco4MlkOeR2fBn2aISgzPA+79BwIa/yLmc+BAbfgPfndCHgojsO9Ckvm/1L3W8N6XUkmACp4AXwARgrG7INrOLVZBa9DWnVMUBEbiqz4f1oc58CMkBc0PepPdAi0p2/mCcuoiLQC6wFFilNtcZmwEc1N9SL2IhMAup1sHVh2gEpgGHgNdAg87xbu3jMn310jWRaNUXF5Vc2WiQTWN7imOv72nW65n8QM7MSr9GxvJ12TCOSyXrcqLSo+hVO4+cfvbM0yxKwBg5LcXWwNCWikiVJwqJ9ty3YdJq02BywFzRNjtRMQsbqL1/COA3USmm094DingAAAAASUVORK5CYII=
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    /**
     * 下载Base64到本地方法
     1. trident内核都不可以（IE，猎豹）
     2. chrome, opera 等使用blink内核 可以（但是chrome好像还是webkit内核）
     3. firefox（Gecko） 可以
     4. 三星可以（多余后缀）
     5. 小米自带的手机浏览器可以（但filename乱码）
     6. qq， uc（PC都可以）
     * */
    const downloadFile = (content, fileName) => {
        //下载base64图片
        const base64ToBlob = (code) => {
            let parts = code.split(';base64,');
            let contentType = parts[0].split(':')[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;
            let uInt8Array = new Uint8Array(rawLength);
            for(let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], {
                type: contentType
            });
        };
        let aLink = document.createElement('a');
        let blob = base64ToBlob(content); //new Blob([content]);
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        // aLink.click();
        aLink.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}));  //
    }

    // 监听键盘快捷键
    window.onkeydown = (event) => {

        if($('.zs-grid-tool').length === 0){
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
        // debug
        // console.log(event.keyCode);
        if( event.keyCode === 192 ) {
            const olViewport = $('.ol-viewport').get(0);
            const olCanvas = olViewport.children[0];
            const olCanvasContext = olCanvas.getContext("2d");
            const imgBase64 = olCanvas.toDataURL("image/tiff");
            const imgBlob=downloadFile(imgBase64, "test.tif");

            // const metadata = {
            //     GeographicTypeGeoKey: 4326,
            //     height: 3,
            //     ModelPixelScale: [0.031355, 0.031355, 0],
            //     ModelTiepoint: [0, 0, 0, 11.331755000000001, 46.268645, 0],
            //     width: 3
            // };
            // const arrayBuffer = writeArrayBuffer(values, metadata);
            console.log(imgBlob);
        }
    }
})();
