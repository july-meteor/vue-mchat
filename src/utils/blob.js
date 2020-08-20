
function imageBase64ToBlob(urlData, type = 'image/jpeg') {
    try {
        var arr = urlData.split(',')
        var mime = arr[0].match(/:(.*?);/)[1] || type;
        // 去掉url的头，并转化为byte
        var bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        var ia = new Uint8Array(ab);

        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {
            type: mime
        });
    }
    catch (e) {
        var ab = new ArrayBuffer(0);
        return new Blob([ab], {
            type: type,
        });
    }
}