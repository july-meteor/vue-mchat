<template>
    <div class="dialog">
        <div class="dialog_head ">
            <span class="dialog_title">
                在线调试
            </span>
                <button type="button" aria-label="Close" class="dialog_headerbtn">
                    <svg-icon  iconClass="close"></svg-icon>
                </button>


        </div>
        <div class="dialog_body dialog_content">

         111   <svg-icon  icon-class="close"></svg-icon>111
            <div class="runtest">
                              <textarea class="site-demo-text">layer.open({
                              title: '在线调试'
                              ,content: '可以填写任意的layer代码'
                            });
                              </textarea>
                <a href="javascript:;">立即运行</a>
            </div>
        </div>
        <span class="layui-layer-setwin"><a class="layui-layer-ico layui-layer-close layui-layer-close1"
                                            href="javascript:;"></a></span></div>
</template>

<script>
    export default {
        name: "m-dialog",
        data() {
            return {}
        }
    }
</script>

