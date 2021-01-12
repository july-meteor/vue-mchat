<template>
    <div>
        <m-dialog
                :title="title"
                :shrink="true"
                :visible.sync="show"
        >
            <div class="apply-friend-box">
                <div class="apply-img">
                    <img class="layui-circle"
                         src="https://tva1.sinaimg.cn/crop.0.0.720.720.180/005JKVuPjw8ers4osyzhaj30k00k075e.jpg">
                    <p>麻花疼</p>
                </div>
                <div class="apply-remark">
                    <span>请输入验证信息:</span>
                    <textarea></textarea>
                </div>
            </div>
            <span slot="footer">
                <button class="m-button">
                  发送申请
                </button>
                <button class="m-button">
                  取消
                </button>
            </span>
        </m-dialog>
    </div>


</template>

<script>
    const default_apply = {}
    export default {
        name: "massage-box",
        data() {
            return {
                show: true,
                remark: "",
            }
        },
        computed: {
            title() {
                let title = "添加好友"
                return title;
            }
        },
        methods: {
            test() {
            }
        },
        mounted() {


        }
    }
</script>

<style lang="scss">
    .apply-friend-box {
        margin: 15px;
        font-size: 0;

        .apply-img {
            display: inline-block;
            *display: inline;
            *zoom: 1;
            vertical-align: top;
            font-size: 14px;
            width: 100px;
            margin-right: 20px;
            text-align: center;
            img {
                width: 100px;
                height: 100px;
                margin-bottom: 10px;
            }

        }
        .apply-remark {
            display: inline-block;
            font-size: 14px;
            text-align: left;
            width: 280px;
            span {
                font-weight: bold;
                font-size: 13px;
                width: 100%;
                margin-bottom: 10px;
            }
            textarea {
                border-color: #e6e6e6;
                border-width: 1px;
                border-style: solid;
                background-color: #fff;
                border-radius: 2px;
                height: 95px;
                min-height: 95px;
                resize: none;
                line-height: 20px;
                padding: 6px 10px;
                display: block;
                width: 100%;
            }
        }

    }


</style>