<template>
    <div class="dialog" ref="layer">
        <div class="dialog_head"    style="cursor: move;" @mousedown="handPageDrag">
            <span class="dialog_title">
                在线调试
            </span>
            <button type="button" aria-label="Close" class="dialog_headerbtn">
                <i class="m-icon-close"></i>
            </button>
        </div>
        <div class="dialog_body dialog_content">
            <div class="runtest">
                              <textarea class="site-demo-text">layer.open({
                              title: '在线调试'
                              ,content: '可以填写任意的layer代码'
                            });
                              </textarea>
            </div>
        </div>
        <div class="dialog_foote ">
            <span class="dialog-footer">
                <button  class="m-button m-button-primary">
                    <span>取 消</span>
                </button>
                <button  class="m-button m-button-primary">
                    <span>确 定</span>
                </button>
            </span>
        </div>
    </div>

</template>

<script>
    export default {
        name: "m-dialog",
        data() {
            return {}
        },
        methods:{
            handPageDrag(e) {
                let el = this.$refs.layer;
                var oDiv = el;
                var disX = e.clientX - oDiv.offsetLeft;
                var disY = e.clientY - oDiv.offsetTop;
                document.onmousemove = function(e) {
                    e.preventDefault();
                    var l = e.clientX - disX;
                    var t = e.clientY - disY;
                    oDiv.style.left = l + "px";
                    oDiv.style.top = t + "px";
                };
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },

        }
    }
</script>

