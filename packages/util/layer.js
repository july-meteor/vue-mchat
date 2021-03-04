/**
 *  图层拖拽工具类
 */
export function layerDrag(e, el, moveOut = false) {
    let X = e.clientX - el.offsetLeft;
    let Y = e.clientY - el.offsetTop;
    let fixed = false;
    document.onmousemove = function (e) {
        e.preventDefault();
        let l = e.clientX - X;
        let t = e.clientY - Y;
        if (!moveOut) {
            let win = document.body;
            //控制元素不被拖出窗口外
            let stX = fixed ? 0 : win.scrollLeft,
                stY = fixed ? 0 : win.scrollTop;
            let setRig = win.clientWidth - el.clientWidth + stX
                , setBot = win.clientHeight - el.clientHeight + stY;
            l < stX && (l = stX);
            l > setRig && (l = setRig);
            t < stY && (t = stY);
            t > setBot && (t = setBot);
        }
        el.style.left = `${l}px`;
        el.style.top = `${t}px`;
    };
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}


export function layerCenter(el) {
    let win = document.body;
    el.style.left = (win.clientWidth - 10 - el.clientWidth) / 2 + "px";
    el.style.top = (win.clientHeight - 70 - el.clientHeight) / 2 + "px";
}

/**
 *  left bottom
 */
export function layerTipLB(el) {
    let win = document.body;
    el.style.left = (win.clientWidth - 10 - el.clientWidth) + "px";
    el.style.top = win.clientHeight - 70 + "px";
}

export function layerTipLT(el) {
    let win = document.body;
    el.style.left = (win.clientWidth - 10 - el.clientWidth) + "px";
    el.style.top = 0 + "px";
}

export function layerTipRB(el) {
    let win = document.body;
    el.style.left = 0 + "px";
    el.style.top = win.clientHeight - 70 + "px";
}

export function layerPosition(el, position) {
    switch (position) {
        case "center":
            layerCenter(el);
            break
        case  "lt":
            layerTipLT(el);
            break;
        case "rb":
            layerTipRB(el)
            break;
        default:
            break;
    }

}