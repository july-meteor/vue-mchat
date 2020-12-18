<template>
    <div id="app" class="wrapper">
        <span @click="show =!show">取 消</span>
        <m-dialog
                title="提示"
                :visible.sync="show"
        >
            <span>
                <div class="runtest">
                              <textarea class="site-demo-text">layer.open({
                              title: '在线调试'
                              ,content: '可以填写任意的layer代码'
                            });
                              </textarea>
                        </div>
            </span>

            <span slot="footer" class="dialog-footer">
            <button class="m-button m-button-primary">
                        <span @click="show =!show">取 消</span>

            </button>
            <button class="m-button m-button-primary">
                <span>确 定</span>
            </button>
  </span>
        </m-dialog>

    </div>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                show: false
            }
        }
    }
</script>

<style lang="scss">

    .runtest {
        position: relative;
    textarea {
        display: block;
        width: 300px;
        height: 160px;
        border: 10px solid #fff;
        border-top-width: 0;
        padding: 10px;
        line-height: 20px;
        overflow: auto;
        background-color: #3F3F3F;
        color: #eee;
        font-size: 12px;
    }

    }
</style>